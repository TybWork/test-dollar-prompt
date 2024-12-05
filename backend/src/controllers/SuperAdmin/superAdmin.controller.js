import { DallE } from "../../models/Prompt/dallePrompt.model.js";
import { GPT } from "../../models/Prompt/gptPrompt.model.js";
import { Midjourney } from "../../models/Prompt/midjourneyPrompt.model.js";
import { SuperAdmin } from "../../models/superAdmin.model.js";
import { User } from "../../models/User/user.model.js";

// Helper function to format ObjectIds to strings
const formatObjectIdFields = (obj) => {
    if (obj._id) obj._id = obj._id.toString();
    return obj;
};

// Helper function to aggregate counts by status
const countPromptsByStatus = async (model, collectionName) => {
    const result = await model.aggregate([
        {
            $facet: {
                active: [{ $match: { status: "active" } }, { $count: "count" }],
                pending: [{ $match: { status: "pending" } }, { $count: "count" }],
                paused: [{ $match: { status: "paused" } }, { $count: "count" }],
                total: [{ $count: "count" }]
            }
        },
        {
            $project: {
                collection: { $literal: collectionName },
                active: { $ifNull: [{ $arrayElemAt: ["$active.count", 0] }, 0] },
                pending: { $ifNull: [{ $arrayElemAt: ["$pending.count", 0] }, 0] },
                paused: { $ifNull: [{ $arrayElemAt: ["$paused.count", 0] }, 0] },
                total: { $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0] }
            }
        }
    ]);

    return result[0];
};

// Helper function to calculate date ranges
const getDateRange = (date) => {
    const startDate = date ? new Date(date) : new Date();
    startDate.setHours(0, 0, 0, 0); // Start of the day

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999); // End of the same day

    return { startDate, endDate };
};

// Main Controller Function
export const getSuperAdminDashboardData = async (req, res) => {
    const { promptsDate, rolesDate } = req.query;

    try {
        // Aggregate prompt counts across collections
        const [dalleCounts, gptCounts, midJourneyCounts] = await Promise.all([
            countPromptsByStatus(DallE, "dalles"),
            countPromptsByStatus(GPT, "gpts"),
            countPromptsByStatus(Midjourney, "midjourneys")
        ]);

        // Calculate overall prompt counts
        const totalPrompts = dalleCounts.total + gptCounts.total + midJourneyCounts.total;
        const totalActive = dalleCounts.active + gptCounts.active + midJourneyCounts.active;
        const totalPending = dalleCounts.pending + gptCounts.pending + midJourneyCounts.pending;
        const totalPaused = dalleCounts.paused + gptCounts.paused + midJourneyCounts.paused;

        const totalPromptsCounts = {
            collections: {
                dalles: dalleCounts,
                gpts: gptCounts,
                midjourneys: midJourneyCounts
            },
            totalPrompts,
            totalActive,
            totalPending,
            totalPaused
        };

        // Prepare date range for prompts
        const { startDate: ptStartDate, endDate: ptEndDate } = getDateRange(promptsDate);

        // Prompt counts for a specific date
        const totalCountOnDate = await DallE.countDocuments({
            createdAt: { $gte: ptStartDate, $lte: ptEndDate }
        });
        const approvedCountOnDate = await DallE.countDocuments({
            status: "active",
            createdAt: { $gte: ptStartDate, $lte: ptEndDate }
        });
        const pendingCountOnDate = await DallE.countDocuments({
            status: "pending",
            createdAt: { $gte: ptStartDate, $lte: ptEndDate }
        });
        const rejectedCountOnDate = await DallE.countDocuments({
            status: "paused",
            createdAt: { $gte: ptStartDate, $lte: ptEndDate }
        });

        const promptsCountOnSpecificDate = {
            total: totalCountOnDate,
            approved: approvedCountOnDate,
            pending: pendingCountOnDate,
            rejected: rejectedCountOnDate
        };

        // Role-based counting
        const totalRolesCount = await User.countDocuments();
        const userCount = await User.countDocuments({ role: "user" });
        const sellerCount = await User.countDocuments({ role: "seller" });
        const adminCount = await User.countDocuments({ role: "admin" });

        // Role counts on a specific date
        const { startDate: roleStartDate, endDate: roleEndDate } = getDateRange(rolesDate);
        const totalRolesCountOnDate = await User.countDocuments({
            createdAt: { $gte: roleStartDate, $lte: roleEndDate }
        });
        const usersCountOnDate = await User.countDocuments({
            role: "user",
            createdAt: { $gte: roleStartDate, $lte: roleEndDate }
        });
        const sellersCountOnDate = await User.countDocuments({
            role: "seller",
            createdAt: { $gte: roleStartDate, $lte: roleEndDate }
        });

        const rolesCount = {
            total: totalRolesCount,
            users: userCount,
            sellers: sellerCount,
            admins: adminCount
        };

        const rolesCountOnSpecificDate = {
            total: totalRolesCountOnDate,
            users: usersCountOnDate,
            sellers: sellersCountOnDate
        };

        // Sales and revenue data
        const totalSales = Math.floor(434);
        const totalProfit = Math.floor((10 / 100) * totalSales);

        const revenue = {
            sales: totalSales,
            profits: totalProfit,
            payouts: totalSales - totalProfit
        };

        // Find or create the SuperAdmin document
        const superAdmin = await SuperAdmin.findOneAndUpdate(
            {},
            {
                $set: {
                    totalPromptsCounts,
                    promptsCountOnSpecificDate,
                    rolesCount,
                    rolesCountOnSpecificDate,
                    revenue
                }
            },
            { new: true, upsert: true }
        );

        // Format ObjectId fields for client readability
        const formattedSuperAdmin = formatObjectIdFields(superAdmin.toObject());

        // Remove the `promptsCount` object from the response
        delete formattedSuperAdmin.promptsCount;

        // Return the modified object
        return res.status(200).json(formattedSuperAdmin);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching dashboard data." });
    }
};

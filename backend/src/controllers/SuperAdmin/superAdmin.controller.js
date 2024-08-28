import { DallE } from "../../models/Prompt/dallePrompt.model.js";
import { SuperAdmin } from "../../models/superAdmin.model.js";
import { User } from "../../models/User/user.model.js";

export const getSuperAdminDashboardData = async (req, res) => {
    const { promptsDate, rolesDate } = req.query; // Date should be passed as a query parameter

    try {
        // Calculate overall counts
        const totalCount = await DallE.countDocuments();
        const approvedCount = await DallE.countDocuments({ status: 'active' });
        const pendingCount = await DallE.countDocuments({ status: 'pending' });
        const rejectedCount = await DallE.countDocuments({ status: 'paused' });

        // Prepare counts for a specific date
        const dateFunc = (date) => {
            const startDate = date ? new Date(date) : new Date();
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);
            return { startDate, endDate }
        }

        const { startDate: ptStartDate, endDate: ptEndDate } = dateFunc(promptsDate);
        const { startDate: roleStartDate, endDate: roleEndDate } = dateFunc(rolesDate);


        const totalCountOnDate = await DallE.countDocuments({
            createdAt: { $gte: ptStartDate, $lt: ptEndDate }
        });
        const approvedCountOnDate = await DallE.countDocuments({
            status: 'active',
            createdAt: { $gte: ptStartDate, $lt: ptEndDate }
        });
        const pendingCountOnDate = await DallE.countDocuments({
            status: 'pending',
            createdAt: { $gte: ptStartDate, $lt: ptEndDate }
        });
        const rejectedCountOnDate = await DallE.countDocuments({
            status: 'paused',
            createdAt: { $gte: ptStartDate, $lt: ptEndDate }
        });

        // Role based counting
        const totalRolesCount = await User.countDocuments()
        const userCount = await User.countDocuments({ role: 'user' })
        const sellerCount = await User.countDocuments({ role: 'seller' })
        const adminCount = await User.countDocuments({ role: 'admin' })

        // Role based counting on specific date
        const totalRolesCountOnDate = await User.countDocuments({
            createdAt: { $gte: roleStartDate, $lt: roleEndDate }
        });
        const usersCountOnDate = await User.countDocuments({
            createdAt: { $gte: roleStartDate, $lt: roleEndDate },
            role: 'user'
        });
        const sellersCountOnDate = await User.countDocuments({
            updatedAt: { $gte: roleStartDate, $lt: roleEndDate },
            role: 'seller'


        });

        // Sales count 
        const totalSales = 43232;
        const totalProfit = (10 / 100) * totalSales

        // Find or create SuperAdmin document and update counts
        const superAdmin = await SuperAdmin.findOneAndUpdate(
            {},
            {
                // the $set will only update this when paramete change in route 
                $set: {
                    promptsCount: {
                        total: totalCount,
                        approved: approvedCount,
                        pending: pendingCount,
                        rejected: rejectedCount,
                    },

                    promptsCountOnSpecificDate: {
                        total: totalCountOnDate,
                        approved: approvedCountOnDate,
                        pending: pendingCountOnDate,
                        rejected: rejectedCountOnDate
                    },

                    rolesCount: {
                        total: totalRolesCount - 1,
                        users: userCount,
                        sellers: sellerCount,
                        admins: adminCount,
                    },
                    rolesCountOnSpecificDate: {
                        total: totalRolesCountOnDate,
                        users: usersCountOnDate,
                        sellers: sellersCountOnDate
                    },
                    revenue: {
                        sales: totalSales,
                        profits: totalProfit,
                        payouts: totalSales - totalProfit
                    }
                },
            },
            { new: true, upsert: true }
        );

        console.log('first', userCount)
        return res.status(200).json(superAdmin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating data.' });
    }
};

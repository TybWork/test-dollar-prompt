import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schema for total prompts and their collections
const totalPromptsSchema = new Schema({
    totalPrompts: { type: Number, default: 0 },
    totalActive: { type: Number, default: 0 },
    totalPending: { type: Number, default: 0 },
    totalPaused: { type: Number, default: 0 },
    collections: {
        dalles: {
            type: new Schema({
                active: { type: Number, default: 0 },
                pending: { type: Number, default: 0 },
                paused: { type: Number, default: 0 },
                total: { type: Number, default: 0 }
            }, { _id: false }),
            default: {}
        },
        gpts: {
            type: new Schema({
                active: { type: Number, default: 0 },
                pending: { type: Number, default: 0 },
                paused: { type: Number, default: 0 },
                total: { type: Number, default: 0 }
            }, { _id: false }),
            default: {}
        },
        midjourneys: {
            type: new Schema({
                active: { type: Number, default: 0 },
                pending: { type: Number, default: 0 },
                paused: { type: Number, default: 0 },
                total: { type: Number, default: 0 }
            }, { _id: false }),
            default: {}
        }
    }
}, { _id: false });

// Schema for prompt status counts
const promptStatusSchema = new Schema({
    total: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
    approved: { type: Number, default: 0 },
    rejected: { type: Number, default: 0 }
}, { _id: false });

// Schema for role counts
const roleCountSchema = new Schema({
    total: { type: Number, default: 0 },
    users: { type: Number, default: 0 },
    sellers: { type: Number, default: 0 },
    admins: { type: Number, default: 0 }
}, { _id: false });

// Schema for revenue counts
const revenueCountSchema = new Schema({
    sales: { type: Number, default: 0 },
    profits: { type: Number, default: 0 }, // 10% of sales
    payouts: { type: Number, default: 0 }  // sales - 10%
}, { _id: false });

// Main Super Admin schema
const superAdminSchema = new Schema({
    totalPromptsCounts: {
        type: totalPromptsSchema,
        default: {}
    },
    promptsCount: {
        type: promptStatusSchema,
        default: {}
    },
    promptsCountOnSpecificDate: {
        type: Schema.Types.Mixed, // Flexible field to store data for specific dates
        default: {}
    },
    rolesCount: {
        type: roleCountSchema,
        default: {}
    },
    rolesCountOnSpecificDate: {
        type: Schema.Types.Mixed, // Flexible field to store data for specific dates
        default: {}
    },
    revenue: {
        type: revenueCountSchema,
        default: {}
    }
});

export const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

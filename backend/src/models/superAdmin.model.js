import mongoose from 'mongoose';
const { Schema } = mongoose;

const promptStatusSchema = new Schema({
    total: {
        type: Number,
        default: 0
    },
    pending: {
        type: Number,
        default: 0
    },
    approved: {
        type: Number,
        default: 0
    },
    rejected: {
        type: Number,
        default: 0
    }
});

const roleCountSchema = new Schema({
    total: {
        type: Number,
        default: 0
    },
    users: {
        type: Number,
        default: 0
    },
    sellers: {
        type: Number,
        default: 0
    },
    admins: {
        type: Number,
        default: 0
    },
});

const revenueCountSchema = new Schema({
    sales: {
        type: Number,
        default: 0
    },
    profits: {
        type: Number,
        default: 0 //get 10% of sales
    },
    payouts: {
        type: Number,
        default: 0 //sales-10%
    }
})

const superAdminSchema = new Schema({
    promptsCount: {
        type: promptStatusSchema,
        default: {}
    },
    promptsCountOnSpecificDate: {
        type: Schema.Types.Mixed, // Using a mixed type for flexibility
        default: {}
    },
    rolesCount: {
        type: roleCountSchema,
        default: {}
    },
    rolesCountOnSpecificDate: {
        type: Schema.Types.Mixed,
        default: {}
    },
    revenue: {
        type: revenueCountSchema,
        default: {}
    }
});

export const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

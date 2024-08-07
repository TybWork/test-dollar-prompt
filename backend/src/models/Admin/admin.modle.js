import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema({
    prompts: {
        type: [{}]
    },
    unverifiedCount: {
        type: Number
    },
    verifiedCount: {
        type: Number
    }
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema)
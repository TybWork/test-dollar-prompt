import mongoose from "mongoose";
const { Schema } = mongoose;

const singleLog = new Schema(
    [{
        promptId: {
            type: String,
        },
        promptName: {
            type: String,
        },
        promptPrice: {
            type: Number
        },
        sellerId: {
            type: String,
        },
        buyerId: {
            type: String,
        },
        status: {
            type: Number,
            default: 0
        },
    }], { timestamps: true }
)

export const ProductLog = mongoose.model('ProductLog', singleLog);
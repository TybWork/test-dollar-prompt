import mongoose from "mongoose";
const { Schema } = mongoose;

const userLogs = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    sellingHistory: {
        dalle: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'DallE'
            }
        ],
        midjourney: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Midjourney'
            }
        ],
        gpt: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'GPT'
            }
        ]
    },
    buyingHistory: {
        dalle: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'DallE'
            }
        ],
        midjourney: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Midjourney'
            }
        ],
        gpt: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'GPT'
            }
        ]
    },
}, { timestamps: true }
)

export const SingleUserLog = mongoose.model('SingleUserLog', userLogs);
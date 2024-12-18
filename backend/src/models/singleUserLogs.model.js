import mongoose from "mongoose";
const { Schema } = mongoose;

const userLogs = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    sellingHistory: {
        "dall-e": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'DallE'
            }
        ],
        "midjourney": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Midjourney'
            }
        ],
        "gpt": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'GPT'
            }
        ]
    },
    buyingHistory: {
        "dall-e": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'DallE'
            }
        ],
        "midjourney": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Midjourney'
            }
        ],
        "gpt": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'GPT'
            }
        ]
    },
    likedPrompts: {
        "dall-e": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'DallE'
            }
        ],
        "midjourney": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Midjourney'
            }
        ],
        "gpt": [
            {
                type: mongoose.Types.ObjectId,
                ref: 'GPT'
            }
        ]
    },
}, { timestamps: true }
)

export const SingleUserLog = mongoose.model('SingleUserLog', userLogs);
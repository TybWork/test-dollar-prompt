import mongoose from 'mongoose';
const { Schema } = mongoose;

const userProfileSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    country: {
        type: String
    },
    profileBanner: {
        type: [String],
        // required: true
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin', 'user', 'seller'],
        default: 'user'
    },
    profileImage: {
        type: [String],
        // required: true
    },
    profileHandle: {
        type: String,
        unique: true,
        required: true,
    },
    socialLinks: {
        type: [String],
    },
    profileDescription: {
        type: String,
        // required: true
    },
    promptsCount: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default: 0
    },
    // following: {
    //     type: Number,
    //     default: 0
    // },
    // followers: {
    //     type: Number,
    //     default: 0
    // },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    ranking: {
        type: Number,
        default: 0
    },
    promptsCount: {
        type: Number,
        default: 0
    },
    prompts: {
        type: [
            {
                dalle: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "User"
                    }
                ],
                gpt: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "User"
                    }
                ],
                midjourney: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "User"
                    }
                ]
            }
        ]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true })

export const SellerProfile = mongoose.model("SellerProfile", userProfileSchema)
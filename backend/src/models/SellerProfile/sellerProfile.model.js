import mongoose from 'mongoose';
const { Schema } = mongoose;

const userProfileSchema = new Schema({
    profileBanner: {
        type: [String],
        // required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    profileImage: {
        type: [String],
        // required: true
    },
    profileHandle: {
        type: String,
        unique: true
        // required: true
    },
    socialLinks: {
        type: [String],
    },
    profileDescription: {
        type: String,
        // required: true
    },
    views: {
        type: Number,
    },
    likes: {
        type: Number,
    },
    rank: {
        type: Number,
    },
    following: {
        type: Number
    },
    followers: {
        type: Number
    },
    prompts: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true })

export const SellerProfile = mongoose.model("SellerProfile", userProfileSchema)
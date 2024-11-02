import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        country: {
            type: String,
        },
        gender: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        role: {
            type: String,
            enum: ['super-admin', 'admin', 'user', 'seller'],
            default: 'user'
        },
        password: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
        },
        // other fields...
        isOnline: {
            type: Boolean,
            default: false
        },
        lastActive: {
            type: Date,
            default: Date.now
        },
    }, { timestamps: true }
)

export const User = mongoose.model("User", userSchema);
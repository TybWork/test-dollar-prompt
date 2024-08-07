import mongoose from "mongoose";
const { Schema } = mongoose;

export const likeSchema = new Schema({
    likeCount: {
        type: Number,
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const Like = mongoose.model("Like", likeSchema)
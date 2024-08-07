import mongoose from "mongoose";
const { Schema } = mongoose;

export const likeSchema = new Schema({
    viewCount: {
        type: Number,
    },
    viewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const Like = mongoose.model("Like", likeSchema)
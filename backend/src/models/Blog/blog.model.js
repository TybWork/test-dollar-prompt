//blog.model
import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema(
    {
        banner: {
            type: [String],
            // required: false,
        },
        title: {
            type: String,
            // required: true,
        },
        content: {
            type: String,
            // required: true,
        },
        tags: {
            type: [String],
        },
        adminId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

    }, { timestamps: true }
)

export const Blog = mongoose.model("Blog", blogSchema);
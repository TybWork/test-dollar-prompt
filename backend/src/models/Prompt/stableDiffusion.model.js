import mongoose from 'mongoose';
const { Schema } = mongoose;
const stableDiffusionPromptSchema = new Schema(
    {
        promptType: {
            type: String,
            enum: ["Dall-E", "GPT", "Leonardo Ai", "Llama", "Midjourney", "Stable Diffusion"],
            default: "Dall-E",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            enum: [2.99, 3.99, 4.99, 5.99, 6.99],
            default: 2.99,
            required: true,
        },
        version: {
            type: String,
            enum: ["DALL-E 2", "DALL-E 3"],
            default: "DALL-E 2",
            required: true
        },
        describePrompt: {
            type: String,
            required: true,
        },
        Image_Url: {
            type: [String],
            // required: true,
            validate: {
                validator: function (arr) {
                    return arr.length === 7
                },
                message: "Please upload 7 example images."
            },
        },
        promptInstruction: {
            type: String,
            required: true
        },
        country: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'pending', 'paused'], //unverified:0  verified:1
            default: 'pending'
        },
        likes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        },
        verifiedBy: {
            type: String,
        },
        isOpen: {
            type: Boolean,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    }, { timestamps: true }
)

export const stableDiffusion = mongoose.model("stableDiffusion", dallePromptSchema)
import mongoose from 'mongoose';
const { Schema } = mongoose;
const gptPromptSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        examplePrompts: {
            type: [{}],
            required: true,
            validate: {
                validator: function (arr) {
                    return arr.length === 4
                },
                message: "Please upload 4 example Prompts."
            },
        },
        gptLink: {
            type: String,
            required: true,
        },
        gptPromptType: {
            type: String,
            enum: ["Chat gpt-4o", "Chat gpt-4-turbo", "Chat gpt-4", "Chat gpt-3.5-turbo"],
            default: "Chat gpt-4o",
            required: true,
        },
        price: {
            type: Number,
            enum: [2.99, 3.99, 4.99, 5.99, 6.99],
            default: 2.99,
            required: true,
        },
        promptInstructions: {
            type: String,
            required: true
        },
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
        slug: {
            type: String,
            required: true,
            unique: true
        },
        gptType: {
            type: String,
            enum: ["Completion (Regular Gpt)", "Chat (Chat Gpt)"],
            default: "Chat (Chat Gpt)",
            required: true
        },
        country: {
            type: String,
            // required: true
        },
        status: {
            type: String,
            enum: ['active', 'pending', 'paused'], //unverified:0  verified:1
            default: 'pending'
        },
        isTrending: {
            type: Boolean,
            default: true
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

export const GPT = mongoose.model("GPT", gptPromptSchema)

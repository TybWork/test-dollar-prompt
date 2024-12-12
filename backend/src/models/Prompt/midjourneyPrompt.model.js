import mongoose from 'mongoose';
const { Schema } = mongoose;
const MidjourneyPromptSchema = new Schema(
    {
        promptType: {
            type: String,
            enum: ["Midjourney"],
            default: "Midjoureny",
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        prompt: {
            type: String,
            required: true
        },
        description: {
            type: String,
            //required: true,
        },
        price: {
            type: Number,
            enum: [2.99, 3.99, 4.99, 5.99, 6.99],
            default: 2.99,
            required: true,
        },
        promptInstructions: {
            type: String,
            // required: true,
        },
        Image_Url: {
            type: [String],
            // required: true,
            validate: {
                validator: function (arr) {
                    return arr.length === 3
                },
                message: "Please upload 3 example images."
            },
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

export const Midjourney = mongoose.model("Midjourney", MidjourneyPromptSchema)
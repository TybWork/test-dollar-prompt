import mongoose from 'mongoose';
const { Schema } = mongoose;
const midjourneyInteractionSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Midjourney', required: true },
    liked: { type: Boolean, default: false },
    viewed: { type: Boolean, default: false },
    shared: { type: Boolean, default: false },
}, { timestamps: true });

export const midjourneyInteraction = mongoose.model("midjourneyInteraction", midjourneyInteractionSchema)
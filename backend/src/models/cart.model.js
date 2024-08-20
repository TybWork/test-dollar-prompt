// models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
        // type: String
    },
    items: [
        {
            promptId: {
                type: mongoose.Types.ObjectId,
                ref: "DallE",
                required: false
            },
        },
    ],
});

export const Cart = mongoose.model('Cart', CartSchema);

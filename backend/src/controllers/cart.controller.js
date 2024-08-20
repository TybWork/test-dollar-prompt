import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";

export const saveCart = async (req, res) => {
    const { items } = req.body;
    const userId = req.userId // Resplace with actual user ID
    if (!userId || !items || !Array.isArray(items)) {
        return res.status(400).json({ msg: 'Invalid request data' });
    }

    try {
        let userCart = await Cart.findOne({ userId });

        if (!userCart) {
            // Create a new cart if it does not exist
            userCart = new Cart({ userId, items });
        } else {
            // Merge new items with existing items
            items.forEach(item => {
                const existingItemIndex = userCart.items.findIndex(existingItem => existingItem.promptId === item.promptId);

                if (existingItemIndex > -1) {
                    // Update the existing item
                    userCart.items[existingItemIndex] = item;
                } else {
                    // Add new item
                    userCart.items.push(item);
                }
            });
        }

        await userCart.save();
        res.status(200).json({ msg: 'Cart saved successfully' });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).send('Server error');
    }
};

export const deleteProductFromCart = async (req, res) => {
    const { id: promptId } = req.params; // Access promptId from params
    const userId = req.userId; // Use the authenticated user's ID

    if (!promptId) {
        return res.status(400).json({ msg: 'Invalid request data' });
    }

    try {
        // Convert promptId to ObjectId if necessary
        const promptObjectId = new mongoose.Types.ObjectId(promptId);

        // Find the user's cart
        let userCart = await Cart.findOne({ userId });

        if (!userCart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        // Filter out the item with the matching promptId
        userCart.items = userCart.items.filter(item => !item.promptId.equals(promptObjectId));

        // Save the updated cart
        await userCart.save();

        res.status(200).json({ msg: 'Product deleted from cart successfully' });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).send('Server error');
    }
};


// controllers/cartController.js

export const getCartData = async (req, res) => {
    const userId = req.userId;

    try {
        const userCart = await Cart.findOne({ userId }).populate(
            {
                path: "items.promptId",
                select: "price description Image_Url"
            }
        )

        if (!userCart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        res.status(200).json(userCart);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
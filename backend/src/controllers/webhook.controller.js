import stripe from "stripe";
import { ProductLog } from "../models/singleLog.model.js";
import dotenv from 'dotenv'
dotenv.config()
// import { ProductLog } from "../models/singleLog.model.js";
// .........................stripe webhook....................
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.WEBHOOK_SECRET;

export const webhookFunc = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            try {
                await ProductLog.findOneAndUpdate(
                    { price: 200, status: "1" },
                    { status: '0' },
                    { new: true })
                response.status(200).json({ msg: 'Status updated successfully!!' })
            } catch (error) {
                response.status(400).json({ msg: 'Status not updated successfully' })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }


    // Return a 200 response to acknowledge receipt of the event
    response.send();
};
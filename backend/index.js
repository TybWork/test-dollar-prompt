import express from 'express';
import mongoose, { startSession } from 'mongoose';
import dotenv from 'dotenv';
import stripe from 'stripe';
// import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import { authRout } from './src/routes/authRoutes.js';
import { adminRoutes } from './src/routes/adminRoutes.js';
// import { route as user } from './src/routes/User/user.js';
import { route as dalleRoute } from './src/routes/Prompts/DallE/Dalle.js';

import cors from 'cors'
import { sellerRoutes } from './src/routes/sellerRoutes.js';
import { logRouts } from './src/routes/logs.js';
import { webhookRoute } from './src/routes/webhook.js';

dotenv.config();
const stripeData = stripe(process.env.STRIPE_SECRET_KEY)

const app = express();
const port = process.env.PORT;
//app.use........

// webhook route call(always call it before express.json())
app.use('/api', webhookRoute)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
// app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000"], // Replace with your client URL
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true, // Allow credentials (cookies) to be included in requests
}));

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log("Mongo db connected successfully")
    } catch (error) {
        console.log("Failed to connect mongo db")
    }
})();


// ............................stripe code.....................
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { products } = req.body;

        // Map products to line items
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    images: product.image,
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: 1,
        }));

        const session = await stripeData.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_BASE_URL}/success`,
            cancel_url: `${process.env.CLIENT_BASE_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// app.use('/api/', user);
app.use('/api', dalleRoute)

// routes
app.use('/api/user', authRout)
app.use('/api/admin', adminRoutes)
app.use('/api/seller', sellerRoutes)

//log routes
app.use('/api', logRouts)

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
})



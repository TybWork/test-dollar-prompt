import express from 'express';
import mongoose, { startSession } from 'mongoose';
import dotenv from 'dotenv';
import stripe from 'stripe';
// import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import { authRoutes } from './src/routes/authRoutes.js';
import { adminRoutes } from './src/routes/adminRoutes.js';
// import { route as user } from './src/routes/User/user.js';
import { route as dalleRoute } from './src/routes/Prompts/DallE/Dalle.js';

import cors from 'cors'
import { sellerRoutes } from './src/routes/sellerRoutes.js';
import { logRoutes } from './src/routes/logs.js';
import { webhookRoute } from './src/routes/webhook.js';
import { cartRoutes } from './src/routes/cartRoutes.js';
import { superAdminRoutes } from './src/routes/superAdminRoutes.js';
// import { blogRoutes } from './src/routes/blog.Routes.js';


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
    origin: process.env.CLIENT_BASE_URL, // Replace with your client URL
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

//......................socket.io.......................
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_BASE_URL,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('New user connected', socket.id);

    // Handle user joining rooms based on their roles
    socket.on('joinRoom', ({ userId, role }) => {
        socket.join(userId);  // User joins their own room
        socket.join(role);  // User joins their role-based room (e.g., admin, seller)
        io.emit('userConnected', userId);  // Broadcast online status
    });


    // Update user's online status
    socket.on('joinRoom', async ({ userId }) => {
        socket.userId = userId;  // Store the user ID in the socket session
        await User.findByIdAndUpdate(userId, { isOnline: true });  // Mark user as online
        io.emit('userConnected', userId);  // Notify other users
    });


    socket.on('joinRoom', async ({ userId }) => {
        await User.findByIdAndUpdate(userId, { isOnline: true });
    });

    socket.on('disconnect', async () => {
        await User.findByIdAndUpdate(socket.userId, { isOnline: false, lastActive: new Date() });
    });


    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        const newMessage = await new Message({ senderId, receiverId, message }).save();
        io.to(receiverId).emit('newMessage', newMessage);  // Emit the message to the receiver
    });

    socket.on('typing', ({ receiverId }) => {
        io.to(receiverId).emit('userTyping', socket.id);
    });

    socket.on('stopTyping', ({ receiverId }) => {
        io.to(receiverId).emit('userStoppedTyping', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        io.emit('userDisconnected', socket.id);  // Broadcast offline status
    });

    // Handle user disconnecting (update last active and set offline)
    socket.on('disconnect', async () => {
        if (socket.userId) {
            await User.findByIdAndUpdate(socket.userId, { isOnline: false, lastActive: new Date() });
            io.emit('userDisconnected', socket.userId);  // Notify other users
        }
    });

});


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
app.use('/api/user', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/seller', sellerRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/super-admin', superAdminRoutes)

app.use('/api/blog', blogRoutes)

//log routes
app.use('/api', logRoutes)

//chat route
app.use('/api', chatRouter)

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});
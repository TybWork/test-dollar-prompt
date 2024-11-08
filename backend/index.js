import express from 'express';
import mongoose, { startSession } from 'mongoose';
import dotenv from 'dotenv';
import stripe from 'stripe';
import http from 'http'
// import { Server } from 'socket.io';
import { Server as socketIo } from 'socket.io';

import { authRoutes } from './src/routes/authRoutes.js';
import { adminRoutes } from './src/routes/adminRoutes.js';
// import { route as user } from './src/routes/User/user.js';
import { route as dalleRoute } from './src/routes/Prompts/DallE/Dalle.js';
import { route as Midjourney } from './src/routes/Prompts/Midjourney.js';
import { route as GPT } from './src/routes/Prompts/Gpt.js';
import { route as Prompts } from './src/routes/Prompts/PromptsRoute.js'

import cors from 'cors'
import cookieParser from 'cookie-parser';
import { sellerRoutes } from './src/routes/sellerRoutes.js';
import { logRoutes } from './src/routes/logs.js';
import { webhookRoute } from './src/routes/webhook.js';
import { cartRoutes } from './src/routes/cartRoutes.js';
import { superAdminRoutes } from './src/routes/superAdminRoutes.js';
import { blogRoutes } from './src/routes/blogRoutes.js';
import { chatRoutes } from './src/routes/chatRoutes.js';
// import { Message } from './src/models/message.model.js';
import { ChatRoom } from './src/models/message.model.js';
import { createRoom, fetchRooms, sendMessage } from './src/controllers/chat.controller.js';

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
        console.log("Failed to connect mongo db", error)
    }
})();

//......................socket.io.......................

const server = http.createServer(app);
// console.log(server)
const io = new socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        allowedHeaders: ["Content-Type"],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
// console.log(io)


io.on('connection', (socket) => {
    console.log('sockets connection established')

    //createRoom socket event
    socket.on('createRoom', async ({ senderId, receiverId, message }) => {
        try {
            const newRoom = await createRoom(senderId, receiverId, message)
            socket.emit('room created', newRoom);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    });

    //msgSend socket event
    socket.on('msgSend', async ({ roomId, senderId, receiverId, message }) => {
        try {
            console.log(roomId)
            // const newMessage = [roomId, senderId, receiverId, message]
            const newMessage = await sendMessage(roomId, senderId, receiverId, message)

            // message delievered to specific room id
            io.emit('Message Sent', newMessage)

            // response send to me 
            socket.emit('Message Sent', newMessage)
        } catch (error) {
            console.log('error in sending message:', error)
        }
    })

    //fetchRooms socket event
    socket.on('fetchRoom', async (id) => {
        console.log('new id', id)
        try {
            const rooms = await fetchRooms(id)
            io.emit('rooms fetched', rooms)
        } catch (error) {
            console.log('error in fetching rooms:', error)
        }
    })

    socket.on('disconnect', async () => {
        // await User.findByIdAndUpdate(socket.userId, { isOnline: false, lastActive: new Date() });
        console.log('user disconnected')
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
app.use('/api', Prompts) //for generl prompts filtering
app.use('/api', dalleRoute)
app.use('/api', Midjourney)
app.use('/api', GPT)


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

app.use('/api/chat', chatRoutes)

server.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});

app.get('/', (req, res) => {
    res.send('hello')
})
import jwt from 'jsonwebtoken';
import { User } from '../models/User/user.model.js';

export const isAdmin = async (req, res, next) => {
    try {
        const token = await req.cookies.token;

        if (!token) {
            return res.status(400).json({ msg: "Unauthorized: You don't have token" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId);

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(400).json({ msg: "Unauthorized: User is not admin!" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json(error);
    }
};

// for seller

// export const getUserId = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({ msg: "Unauthorized: Token not found" });
//         }

//         let decoded;
//         try {
//             decoded = jwt.verify(token, process.env.JWT_SECRET);
//         } catch (err) {
//             console.error('JWT Verification Error:', err.message);
//             return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
//         }

//         const userId = decoded.userId;
//         if (!userId) {
//             return res.status(404).json({ msg: "invalidToken: userId not found" });
//         }

//         // Store the user data in the request for further access
//         req.userId = userId;

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         return res.status(500).json({ msg: "Internal Server Error", error: error.message });
//     }
// };


export const getUserId = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: Token not found" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
        }

        const userId = decoded.userId;
        if (!userId) {
            return res.status(404).json({ msg: "invalidToken: userId not found" });
        }

        req.userId = userId;
        next();
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

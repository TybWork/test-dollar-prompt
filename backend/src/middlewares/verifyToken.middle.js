import jwt from 'jsonwebtoken';
import { User } from '../models/User/user.model.js';

export const isSuperAdmin = async (req, res, next) => {
    try {
        // Check for the Authorization header
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];

        if (!authHeader) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        // Extract the token
        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token format" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        // Check if the user is an admin
        if (user.role !== "super-admin") {
            return res.status(403).json({ msg: "Forbidden:Only Super Admin can access this Dashboard!!!" });
        }


        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ msg: "Unauthorized: Invalid token or user" });
    }
};


export const isAdmin = async (req, res, next) => {
    try {
        // Check for the Authorization header
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];

        if (!authHeader) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        // Extract the token
        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token format" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ msg: "Forbidden: User is not an admin" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ msg: "Unauthorized: Invalid token or user" });
    }
};

// is admin or super admin

export const isAdminOrSuperAdmin = async (req, res, next) => {
    try {
        // Check for the Authorization header
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];

        if (!authHeader) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        // Extract the token
        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token format" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        // Check if the user is an admin or superadmin
        if (user.role !== "admin" && user.role !== "super-admin") {
            return res.status(403).json({ msg: "Forbidden: User is not an admin or superadmin" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ msg: "Unauthorized: Invalid token or user" });
    }
};

// for seller

export const getUserId = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
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

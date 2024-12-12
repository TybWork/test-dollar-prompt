import express from 'express'
import { addFollower, getSellerInfo, postSellerData, profileUpdate } from '../controllers/seller.controller.js';
import multerFunc from '../middlewares/multer.middle.js';
import { getUserId, isAdminOrSuperAdmin } from '../middlewares/verifyToken.middle.js';

export const sellerRoutes = express.Router();
sellerRoutes.post('/postdata', getUserId, multerFunc, postSellerData);
sellerRoutes.get('/getseller', getSellerInfo)
sellerRoutes.post('/add-follower', addFollower)
// sellerRoutes.put('/profile-update', getUserId, profileUpdate)
sellerRoutes.put('/profile-update', (req, res, next) => {
    // First try getUserId middleware
    getUserId(req, res, (err) => {
        if (err) {
            // If getUserId fails, proceed to isSuperAdmin middleware
            return isAdminOrSuperAdmin(req, res, (err) => {
                if (err) {
                    // If both fail, return a 403 Unauthorized error
                    return res.status(403).json({ message: 'Unauthorized' });
                }
                // If isSuperAdmin succeeds, proceed to the next middleware
                next();
            });
        }
        // If getUserId succeeds, proceed to the next middleware
        next();
    });
}, (req, res, next) => { multerFunc(req, res, next, false) }, profileUpdate)
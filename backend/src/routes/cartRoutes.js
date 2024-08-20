import express from 'express'
import { deleteProductFromCart, getCartData, saveCart } from '../controllers/cart.controller.js'
import { getUserId } from '../middlewares/verifyToken.middle.js'
export const cartRoutes = express.Router()

cartRoutes.post('/add', getUserId, saveCart)
cartRoutes.delete('/delete/:id', getUserId, deleteProductFromCart)
cartRoutes.get('/get', getUserId, getCartData)
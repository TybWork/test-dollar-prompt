import express from 'express'
import { clearCookie, loginUser, refreshCookie, signUp } from '../controllers/user.controller.js'

export const authRoutes = express.Router()

authRoutes.post('/signup', signUp)
authRoutes.post('/login', loginUser)
authRoutes.post('/logout', clearCookie)
authRoutes.post('/refreshcookie', refreshCookie)
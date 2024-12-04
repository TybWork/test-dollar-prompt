import express from 'express'
import { clearCookie, loginUser, refreshCookie, signUp } from '../controllers/user.controller.js'
import { validationsMiddle } from '../middlewares/validations.middle.js'
import { loginValidation, signupValidation } from '../validations/validations.js'

export const authRoutes = express.Router()

// authRoutes.post('/signup', validationsMiddle(signupValidation), signUp)
// authRoutes.post('/login', validationsMiddle(loginValidation), loginUser)
authRoutes.post('/signup', signUp)
authRoutes.post('/login', loginUser)
authRoutes.post('/logout', clearCookie)
authRoutes.post('/refreshcookie', refreshCookie)
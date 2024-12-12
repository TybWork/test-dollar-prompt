import express from "express";
import { passwordLink, resetPassword, verifyUrl } from "../controllers/forgetPasswordController.js";
export const pwdResetRoute = express.Router();

pwdResetRoute.post("/passwordreset", passwordLink)
pwdResetRoute.get("/:id/:token", verifyUrl);
pwdResetRoute.post("/:id/:token", resetPassword);
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User/user.model.js";
import Token from "../models/emailToken.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const passwordLink = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(409).send({ message: "user with email does not exist" })

        let token = await Token.findOne({ userId: user._id });

        if (!token) {
            token = await new Token({
                userId: user._id,
                token: jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: 10 * 60 * 1000 })
            }).save()
        }
        const url = `${process.env.SERVER_URL}/api/password-change/${user._id}/${token.token}`
        const subject = "Password Reset";
        const message = `
                        <p>Here is a link to reset your password</p>
                        <p>Click this link <a href="${url}">here</a> to reset your password</p>
                        `;

        await sendEmail(user.email, subject, message);

        res.status(200).send({ message: "password reset link is sent to your email account" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

export const verifyUrl = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: "Invalid Link" })

        // res.status(200).send({ message: "Valid Url" })
        res.redirect(`${process.env.CLIENT_BASE_URL}/password-reset?id=${user._id}&token=${token.token}`)
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: "Invalid Link" })

        if (!user.verified) user.verified = true;

        const hashPassword = bcrypt.hashSync(req.body.password, 10)

        console.log(req.params.id, req.params.token)

        user.password = hashPassword;
        await user.save();
        await Token.findOneAndDelete({ userId: user._id });
        res.status(200).send({ message: "password successfully reset" })
    } catch (error) {
        res.status(500).send({ message: `Internal server error ${error}` })
    }
}
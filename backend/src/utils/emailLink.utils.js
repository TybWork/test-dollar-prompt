import Token from "../models/emailToken.model.js";
import { User } from "../models/User/user.model.js";

export const emailLink = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        console.log('token', token)
        if (!token) return res.status(400).send({ message: "inValid Link" });
        await User.updateOne({ _id: user._id }, { verified: true });
        await Token.findOneAndDelete({ userId: user._id });

        return res.status(200).send({ message: "Email Verified successfully" })
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}
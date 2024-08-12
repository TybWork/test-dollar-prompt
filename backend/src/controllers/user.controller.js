// import { User } from "../models/user.model.js";
import { User } from "../models/User/user.model.js";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SellerProfile } from "../models/SellerProfile/sellerProfile.model.js";
import axios from 'axios'

// create user
export const signUp = async (req, res) => {
    const { firstName, lastName, gender, role, email, password } = req.body;

    try {
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ msg: "User already exist!!" })
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const user = new User({
            firstName,
            lastName,
            gender,
            role,
            email,
            password: hashedPassword
        })

        await user.save()
        return res.status(200).json({ msg: "user has been created successfully", user })

    } catch (error) {
        return res.status(400).json({ msg: `Failed to create a new user ${error}` })
    }
}

// login user
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body
//     try {
//         const user = await User.findOne({ email })
//         const userName = await SellerProfile.find({ userId: user._id })
//         if (!user) {
//             return res.status(400).json({ msg: "No such user!!" })
//         }

//         const compare = bcrypt.compareSync(password, user.password)
//         if (!compare) {
//             return res.status(400).json({ msg: "Password not matched!!" })
//         }

//         const token = jwt.sign({ userId: user._id, userRole: user.role, profileHandle: userName[0].profileHandle }, process.env.JWT_SECRET)

//         res.cookie('token', token, {

//             httpOnly: true,
//             secure: true,
//             sameSite: 'None',
//             domain: process.env.PUBLIC_DOMAIN_NAME, // Must match domain used when setting cookie
//             path: '/'
//         });


//         return res.status(200).json({ msg: "User loged in successfully!!", user, token })

//     } catch (error) {
//         console.log(`User log in failed ${error}`)
//     }
// }
// login user
export const loginUser = async (req, res) => {
    const { email, password, token } = req.body


    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCH_SERVER_SECRET}&response=${token}`
        )
        if (response.data.success) {
            try {
                const user = await User.findOne({ email })
                let userName;
                if (user.role == 'seller') {
                    let handle = await SellerProfile.find({ userId: user._id })
                    userName = handle[0].profileHandle
                } else {
                    userName = null
                }
                if (!user) {
                    return res.status(400).json({ msg: "No such user!!" })
                }

                const compare = bcrypt.compareSync(password, user.password)
                if (!compare) {
                    return res.status(400).json({ msg: "Password not matched!!" })
                }

                // const token = jwt.sign({ userId: user._id, userRole: user.role, profileHandle: userName[0].profileHandle }, process.env.JWT_SECRET)
                const token = jwt.sign({ userId: user._id, userRole: user.role, profileHandle: userName }, process.env.JWT_SECRET)


                res.cookie('token', token, {

                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: process.env.PUBLIC_DOMAIN_NAME, // Must match domain used when setting cookie
                    path: '/'
                });


                return res.status(200).json({ msg: "User loged in successfully!!", user, token })

            } catch (error) {
                console.log(`User log in failed ${error}`)
            }
        } else {
            res.status(400).json({ msg: `Robots are not allowed!!` })
        }
    } catch (error) {
        res.status(500).json({ msg: `Recaptch Failed!! ${error}` })
    }


}

// controller for clear cookie route
export const clearCookie = (req, res) => {
    const cookieName = 'token';
    try {
        res.clearCookie(cookieName, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            domain: process.env.PUBLIC_DOMAIN_NAME, // Must match domain used when setting cookie
            path: '/'
        });
        return res.status(200).json({ msg: `cookie ${cookieName} deleted successfully!` })
    } catch (error) {
        return res.status(400).json({ msg: `Failed to delete cookie ${error}` })
    }
}

// controller for refreshig cookie
export const refreshCookie = async (req, res) => {
    const { userId, userRole } = req.body;

    let profileHandle = null
    if (userRole == 'seller') {
        const findSeller = await SellerProfile.findOne({ userId: userId }).select('profileHandle')
        if (findSeller) {
            profileHandle = findSeller.profileHandle
        }
    }

    try {
        const newToken = jwt.sign({ userId, userRole, profileHandle }, process.env.JWT_SECRET)

        res.cookie('token', newToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            domain: process.env.PUBLIC_DOMAIN_NAME, // Must match domain used when setting cookie
            path: '/'
        })

        return res.status(200).json({ msg: 'Cookie refreshed successfully!!', newToken })
    } catch (error) {
        return res.status(400).json({
            msg: `Failed to refresh cookie ${error}`
        })
    }
}

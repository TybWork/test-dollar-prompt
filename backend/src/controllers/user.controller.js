// import { User } from "../models/user.model.js";
import { User } from "../models/User/user.model.js";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SellerProfile } from "../models/SellerProfile/sellerProfile.model.js";
import axios from 'axios'

// create user
export const signUp = async (req, res) => {
    const { firstName, lastName, gender, role, email, country, password } = req.body;

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
            country,
            password: hashedPassword
        })

        await user.save()

        const createProfile = new SellerProfile({
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            country: user.country,
            profileHandle: user._id
        })

        await createProfile.save();

        return res.status(200).json({ msg: "user has been created successfully", user })

    } catch (error) {
        return res.status(400).json({ msg: `Failed to create a new user ${error}` })
    }
}

//login user
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

// login user with recaptcha enabled
export const loginUser = async (req, res) => {
    const { email, password, token } = req.body


    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCH_SERVER_SECRET}&response=${token}`
        )
        if (response.data.success) {
            try {
                const user = await User.findOne({ email })

                if (!user) {
                    return res.status(400).json({ msg: "No such user!!" })
                }
                let handle = await SellerProfile.find({ userId: user._id })
                let userName = handle[0].profileHandle

                const compare = bcrypt.compareSync(password, user.password)
                if (!compare) {
                    return res.status(400).json({ msg: "Password not matched!!" })
                }

                // const token = jwt.sign({ userId: user._id, userRole: user.role, profileHandle: userName[0].profileHandle }, process.env.JWT_SECRET)
                const token = jwt.sign({ userId: user._id, userRole: user.role, profileHandle: userName }, process.env.JWT_SECRET)


                res.cookie('token', token, {

                    httpOnly: false,
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

// superAdmin login
export const superAdminLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "No such user!!" })
        }

        const compare = bcrypt.compareSync(password, user.password)
        if (!compare) {
            return res.status(400).json({ msg: "Password not matched!!" })
        }

        // const token = jwt.sign({ userId: user._id, userRole: user.role, profileHandle: userName[0].profileHandle }, process.env.JWT_SECRET)
        const token = jwt.sign({ userId: user._id, userRole: user.role }, process.env.JWT_SECRET)
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
}

//........................google login/signup..................


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
// export const refreshCookie = async (req, res) => {
//     const { userId, userRole } = req.body;

//     let profileHandle = null
//     if (userRole == 'seller') {
//         const findSeller = await SellerProfile.findOne({ userId: userId }).select('profileHandle')
//         if (findSeller) {
//             profileHandle = userId
//         }
//     }

//     try {
//         const newToken = jwt.sign({ userId, userRole, profileHandle }, process.env.JWT_SECRET)

//         await User.findByIdAndUpdate(userId, { role: userRole }, { new: 1 })

//         res.cookie('token', newToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'None',
//             domain: process.env.PUBLIC_DOMAIN_NAME, // Must match domain used when setting cookie
//             path: '/'
//         })

//         return res.status(200).json({ msg: 'Cookie refreshed successfully!!', newToken })
//     } catch (error) {
//         return res.status(400).json({
//             msg: `Failed to refresh cookie ${error}`
//         })
//     }
// }

export const refreshCookie = async (req, res) => {
    const { userId, userRole } = req.body;

    try {

        const findSeller = await SellerProfile.findOne({ userId: userId }).select('profileHandle userId')
        const profileHandle = findSeller.profileHandle

        // let profileHandle = null
        const newToken = jwt.sign({ userId, userRole, profileHandle: profileHandle }, process.env.JWT_SECRET);
        await User.findByIdAndUpdate(userId, { role: userRole }, { new: true });
        await SellerProfile.findOneAndUpdate(findSeller.userId,
            { role: userRole }, { new: true });

        res.cookie('token', newToken, {
            httpOnly: false,
            secure: true,
            sameSite: 'None',
            domain: process.env.PUBLIC_DOMAIN_NAME, // Must match domain used when setting cookie
            path: '/'
        });

        return res.status(200).json({ msg: 'Cookie refreshed successfully!', newToken });
    } catch (error) {
        console.error('Error refreshing cookie:', error); // Log the error for debugging
        return res.status(400).json({
            msg: `Failed to refresh cookie: ${error.message || error}`
        });
    }
}
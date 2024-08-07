import { User } from "../../models/User/user.model.js"


// create user
export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const saveUser = await newUser.save();
        return res.status(200).json(saveUser);
    } catch (error) {
        return res.status(500).json({ msg: "Failed to create User" })
    }
}

// get all users
export const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ msg: "failed to get users" })
    }
}

// get single user
export const singleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(200).json({ msg: "Failed to get single user" })
    }
}

// update single user
export const updateuser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ msg: "failed to updated user" })
    }
}

// delete single user
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        return res.status(200).json({ msg: "User has been deleted successfully" })
    } catch (error) {
        return res.status(500).json({ msg: "failed to delete user" })
    }
}
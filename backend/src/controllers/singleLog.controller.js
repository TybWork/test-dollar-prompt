// import { ProductLog } from ""

import { ProductLog } from "../models/singleLog.model.js"

// generate new log
export const createLog = async (req, res) => {
    try {
        const newLog = new ProductLog(req.body)
        await newLog.save()
        return res.status(200).json(newLog)
    } catch (error) {
        return res.status(400).json({ msg: `failed to create new log ${error}` })
    }
}

//get logs
export const getLog = async (req, res) => {
    try {
        const getLog = await ProductLog.find()
        return res.status(200).json(getLog)
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get log ${error}` })
    }
}

//update log
export const updateLog = async (req, res) => {
    try {
        const updateLog = await ProductLog.findOneAndUpdate(req.query, req.body, { new: true })
        return res.status(200).json(updateLog)
    } catch (error) {
        return res.status(400).json({ msg: `Failed to update log ${error}` })
    }
}
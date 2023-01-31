const user = require("./../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { sendEmail } = require("../utils/email")

exports.registerUserController = async (req, res) => {
    try {
        const found = await user.findOne({
            email: req.body.email
        })
        // if (found) {
        //     return res.json({
        //         success: false,
        //         message: "Email Already Existe"
        //     })
        // }
        const hashPass = bcrypt.hashSync(req.body.password)
        const result = await user.create({
            ...req.body,
            password: hashPass,
            // admin: false
        })

        const token = jwt.sign({
            id: result._id
        },
            process.env.JWT_KEY)

        sendEmail({
            sendTo: req.body.email,
            sub: "thank for choosing sk world",
            text: "redux react js javascript es6"
        })

        res.json({
            success: true,
            message: "User Register and Loged in Succefully",
            result: {
                id: result._id,
                name: result.name,
                email: result.email,
                active: result.active,
                admin: result.admin,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            message: "Error" + error
        })

    }
}
exports.loginUserController = async (req, res) => {
    try {
        const result = await user.findOne({ email: req.body.email })
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid email"
            })
        }
        await bcrypt.compare(req.body.password, result.password)

        const token = jwt.sign({ id: result._id }, process.env.JWT_KEY)
        res.json({
            success: true,
            message: "User Loged in Succefully",
            result: {
                id: result._id,
                name: result.name,
                email: result.email,
                active: result.active,
                admin: result.admin,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            message: "Error" + error
        })

    }
}

exports.forgetPasswordController = async (req, res) => {
    try {
        const result = await user.findOne({ email: req.body.email })
        if (!result) {
            res.status(400).json({
                success: false,
                message: "who are you"
            })
        }
        sendEmail({
            sendTo: req.body.email,
            sub: "forget password",
            text: `  http://127.0.0.1:5173/reset-password/${result._id}`
        })
        res.json({
            success: true,
            message: "sedn to email"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error" + error
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password } = req.body
        const { userId } = req.query
        const hashPass = bcrypt.hashSync(password)
        const result = await user.findByIdAndUpdate(userId, { password: hashPass })
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "something wrong"
            })
        }

        res.json({
            success: true,
            message: "messs"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error" + error
        })
    }
}
const { registerUserController, loginUserController, forgetPasswordController, resetPassword } = require("../controllers/authControllers")

const router = require("express").Router()

router
    .post("/register", registerUserController)
    .post("/login", loginUserController)
    .post("/forget-password", forgetPasswordController)
    .post("/reset-password", resetPassword)

module.exports = router
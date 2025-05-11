const express = require("express");
const router = express.Router();

const {
    RegisterUser,
    LoginUser,
} = require("../../controller/authController");

router
    .route("/register")
    .post(RegisterUser)

router
    .route("/login")
    .post(LoginUser)

module.exports = router;

const express = require("express");
const router = express.Router();

const {
    RegisterUser,
} = require("../../controller/authController");

router
    .route("/register")
    .post(RegisterUser)

module.exports = router;

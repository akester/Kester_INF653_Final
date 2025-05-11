const express = require("express");
const router = express.Router();

const {
    RequireUserAuth,
    RequireAdminAuth,
} = require("../../middleware/auth.js")

const {
    CreateBooking,
    GetAllBookings,
    GetBooking,
} = require("../../controller/bookingController");

router
    .route("/")
    .get(GetAllBookings)
    .post(RequireUserAuth, CreateBooking)

router
    .route("/:id")
    .get(RequireUserAuth, GetBooking)

module.exports = router;

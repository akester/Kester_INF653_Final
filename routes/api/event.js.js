const express = require("express");
const router = express.Router();

const {
    RequireUserAuth,
    RequireAdminAuth,
} = require ("../../middleware/auth.js")

const {
    CreateEvent,
    UpdateEvent,
    GetEvent,
} = require("../../controller/eventController");

router
    .route("/")
    .post(RequireAdminAuth, CreateEvent)

router
    .route("/:id")
    .put(RequireAdminAuth, UpdateEvent)
    .get(GetEvent)

module.exports = router;

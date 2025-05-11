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
    DeleteEvent,
    GetAllEvents,
} = require("../../controller/eventController");

router
    .route("/")
    .get(GetAllEvents)
    .post(RequireAdminAuth, CreateEvent)

router
    .route("/:id")
    .put(RequireAdminAuth, UpdateEvent)
    .delete(RequireAdminAuth, DeleteEvent)
    .get(GetEvent)

module.exports = router;

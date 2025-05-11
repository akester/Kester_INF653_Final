const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: User },
    event: { type: Event },
    quantity: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
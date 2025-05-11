const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Number },
    seatCapacity: { type: Number, required: true },
    bookedSeats: { type: Number, default: 0 },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
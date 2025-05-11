const Event = require('../models/event');
const Booking = require('../models/booking');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const getUser = (req) => {
    if (!req.headers.authorization) {
        throw new Error("unable to get user, no token")
    }

    // Read the token out of the header
    const token = req.headers.authorization.split(' ')[1];

    //Authorization: 'Bearer TOKEN'
    if (!token) {
        throw new Error("unable to get user, no token")
    }

    //Decoding the token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken.id;
}

const CreateBooking = async (req, res) => {
    const userId = getUser(req);

    const {
        eventId,
        quantity,
    } = req.body;

    if (!eventId) res.status(400).json({ message: "eventId required" })
    if (!quantity) res.status(400).json({ message: "quantity required" })

    try {
        const event = await Event.findById(eventId).exec();
        if (!event) {
            return res.status(400).json({ message: `no event found with id ${id}` });
        }

        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(400).json({ message: `no user found with id ${id}` });
        }

        const booking = new Booking({
            event: eventId,
            user: userId,
            quantity: quantity
        })

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const GetAllBookings = async (req, res) => {
    const userId = getUser(req);

    try {
        const bookings = await Booking.find({ user: userId });
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found!" });
        }

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const GetBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "No bookings found!" });
        }

        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    CreateBooking,
    GetAllBookings,
    GetBooking,
}
const Event = require('../models/event');

// Create a new event
const CreateEvent = async (req, res) => {
    const {
        title,
        description,
        category,
        venue,
        date,
        time,
        seatCapacity,
        price
    } = req.body;

    if (!title) res.status(400).json({ message: "title required" })
    if (!date) res.status(400).json({ message: "date required" })
    if (!seatCapacity) res.status(400).json({ message: "seat capacity required" })

    try {
        const result = await Event.create({
            title,
            description,
            category,
            venue,
            date,
            time,
            seatCapacity,
            price
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an event.
const UpdateEvent = async (req, res) => {
    const { id } = req.params;

    const {
        title,
        description,
        category,
        venue,
        date,
        time,
        seatCapacity,
        price
    } = req.body;

    if (!id) {
        return res.status(400).json({ message: "event id required" });
    }

    try {
        const event = await Event.findById(id).exec();
        if (!event) {
            return res.status(404).json({ message: `no event found with id ${id}` });
        }

        if (title) event.title = title;
        if (description) event.description = description;
        if (category) event.category = category;
        if (venue) event.venue = venue;
        if (date) event.date = date;
        if (time) event.time = time;
        if (seatCapacity) event.seatCapacity = seatCapacity;
        if (price) event.price = price;

        const result = await event.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a single event.
const GetEvent = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id).exec();
    if (!event) {
        return res.status(404).json({ message: `no event found with id ${id}` });
    }

    res.status(200).json(event);
}

// Delete an event
const DeleteEvent = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id).exec();
    if (!event) {
        return res.status(404).json({ message: `no event found with id ${id}` });
    }

    try {
        const result = await Event.deleteOne({ _id: id });
        res.json({ message: "Event deleted", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all events
const GetAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        if (!events || events.length === 0) {
            return res.status(404).json({ message: "No events found!" });
        }

        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    CreateEvent,
    UpdateEvent,
    GetEvent,
    DeleteEvent,
    GetAllEvents,
}
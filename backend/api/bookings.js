const mongoose = require('mongoose');
const Booking = require('../models/Booking');

// MongoDB connection - Establish connection for each request
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  // Allow pre-flight CORS requests
  res.setHeader('Access-Control-Allow-Origin', '*');  // Or 'http://localhost:5173' for stricter control
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for pre-flight CORS check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request for creating a booking
  if (req.method === 'POST') {
    try {
      const booking = new Booking(req.body);
      await booking.save();
      res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Handle GET request to fetch all bookings
  else if (req.method === 'GET') {
    try {
      const bookings = await Booking.find();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

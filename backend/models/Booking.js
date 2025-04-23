const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookdate: { type: String, required: true },
  email: { type: String, required: true },
  endlocation: { type: String, required: true },
  persons: { type: Number, required: true },
  startlocation: { type: String, required: true },
  vehicle: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('ridebookings', bookingSchema);

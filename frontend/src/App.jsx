import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [booking, setBooking] = useState({
    bookdate: '',
    email: '',
    endlocation: '',
    persons: 1,
    startlocation: '',
    vehicle: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', booking); // ✅ matched with backend
      console.log('Booking Submitted:', response.data);
      alert('Ride booking submitted!');
      // Reset form
      setBooking({
        bookdate: '',
        email: '',
        endlocation: '',
        persons: 1,
        startlocation: '',
        vehicle: '',
      });
    } catch (err) {
      console.log('Error:', err);
      alert('Error submitting booking');
    }
  };

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>Ride Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Booking Date:</label><br />
          <input
            type="date"
            name="bookdate"
            value={booking.bookdate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={booking.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Start Location:</label><br />
          <input
            type="text"
            name="startlocation"
            value={booking.startlocation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Location:</label><br />
          <input
            type="text"
            name="endlocation"
            value={booking.endlocation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Number of Persons:</label><br />
          <input
            type="number"
            name="persons"
            value={booking.persons}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Vehicle Type:</label><br />
          <input
            type="text"
            name="vehicle"
            value={booking.vehicle}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Submit Booking</button>
      </form>
    </div>
  );
}

export default App;

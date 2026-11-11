import { useState } from "react";
import { createBooking } from "./api";
import "./BookingModal.css";

export default function BookingModal({ room, onClose, onSuccess }) {
  const [form, setForm] = useState({
    meeting_title: "",
    date: "",
    start_time: "",
    end_time: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await createBooking({ ...form, room_id: room.id });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Booking failed");
      } else {
        onSuccess();
      }
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Book a Room</h2>
        <div className="modal-room-info">
          <span className="modal-room-name">{room.name}</span>
          <span className="modal-room-cap">👥 {room.capacity} people</span>
        </div>
        {error && <div className="modal-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>Meeting Title</label>
          <input
            name="meeting_title"
            value={form.meeting_title}
            onChange={handleChange}
            placeholder="e.g. Sprint Planning"
            required
          />
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          <div className="modal-time-row">
            <div>
              <label>Start Time</label>
              <input
                type="time"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>End Time</label>
              <input
                type="time"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="modal-btn" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

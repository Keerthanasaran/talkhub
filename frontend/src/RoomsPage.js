import { useEffect, useState } from "react";
import { getRooms, createRoom } from "./api";
import BookingModal from "./BookingModal";
import Particles from "./Particles";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [toast, setToast] = useState("");
  const [newRoom, setNewRoom] = useState({ name: "", capacity: "", image_url: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getRooms()
      .then((r) => r.json())
      .then(setRooms)
      .finally(() => setLoading(false));
  }, []);

  const handleBookingSuccess = () => {
    setSelectedRoom(null);
    setToast("Room booked successfully! 🎉");
    setTimeout(() => setToast(""), 3000);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await createRoom({ ...newRoom, capacity: parseInt(newRoom.capacity) });
      const data = await res.json();
      if (res.ok) {
        setRooms((prev) => [...prev, data]);
        setNewRoom({ name: "", capacity: "", image_url: "" });
        setToast("Room created successfully! 🏢");
        setTimeout(() => setToast(""), 3000);
      }
    } finally {
      setCreating(false);
    }
  };

  if (loading) return (
    <div style={styles.loading}>Loading rooms...</div>
  );

  return (
    <div style={styles.page}>
      <Particles />
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Meeting Rooms</h1>
          <p style={styles.subtitle}>Select a room to book your next meeting</p>
        </div>
        <div style={styles.grid}>
          {rooms.map((room) => (
            <div key={room.id} style={{ ...styles.card, opacity: room.is_available ? 1 : 0.6 }}>
              <div style={styles.imgWrap}>
                <img src={room.image_url} alt={room.name} style={styles.img} />
                <span style={{ ...styles.badge, ...(room.is_available ? styles.badgeAvailable : styles.badgeUnavailable) }}>
                  {room.is_available ? "Available" : "Unavailable"}
                </span>
              </div>
              <div style={styles.info}>
                <h3 style={styles.roomName}>{room.name}</h3>
                <p style={styles.capacity}>👥 Capacity: {room.capacity} people</p>
                <button
                  style={{ ...styles.bookBtn, ...(room.is_available ? {} : styles.bookBtnDisabled) }}
                  disabled={!room.is_available}
                  onClick={() => setSelectedRoom(room)}
                >
                  {room.is_available ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}

          {/* Create New Room Card */}
          <div style={styles.createCard}>
            <h3 style={styles.createTitle}>➕ Add New Room</h3>
            <form onSubmit={handleCreateRoom} style={styles.createForm}>
              <input
                placeholder="Room name"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                required
                style={styles.createInput}
              />
              <input
                type="number"
                placeholder="No. of persons"
                value={newRoom.capacity}
                onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                required
                min="1"
                style={styles.createInput}
              />
              <input
                placeholder="Image URL (optional)"
                value={newRoom.image_url}
                onChange={(e) => setNewRoom({ ...newRoom, image_url: e.target.value })}
                style={styles.createInput}
              />
              <button type="submit" disabled={creating} style={styles.bookBtn}>
                {creating ? "Creating..." : "Create Room"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {selectedRoom && (
        <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} onSuccess={handleBookingSuccess} />
      )}
      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 60px)",
    background: "linear-gradient(135deg, #0a0a12 0%, #12001f 50%, #0d0d1a 100%)",
    position: "relative",
    fontFamily: "'Segoe UI', sans-serif",
  },
  content: {
    position: "relative",
    zIndex: 1,
    padding: "2rem",
  },
  loading: {
    minHeight: "calc(100vh - 60px)",
    background: "linear-gradient(135deg, #0a0a12 0%, #12001f 50%, #0d0d1a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#7070a0",
    fontSize: "1.1rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    color: "#ffffff",
    fontSize: "2rem",
    margin: "0 0 0.4rem",
    background: "linear-gradient(90deg, #a855f7, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#7dd3fc",
    margin: 0,
    fontSize: "0.95rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(168,85,247,0.2)",
    borderRadius: "16px",
    overflow: "hidden",
    backdropFilter: "blur(16px)",
    boxShadow: "0 0 20px rgba(168,85,247,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  imgWrap: {
    position: "relative",
  },
  img: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
  },
  badge: {
    position: "absolute",
    top: "0.7rem",
    right: "0.7rem",
    padding: "0.25rem 0.7rem",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: 600,
  },
  badgeAvailable: {
    background: "rgba(46,213,115,0.2)",
    color: "#2ed573",
    border: "1px solid #2ed573",
  },
  badgeUnavailable: {
    background: "rgba(233,69,96,0.2)",
    color: "#e94560",
    border: "1px solid #e94560",
  },
  info: {
    padding: "1.2rem",
  },
  roomName: {
    color: "#ffffff",
    margin: "0 0 0.4rem",
    fontSize: "1.1rem",
  },
  capacity: {
    color: "#7070a0",
    fontSize: "0.9rem",
    margin: "0 0 1rem",
  },
  createCard: {
    background: "rgba(168,85,247,0.06)",
    border: "2px dashed rgba(168,85,247,0.35)",
    borderRadius: "16px",
    padding: "1.5rem",
    backdropFilter: "blur(16px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  createTitle: {
    color: "#a855f7",
    margin: "0 0 1rem",
    fontSize: "1.1rem",
    fontWeight: 700,
  },
  createForm: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  createInput: {
    padding: "0.7rem 1rem",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(168,85,247,0.25)",
    borderRadius: "10px",
    color: "#e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
  },
  bookBtn: {
    width: "100%",
    padding: "0.6rem",
    background: "linear-gradient(90deg, #7c3aed, #a855f7)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  bookBtnDisabled: {
    background: "#3a3a50",
    color: "#7070a0",
    cursor: "not-allowed",
  },
  toast: {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#2ed573",
    color: "#0f0f1a",
    padding: "0.75rem 1.5rem",
    borderRadius: "30px",
    fontWeight: 600,
    fontSize: "0.95rem",
    zIndex: 300,
  },
};

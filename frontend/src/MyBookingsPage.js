import { useEffect, useState } from "react";
import { getMyBookings, getRooms } from "./api";
import Particles from "./Particles";

function formatTime(t) {
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display}:${m} ${ampm}`;
}

function formatDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short", year: "numeric", month: "short", day: "numeric",
  });
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyBookings(), getRooms()])
      .then(async ([bRes, rRes]) => {
        const bData = await bRes.json();
        const rData = await rRes.json();
        const roomMap = {};
        rData.forEach((r) => (roomMap[r.id] = r));
        setRooms(roomMap);
        setBookings(Array.isArray(bData) ? bData : []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.loading}>Loading bookings...</div>;

  return (
    <div style={styles.page}>
      <Particles />
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Bookings</h1>
          <p style={styles.subtitle}>All your scheduled meeting rooms</p>
        </div>
        {bookings.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>📅</div>
            <p style={styles.emptyText}>You have no bookings yet.</p>
            <a href="/rooms" style={styles.link}>Browse Rooms →</a>
          </div>
        ) : (
          <div style={styles.list}>
            {bookings.map((b) => {
              const room = rooms[b.room_id];
              return (
                <div key={b.id} style={styles.card}>
                  {room && <img src={room.image_url} alt={room.name} style={styles.img} />}
                  <div style={styles.details}>
                    <h3 style={styles.meetingTitle}>{b.meeting_title}</h3>
                    <p style={styles.roomName}>{room ? room.name : `Room #${b.room_id}`}</p>
                    <div style={styles.meta}>
                      <span>📅 {formatDate(b.date)}</span>
                      <span>🕐 {formatTime(b.start_time)} – {formatTime(b.end_time)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
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
    maxWidth: "800px",
    margin: "0 auto",
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
    margin: "0 0 0.4rem",
    fontSize: "2rem",
    background: "linear-gradient(90deg, #a855f7, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#7dd3fc",
    margin: 0,
    fontSize: "0.95rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    display: "flex",
    gap: "1.2rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(168,85,247,0.2)",
    borderRadius: "16px",
    overflow: "hidden",
    backdropFilter: "blur(16px)",
    boxShadow: "0 0 20px rgba(168,85,247,0.08)",
  },
  img: {
    width: "120px",
    height: "100px",
    objectFit: "cover",
    flexShrink: 0,
  },
  details: {
    padding: "1rem 1rem 1rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  meetingTitle: {
    color: "#ffffff",
    margin: "0 0 0.3rem",
    fontSize: "1.05rem",
  },
  roomName: {
    color: "#a855f7",
    margin: "0 0 0.5rem",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  meta: {
    display: "flex",
    gap: "1.2rem",
    color: "#7070a0",
    fontSize: "0.88rem",
  },
  empty: {
    textAlign: "center",
    padding: "4rem 0",
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  emptyText: {
    color: "#7070a0",
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  link: {
    color: "#a855f7",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
};

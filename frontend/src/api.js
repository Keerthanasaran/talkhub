const BASE = "http://localhost:8000";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const signup = (data) =>
  fetch(`${BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const login = (data) =>
  fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const getRooms = () =>
  fetch(`${BASE}/rooms`, { headers: authHeaders() });

export const createRoom = (data) =>
  fetch(`${BASE}/rooms`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

export const createBooking = (data) =>
  fetch(`${BASE}/bookings`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

export const getMyBookings = () =>
  fetch(`${BASE}/bookings`, { headers: authHeaders() });

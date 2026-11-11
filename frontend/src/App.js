import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import RoomsPage from "./RoomsPage";
import MyBookingsPage from "./MyBookingsPage";

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem("employeeName"));

  const handleLogin = (name) => {
    localStorage.setItem("employeeName", name);
    setUser(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeName");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute user={user}>
              <Navbar user={user} onLogout={handleLogout} />
              <RoomsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute user={user}>
              <Navbar user={user} onLogout={handleLogout} />
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/rooms" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

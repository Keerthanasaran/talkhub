import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/rooms" className="navbar-brand">
        <img src={logo} alt="TalkHub" className="navbar-logo" />
        <span className="navbar-name">TalkHub</span>
      </Link>
      {user && (
        <div className="navbar-right">
          <span className="navbar-greeting">Hi, {user}</span>
          <Link to="/rooms" className="nav-link">Rooms</Link>
          <Link to="/my-bookings" className="nav-link">My Bookings</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

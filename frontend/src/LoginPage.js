import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./api";
import logo from "./logo.png";
import Particles from "./Particles";

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(form);
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Login failed");
      } else {
        localStorage.setItem("token", data.access_token);
        onLogin(data.employee_name);
        navigate("/rooms");
      }
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Particles />

      <div style={styles.card}>
        <div style={styles.header}>
          <img src={logo} alt="TalkHub" style={styles.logo} />
          <div style={styles.headerText}>
            <h1 style={styles.brand}>TalkHub</h1>
            <p style={styles.tagline}>Book. Collaborate. Connect.</p>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={styles.switch}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a12 0%, #12001f 50%, #0d0d1a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    position: "relative",
  },
  canvas: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },
  card: {
    position: "relative",
    zIndex: 1,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(168,85,247,0.2)",
    borderRadius: "20px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "380px",
    backdropFilter: "blur(16px)",
    boxShadow: "0 0 40px rgba(168,85,247,0.1)",
    textAlign: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.8rem",
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logoWrap: {
    marginBottom: "0.8rem",
  },
  logo: {
    width: "90px",
    height: "90px",
    objectFit: "contain",
    borderRadius: "16px",
  },
  brand: {
    margin: "0 0 0.2rem",
    fontSize: "1.8rem",
    fontWeight: 800,
    background: "linear-gradient(90deg, #a855f7, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px",
  },
  tagline: {
    color: "#7dd3fc",
    fontSize: "0.82rem",
    margin: 0,
    letterSpacing: "0.5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  input: {
    padding: "0.7rem 1rem",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(168,85,247,0.25)",
    borderRadius: "10px",
    color: "#e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  },
  btn: {
    marginTop: "0.3rem",
    padding: "0.75rem",
    background: "linear-gradient(90deg, #7c3aed, #a855f7)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  error: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.4)",
    color: "#f87171",
    padding: "0.6rem 0.9rem",
    borderRadius: "8px",
    fontSize: "0.88rem",
    marginBottom: "0.8rem",
  },
  switch: {
    marginTop: "1.2rem",
    color: "#64748b",
    fontSize: "0.88rem",
  },
  link: {
    color: "#a855f7",
    textDecoration: "none",
    fontWeight: 600,
  },
};

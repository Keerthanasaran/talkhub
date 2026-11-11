# TalkHub — Smart Meeting Room Booking System

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10-blue?style=for-the-badge&logo=python"/>
  <img src="https://img.shields.io/badge/FastAPI-Latest-green?style=for-the-badge&logo=fastapi"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/MySQL-Database-orange?style=for-the-badge&logo=mysql"/>
</p>

<p align="center">
  <b>Book. Collaborate. Connect.</b><br/>
  A smart meeting room booking and management system built with FastAPI and React
</p>

---

## 📌 Overview

**TalkHub** is a full-stack web application for managing and booking meeting rooms within an organization. It provides secure user authentication, real-time room availability, and a clean dashboard for managing bookings.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔐 User Authentication | Secure login & signup with JWT tokens |
| 🏢 Room Management | View all available meeting rooms with capacity |
| 📅 Room Booking | Book rooms with date, time, and meeting title |
| 📋 My Bookings | View and manage personal booking history |
| 👥 Department Support | User profiles with department information |
| 🗄️ Database | MySQL with SQLAlchemy ORM |

---

## 🛠️ Tech Stack

### Backend
- **Python 3.10**
- **FastAPI** — REST API framework
- **SQLAlchemy** — ORM for database management
- **MySQL** — Relational database
- **JWT (python-jose)** — Authentication tokens
- **Passlib (bcrypt)** — Password hashing
- **Uvicorn** — ASGI server

### Frontend
- **React 18** — UI framework
- **Axios** — HTTP client
- **CSS Modules** — Component styling

---

## 📁 Project Structure

```
TalkHub/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── auth_router.py       # Login & signup endpoints
│   │   │   ├── rooms_router.py      # Room listing endpoints
│   │   │   └── bookings_router.py   # Booking endpoints
│   │   ├── __init__.py
│   │   ├── auth.py                  # JWT authentication logic
│   │   ├── database.py              # Database connection
│   │   ├── main.py                  # FastAPI app entry point
│   │   ├── models.py                # SQLAlchemy models
│   │   └── schemas.py               # Pydantic schemas
│   ├── .env                         # Environment variables
│   └── requirements.txt
└── frontend/
    ├── public/
    └── src/
        ├── api.js                   # Axios API calls
        ├── App.js                   # Main app component
        ├── LoginPage.js             # Login page
        ├── SignUpPage.js            # Sign up page
        ├── RoomsPage.js             # Room listing page
        ├── BookingModal.js          # Booking form modal
        ├── MyBookingsPage.js        # User bookings page
        └── Navbar.js                # Navigation bar
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL Server

### 1. Clone the repository
```bash
git clone https://github.com/Keerthanasaran/TalkHub.git
cd TalkHub
```

### 2. Setup Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Create `.env` file inside `backend/`:
```env
DATABASE_URL=mysql+pymysql://<username>:<password>@localhost/<dbname>
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 4. Setup Frontend
```bash
cd frontend
npm install
```

---

## ▶️ Running the Project

### Terminal 1 — Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Backend runs at: `http://localhost:8000`

### Terminal 2 — Frontend
```bash
cd frontend
npm start
```
Frontend runs at: `http://localhost:3000`

---

## 🔄 How It Works

```
1. User Registration  →  Create account with name, email, department
2. Authentication     →  Login with JWT token generation
3. Browse Rooms       →  View available rooms with capacity & images
4. Book a Room        →  Select date, time slot, and meeting title
5. Manage Bookings    →  View, track personal booking history
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |
| GET | `/rooms` | Get all rooms |
| GET | `/rooms/{id}` | Get room by ID |
| POST | `/bookings` | Create a booking |
| GET | `/bookings/my` | Get user's bookings |
| DELETE | `/bookings/{id}` | Cancel a booking |

---

## 🗄️ Database Models

### User
| Field | Type | Description |
|---|---|---|
| id | Integer | Primary key |
| employee_name | String | Full name |
| username | String | Unique username |
| email | String | Unique email |
| hashed_password | String | Bcrypt hashed |
| department | String | Department name |

### Room
| Field | Type | Description |
|---|---|---|
| id | Integer | Primary key |
| name | String | Room name |
| image_url | String | Room image |
| capacity | Integer | Max persons |
| is_available | Boolean | Availability status |

### Booking
| Field | Type | Description |
|---|---|---|
| id | Integer | Primary key |
| user_id | ForeignKey | Linked user |
| room_id | ForeignKey | Linked room |
| meeting_title | String | Purpose of meeting |
| date | Date | Booking date |
| start_time | Time | Start time |
| end_time | Time | End time |

---

## 👩💻 Developer

| Field | Details |
|---|---|
| Name | Keerthana S M |
| Course | MCA |
| Institution | SASTRA Deemed to be University |
| Year | 2026 |

---

## 📄 License

This project was developed as part of an academic project.  
All rights reserved © 2026 Keerthana S M.

# TalkHub — Technical Documentation

## 1. Project Overview

TalkHub is a full-stack meeting room booking system. It allows employees to register, log in, browse available meeting rooms, and book them for specific time slots.

---

## 2. Architecture

```
Client (React) ←→ FastAPI Backend ←→ MySQL Database
```

- Frontend communicates with backend via REST API using Axios
- Backend uses JWT for stateless authentication
- SQLAlchemy ORM manages all database operations

---

## 3. Backend Architecture

### Entry Point — `main.py`
- Creates FastAPI app instance
- Registers CORS middleware
- Includes routers for auth, rooms, bookings
- Seeds initial room data on startup

### Database — `database.py`
- SQLAlchemy engine connected to MySQL
- SessionLocal for dependency injection
- Base class for all models

### Models — `models.py`
- `User` — stores employee info and hashed password
- `Room` — stores room details and availability
- `Booking` — links users to rooms with time slots

### Schemas — `schemas.py`
- Pydantic models for request/response validation
- Separate schemas for create, read operations

### Auth — `auth.py`
- Password hashing with bcrypt
- JWT token creation and verification
- OAuth2 password bearer scheme

---

## 4. API Router Details

### Auth Router (`/auth`)
| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Create new user account |
| POST | `/auth/login` | Authenticate and return JWT |

### Rooms Router (`/rooms`)
| Method | Path | Description |
|---|---|---|
| GET | `/rooms` | List all rooms |
| GET | `/rooms/{id}` | Get single room |

### Bookings Router (`/bookings`)
| Method | Path | Description |
|---|---|---|
| POST | `/bookings` | Create new booking |
| GET | `/bookings/my` | Get current user's bookings |
| DELETE | `/bookings/{id}` | Cancel a booking |

---

## 5. Frontend Pages

| Page | File | Description |
|---|---|---|
| Login | `LoginPage.js` | User login form |
| Sign Up | `SignUpPage.js` | New user registration |
| Rooms | `RoomsPage.js` | Browse available rooms |
| Booking Modal | `BookingModal.js` | Book a selected room |
| My Bookings | `MyBookingsPage.js` | View personal bookings |
| Navbar | `Navbar.js` | Navigation with logout |

---

## 6. Authentication Flow

```
1. User submits login form
2. POST /auth/login → returns JWT access token
3. Token stored in localStorage
4. All subsequent requests include Authorization: Bearer <token>
5. Backend verifies token on protected routes
```

---

## 7. Room Booking Flow

```
1. User browses rooms on RoomsPage
2. Clicks "Book" on available room
3. BookingModal opens → enter title, date, start/end time
4. POST /bookings → booking saved to database
5. Room marked as unavailable for that slot
6. User can view booking in MyBookingsPage
```

---

## 8. Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | MySQL connection string |
| `SECRET_KEY` | JWT signing secret |
| `ALGORITHM` | JWT algorithm (HS256) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiry time |

---

## 9. Pre-seeded Rooms

| Room Name | Capacity | Status |
|---|---|---|
| The Boardroom | 20 | Available |
| Innovation Lab | 10 | Available |
| Focus Pod | 4 | Available |
| Executive Suite | 8 | Available |
| Collaboration Hub | 15 | Available |
| Training Room | 30 | Unavailable |

from pydantic import BaseModel, EmailStr
from datetime import date, time

# --- Auth ---
class SignUpRequest(BaseModel):
    employee_name: str
    username: str
    email: EmailStr
    password: str
    confirm_password: str
    department: str

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    employee_name: str

# --- Rooms ---
class RoomResponse(BaseModel):
    id: int
    name: str
    image_url: str
    capacity: int
    is_available: bool

    class Config:
        from_attributes = True

# --- Bookings ---
class BookingRequest(BaseModel):
    room_id: int
    meeting_title: str
    date: date
    start_time: time
    end_time: time

class BookingResponse(BaseModel):
    id: int
    room_id: int
    meeting_title: str
    date: date
    start_time: time
    end_time: time

    class Config:
        from_attributes = True

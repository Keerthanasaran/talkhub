from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Booking, Room
from app.schemas import BookingRequest, BookingResponse
from app.auth import decode_token
from typing import List
from jose import JWTError

router = APIRouter(prefix="/bookings", tags=["bookings"])

def get_current_user_id(authorization: str = Header(...)) -> int:
    try:
        token = authorization.split(" ")[1]
        payload = decode_token(token)
        return int(payload["sub"])
    except (JWTError, IndexError, KeyError):
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.post("", response_model=BookingResponse, status_code=201)
def create_booking(
    data: BookingRequest,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    room = db.query(Room).filter(Room.id == data.room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    if not room.is_available:
        raise HTTPException(status_code=400, detail="Room is not available")
    if data.start_time >= data.end_time:
        raise HTTPException(status_code=400, detail="End time must be after start time")

    # Check for time conflicts on the same room and date
    conflict = db.query(Booking).filter(
        Booking.room_id == data.room_id,
        Booking.date == data.date,
        Booking.start_time < data.end_time,
        Booking.end_time > data.start_time,
    ).first()
    if conflict:
        raise HTTPException(status_code=409, detail="Room already booked for this time slot")

    booking = Booking(
        user_id=user_id,
        room_id=data.room_id,
        meeting_title=data.meeting_title,
        date=data.date,
        start_time=data.start_time,
        end_time=data.end_time,
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

@router.get("", response_model=List[BookingResponse])
def get_my_bookings(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return db.query(Booking).filter(Booking.user_id == user_id).all()

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Room
from app.schemas import RoomResponse, RoomCreate
from typing import List

router = APIRouter(prefix="/rooms", tags=["rooms"])

@router.get("", response_model=List[RoomResponse])
def get_rooms(db: Session = Depends(get_db)):
    return db.query(Room).all()

@router.post("", response_model=RoomResponse)
def create_room(data: RoomCreate, db: Session = Depends(get_db)):
    room = Room(name=data.name, capacity=data.capacity, image_url=data.image_url or "", is_available=True)
    db.add(room)
    db.commit()
    db.refresh(room)
    return room

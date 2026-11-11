from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth_router, rooms_router, bookings_router
from app import models
from sqlalchemy.orm import Session
from app.database import SessionLocal

app = FastAPI(title="TalkHub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(rooms_router.router)
app.include_router(bookings_router.router)

def seed_rooms():
    db: Session = SessionLocal()
    from app.models import Room
    if db.query(Room).count() == 0:
        rooms = [
            Room(name="The Boardroom", image_url="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400", capacity=20, is_available=True),
            Room(name="Innovation Lab", image_url="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400", capacity=10, is_available=True),
            Room(name="Focus Pod", image_url="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400", capacity=4, is_available=True),
            Room(name="Executive Suite", image_url="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400", capacity=8, is_available=True),
            Room(name="Collaboration Hub", image_url="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400", capacity=15, is_available=True),
            Room(name="Training Room", image_url="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400", capacity=30, is_available=False),
        ]
        db.add_all(rooms)
        db.commit()
    db.close()

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    seed_rooms()

@app.get("/")
def root():
    return {"message": "TalkHub API is running"}

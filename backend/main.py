from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import User, Match, Message
import schemas
import crud

Base.metadata.create_all(bind=engine)

app = FastAPI(title="RunBud API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "RunBud API is running"}


# Users

@app.post("/api/users", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = crud.get_user_by_email(db, user.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)


@app.post("/api/sign-in")
def sign_in(payload: schemas.SignIn, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, payload.email)
    if not user or not crud.verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"user": schemas.UserResponse.model_validate(user)}


@app.get("/api/users/{user_id}", response_model=schemas.UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.put("/api/users/{user_id}/preferences", response_model=schemas.UserResponse)
def set_preferences(user_id: int, prefs: schemas.UserPreferences, db: Session = Depends(get_db)):
    user = crud.update_user_preferences(db, user_id, prefs)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.post("/api/users/{user_id}/complete-onboarding", response_model=schemas.UserResponse)
def complete_onboarding(user_id: int, db: Session = Depends(get_db)):
    user = crud.complete_onboarding(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.get("/api/users", response_model=list[schemas.UserResponse])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.list_users(db, skip=skip, limit=limit)


# Matches

@app.post("/api/matches", response_model=schemas.MatchResponse)
def create_match(payload: schemas.MatchCreate, db: Session = Depends(get_db)):
    return crud.create_match(db, payload.user1_id, payload.user2_id, payload.score)


@app.get("/api/users/{user_id}/matches", response_model=list[schemas.MatchResponse])
def get_matches(user_id: int, db: Session = Depends(get_db)):
    return crud.get_matches_for_user(db, user_id)


# Messages

@app.post("/api/messages", response_model=schemas.MessageResponse)
def send_message(sender_id: int, msg: schemas.MessageCreate, db: Session = Depends(get_db)):
    return crud.create_message(db, sender_id, msg)


@app.get("/api/matches/{match_id}/messages", response_model=list[schemas.MessageResponse])
def get_messages(match_id: int, db: Session = Depends(get_db)):
    return crud.get_messages_for_match(db, match_id)

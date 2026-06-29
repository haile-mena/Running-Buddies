from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    location: Optional[str] = ""
    mileage: Optional[float] = 0.0
    mile_time: Optional[str] = ""
    terrain: Optional[str] = ""
    surface: Optional[str] = ""
    intensity: Optional[str] = ""


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class SignIn(BaseModel):
    email: EmailStr
    password: str


class UserPreferences(BaseModel):
    location: str
    mileage: float
    mile_time: str
    terrain: str
    surface: str
    intensity: str


class MatchCreate(BaseModel):
    user1_id: int
    user2_id: int
    score: float = 0.0


class MatchResponse(BaseModel):
    id: int
    user1_id: int
    user2_id: int
    score: float
    created_at: datetime

    class Config:
        from_attributes = True


class MessageCreate(BaseModel):
    match_id: int
    content: str


class MessageResponse(BaseModel):
    id: int
    match_id: int
    sender_id: int
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

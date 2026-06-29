from sqlalchemy.orm import Session
from sqlalchemy import or_
from passlib.context import CryptContext
from models import User, Match, Message
from schemas import UserCreate, UserPreferences, MessageCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


# Users

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate):
    db_user = User(
        email=user.email,
        hashed_password=hash_password(user.password),
        first_name=user.first_name,
        last_name=user.last_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_preferences(db: Session, user_id: int, prefs: UserPreferences):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None
    for key, value in prefs.model_dump().items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user


def list_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


# Matches

def get_matches_for_user(db: Session, user_id: int):
    return db.query(Match).filter(
        or_(Match.user1_id == user_id, Match.user2_id == user_id)
    ).all()


def create_match(db: Session, user1_id: int, user2_id: int, score: float = 0.0):
    existing = db.query(Match).filter(
        or_(
            (Match.user1_id == user1_id) & (Match.user2_id == user2_id),
            (Match.user1_id == user2_id) & (Match.user2_id == user1_id),
        )
    ).first()
    if existing:
        return existing

    match = Match(user1_id=user1_id, user2_id=user2_id, score=score)
    db.add(match)
    db.commit()
    db.refresh(match)
    return match


# Messages

def create_message(db: Session, sender_id: int, msg: MessageCreate):
    message = Message(match_id=msg.match_id, sender_id=sender_id, content=msg.content)
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def get_messages_for_match(db: Session, match_id: int):
    return db.query(Message).filter(Message.match_id == match_id).order_by(Message.created_at).all()

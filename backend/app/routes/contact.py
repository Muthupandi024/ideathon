from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import ContactMessage
from app.schemas.schemas import ContactCreate, ContactResponse
from app.config import settings
from app.email_service import send_email

router = APIRouter(prefix="/api/contact", tags=["Contact"])

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_form(payload: ContactCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(
        name=payload.name,
        email=payload.email,
        mobile=payload.mobile,
        message=payload.message
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    if settings.ORGANIZER_EMAIL:
        send_email(
            settings.ORGANIZER_EMAIL,
            f"IDEATHON '26 Website Inquiry from {msg.name}",
            f"Name: {msg.name}\nEmail: {msg.email}\nMobile: {msg.mobile}\n\n{msg.message}",
        )
    return msg

import random
import string
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Registration, TeamMember, PaymentStatus
from app.schemas.schemas import RegistrationCreate, RegistrationResponse

router = APIRouter(prefix="/api/registrations", tags=["Registrations"])

def generate_registration_id(db: Session) -> str:
    while True:
        num = ''.join(random.choices(string.digits, k=5))
        reg_id = f"IDE26-{num}"
        existing = db.query(Registration).filter(Registration.registration_id == reg_id).first()
        if not existing:
            return reg_id

@router.post("", response_model=RegistrationResponse, status_code=status.HTTP_201_CREATED)
def create_registration(payload: RegistrationCreate, db: Session = Depends(get_db)):
    reg_id = generate_registration_id(db)

    # Check for duplicate payment reference or duplicate leader email
    leader_member = payload.members[0] if payload.members else None
    if leader_member:
        existing_email = db.query(TeamMember).filter(
            TeamMember.email == leader_member.email, 
            TeamMember.role == "LEADER"
        ).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Team leader email '{leader_member.email}' is already registered for IDEATHON '26."
            )

    new_reg = Registration(
        registration_id=reg_id,
        team_name=payload.team_name,
        team_size=payload.team_size,
        college_name=payload.college_name,
        department=payload.department,
        year=payload.year,
        problem_statement=payload.problem_statement,
        proposed_solution=payload.proposed_solution,
        technology_stack=payload.technology_stack,
        github_url=payload.github_url,
        linkedin_url=payload.linkedin_url,
        payment_reference=payload.payment_reference,
        payment_status=PaymentStatus.PENDING
    )

    db.add(new_reg)
    db.flush()  # Ensures reg_id FK reference is valid

    # Add team members
    for member_data in payload.members:
        member = TeamMember(
            registration_id=reg_id,
            role=member_data.role,
            full_name=member_data.full_name,
            email=member_data.email,
            mobile=member_data.mobile
        )
        db.add(member)

    db.commit()
    db.refresh(new_reg)
    return new_reg

@router.get("/{registration_id}", response_model=RegistrationResponse)
def get_registration_by_id(registration_id: str, db: Session = Depends(get_db)):
    reg = db.query(Registration).filter(Registration.registration_id == registration_id.upper()).first()
    if not reg:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Registration with ID '{registration_id}' was not found."
        )
    return reg

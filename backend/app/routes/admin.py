import csv
import io
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Admin, Registration, PaymentStatus
from app.schemas.schemas import AdminLogin, Token, RegistrationResponse, StatusUpdate
from app.auth.jwt_handler import create_access_token, verify_password, get_current_admin
from app.email_service import send_email

router = APIRouter(prefix="/api/admin", tags=["Admin"])

@router.post("/login", response_model=Token)
def admin_login(payload: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == payload.username).first()
    if not admin or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials"
        )
    
    access_token = create_access_token(data={"sub": admin.username})
    return Token(access_token=access_token, username=admin.username)

@router.get("/registrations", response_model=List[RegistrationResponse])
def get_all_registrations(
    status_filter: Optional[str] = Query(None, alias="status"),
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    query = db.query(Registration)

    if status_filter and status_filter.upper() in ["PENDING", "VERIFIED", "REJECTED"]:
        query = query.filter(Registration.payment_status == status_filter.upper())

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Registration.registration_id.ilike(search_term)) |
            (Registration.team_name.ilike(search_term)) |
            (Registration.college_name.ilike(search_term)) |
            (Registration.payment_reference.ilike(search_term))
        )

    registrations = query.order_by(Registration.created_at.desc()).all()
    return registrations

@router.get("/registrations/{id}", response_model=RegistrationResponse)
def get_registration_detail(
    id: int, 
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    reg = db.query(Registration).filter(Registration.id == id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    return reg

@router.patch("/registrations/{id}", response_model=RegistrationResponse)
@router.patch("/payments/{id}", response_model=RegistrationResponse)
def update_payment_status(
    id: int, 
    payload: StatusUpdate, 
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    reg = db.query(Registration).filter(Registration.id == id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration record not found")
    
    reg.payment_status = payload.payment_status
    db.commit()
    db.refresh(reg)
    return reg

@router.post("/registrations/{id}/notify")
def notify_registration_status(
    id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    reg = db.query(Registration).filter(Registration.id == id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration record not found")
    leader = next((member for member in reg.members if member.role == "LEADER"), None)
    if not leader:
        raise HTTPException(status_code=422, detail="Registration has no team leader email")
    status_value = reg.payment_status.value if hasattr(reg.payment_status, "value") else reg.payment_status
    send_email(
        leader.email,
        f"IDEATHON '26 Registration {status_value} ({reg.registration_id})",
        f"Dear {leader.full_name},\n\nYour team '{reg.team_name}' registration is {status_value}.\n\n"
        f"Registration ID: {reg.registration_id}\n\nRegards,\nIDEATHON '26 Organizing Committee",
    )
    return {"message": "Status notification sent", "recipient": leader.email}

@router.delete("/registrations/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_registration(
    id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    reg = db.query(Registration).filter(Registration.id == id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    db.delete(reg)
    db.commit()
    return None

@router.get("/stats")
def get_admin_dashboard_stats(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    total = db.query(Registration).count()
    two_member = db.query(Registration).filter(Registration.team_size == 2).count()
    four_member = db.query(Registration).filter(Registration.team_size == 4).count()
    pending = db.query(Registration).filter(Registration.payment_status == PaymentStatus.PENDING).count()
    verified = db.query(Registration).filter(Registration.payment_status == PaymentStatus.VERIFIED).count()
    rejected = db.query(Registration).filter(Registration.payment_status == PaymentStatus.REJECTED).count()

    return {
        "total_registrations": total,
        "team_2_count": two_member,
        "team_4_count": four_member,
        "pending_payments": pending,
        "verified_payments": verified,
        "rejected_payments": rejected
    }

@router.get("/export-csv")
def export_registrations_csv(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    registrations = db.query(Registration).order_by(Registration.created_at.desc()).all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow([
        "Registration ID", "Team Name", "Team Size", "College Name", "Department", "Year",
        "Leader Name", "Leader Email", "Leader Phone", "Problem Statement", "Proposed Solution",
        "Tech Stack", "GitHub URL", "Payment Reference", "Payment Status", "Created Date"
    ])

    for reg in registrations:
        leader = next((m for m in reg.members if m.role == "LEADER"), None)
        leader_name = leader.full_name if leader else "N/A"
        leader_email = leader.email if leader else "N/A"
        leader_phone = leader.mobile if leader else "N/A"

        writer.writerow([
            reg.registration_id,
            reg.team_name,
            reg.team_size,
            reg.college_name,
            reg.department,
            reg.year,
            leader_name,
            leader_email,
            leader_phone,
            reg.problem_statement,
            reg.proposed_solution,
            reg.technology_stack,
            reg.github_url or "",
            reg.payment_reference,
            reg.payment_status.value if hasattr(reg.payment_status, 'value') else reg.payment_status,
            reg.created_at.strftime("%Y-%m-%d %H:%M:%S") if reg.created_at else ""
        ])

    output.seek(0)
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode('utf-8')),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=ideathon26_registrations.csv"}
    )

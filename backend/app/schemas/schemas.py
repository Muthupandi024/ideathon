from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from app.models.models import PaymentStatus, MemberRole

class MemberCreate(BaseModel):
    role: MemberRole
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    mobile: str = Field(..., min_length=10, max_length=15)

class RegistrationCreate(BaseModel):
    team_name: str = Field(..., min_length=2, max_length=100)
    team_size: int = Field(..., description="Team size must be 2 or 4")
    college_name: str = Field(..., min_length=3, max_length=150)
    department: str = Field(..., min_length=2, max_length=100)
    year: str = Field(..., min_length=1, max_length=20)
    
    problem_statement: str = Field(..., min_length=5)
    proposed_solution: str = Field(..., min_length=5)
    technology_stack: str = Field(..., min_length=2, max_length=255)
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    
    payment_reference: str = Field(..., min_length=3, max_length=100)
    
    # Team members list
    members: List[MemberCreate]

class MemberResponse(BaseModel):
    id: int
    registration_id: str
    role: MemberRole
    full_name: str
    email: str
    mobile: str

    class Config:
        from_attributes = True

class RegistrationResponse(BaseModel):
    id: int
    registration_id: str
    team_name: str
    team_size: int
    college_name: str
    department: str
    year: str
    problem_statement: str
    proposed_solution: str
    technology_stack: str
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    payment_reference: str
    payment_status: PaymentStatus
    created_at: datetime
    members: List[MemberResponse] = []

    class Config:
        from_attributes = True

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    mobile: str = Field(..., min_length=10, max_length=15)
    message: str = Field(..., min_length=3)

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    mobile: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str

class StatusUpdate(BaseModel):
    payment_status: PaymentStatus

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum
from app.database import Base

class PaymentStatus(str, enum.Enum):
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"

class MemberRole(str, enum.Enum):
    LEADER = "LEADER"
    MEMBER_2 = "MEMBER_2"
    MEMBER_3 = "MEMBER_3"
    MEMBER_4 = "MEMBER_4"

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(String(20), unique=True, nullable=False, index=True)
    team_name = Column(String(100), nullable=False)
    team_size = Column(Integer, nullable=False)
    college_name = Column(String(150), nullable=False)
    department = Column(String(100), nullable=False)
    year = Column(String(20), nullable=False)
    
    problem_statement = Column(Text, nullable=False)
    proposed_solution = Column(Text, nullable=False)
    technology_stack = Column(String(255), nullable=False)
    github_url = Column(String(255), nullable=True)
    linkedin_url = Column(String(255), nullable=True)
    
    payment_reference = Column(String(100), nullable=False)
    payment_status = Column(SQLEnum(PaymentStatus), default=PaymentStatus.PENDING)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    members = relationship("TeamMember", back_populates="registration", cascade="all, delete-orphan")

class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(String(20), ForeignKey("registrations.registration_id", ondelete="CASCADE"), nullable=False)
    role = Column(SQLEnum(MemberRole), nullable=False)
    full_name = Column(String(100), nullable=False)
    email = Column(String(120), nullable=False)
    mobile = Column(String(15), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    registration = relationship("Registration", back_populates="members")

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), nullable=False)
    mobile = Column(String(15), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

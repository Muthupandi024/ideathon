import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config import settings
from app.database import engine, Base, SessionLocal
from app.models.models import Admin
from app.auth.jwt_handler import hash_password
from app.routes import registrations, contact, admin

if not all((settings.JWT_SECRET, settings.ADMIN_USERNAME, settings.ADMIN_PASSWORD, settings.DATABASE_URL)):
    raise RuntimeError("JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD, and DATABASE_URL must be configured")

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ideathon_main")

# Auto-create database tables
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables verified/created successfully.")
except Exception as e:
    logger.error(f"Error creating database tables: {e}")

# Seed default admin user
def seed_admin():
    db: Session = SessionLocal()
    try:
        existing_admin = db.query(Admin).filter(Admin.username == settings.ADMIN_USERNAME).first()
        if not existing_admin:
            hashed_pwd = hash_password(settings.ADMIN_PASSWORD)
            new_admin = Admin(username=settings.ADMIN_USERNAME, password_hash=hashed_pwd)
            db.add(new_admin)
            db.commit()
            logger.info(f"Default admin user '{settings.ADMIN_USERNAME}' created successfully!")
    except Exception as e:
        logger.error(f"Error seeding admin user: {e}")
    finally:
        db.close()

seed_admin()

app = FastAPI(
    title="IDEATHON '26 Event Platform API",
    description="Backend API for IDEATHON '26 organized by Dept of IT, AAA College of Engineering & Technology",
    version="1.0.0"
)

# WILDCARD CORS MIDDLEWARE FOR ZERO-CORS ERRORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(registrations.router)
app.include_router(contact.router)
app.include_router(admin.router)

@app.get("/", tags=["Health"])
def root_status():
    return {
        "status": "online",
        "event": "IDEATHON '26",
        "institution": "AAA College of Engineering and Technology",
        "department": "Department of Information Technology",
        "theme": "AI & Emerging Intelligent Tech. For a Smarter Future",
        "date": "15.09.2026",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

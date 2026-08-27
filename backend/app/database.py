import logging
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

logger = logging.getLogger("ideathon_db")

Base = declarative_base()

def get_engine():
    if not settings.DATABASE_URL:
        raise RuntimeError("DATABASE_URL must be configured with a PostgreSQL connection string")

    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=1800,
        pool_size=5,
        max_overflow=10,
        echo=False,
    )
    with engine.connect():
        logger.info("Successfully connected to PostgreSQL database")
    return engine

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

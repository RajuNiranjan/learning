from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os


load_dotenv()

DB_URI = os.getenv("DB_URI")

if not DB_URI:
    raise ValueError("DB_URI is not set")


engine = create_engine(DB_URI, echo=True)

SessionLocal = sessionmaker(bind=engine)


Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from sqlalchemy import Column, Integer, String, Boolean
from db.database import Base


class Todo(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String, nullable=False)
    is_done= Column(Boolean, default=False)

from pydantic import BaseModel
from typing import Optional


class Todo(BaseModel):
    id: str
    title: str
    completed: bool

class TodoCreate(BaseModel):
    title: str

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

class TodoResponse(Todo):
    pass

    class Config:
        from_attributes = True

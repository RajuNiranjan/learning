from pydantic import BaseModel, Field
from typing import Optional


class TodoBase(BaseModel):
    task: str = Field(..., min_length=1, max_length=50)
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    task: Optional[str]
    completed: Optional[bool]
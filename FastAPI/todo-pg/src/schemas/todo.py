from pydantic import BaseModel


class TodoBase(BaseModel):
    id: int
    task: str
    completed: bool

class TodoCreate(BaseModel):
    task: str

class TodoUpdate(BaseModel):
    task: str
    completed: bool

class TodoResponse(TodoBase):
    pass

    class Config:
        from_attributes = True
        

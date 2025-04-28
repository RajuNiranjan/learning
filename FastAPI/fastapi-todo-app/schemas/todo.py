from pydantic import BaseModel


class TodoBase(BaseModel):
    task: str
    is_done: bool

class CreateTask(TodoBase):
    pass

class UpdateTask(BaseModel):
    task: str
    is_done: bool

class Todo(TodoBase):
    id: int

    class Config:
        from_attributes = True
    

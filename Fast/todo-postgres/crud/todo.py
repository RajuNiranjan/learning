from sqlalchemy.orm import Session
from models.todo import Todo
from schemas.todo import CreateTask,UpdateTask
from fastapi import HTTPException

def get_Todos(db:Session):
    return db.query(Todo).all()

def create_Task(db:Session, task:CreateTask):
    new_task = Todo(task=task.task)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def get_Task(db:Session, id:int):
    task = db.query(Todo).filter(Todo.id == id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


def update_Task(db:Session, id:int, task:UpdateTask):
    db_task = db.query(Todo).filter(Todo.id == id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.task = task.task
    db_task.is_done = task.is_done
    db.commit()
    db.refresh(db_task)
    return db_task
    
def delete_Task(db:Session, id:int):
    task = db.query(Todo).filter(Todo.id == id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}

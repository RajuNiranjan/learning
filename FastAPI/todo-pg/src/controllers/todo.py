from sqlalchemy.orm import Session
from ..models.todo import Todo
from ..schemas.todo import TodoCreate, TodoUpdate
from fastapi import HTTPException

def Get_all_tasks(db: Session):
    return db.query(Todo).order_by(Todo.id).all()


def Create_task(task: TodoCreate, db: Session):
    new_task = Todo(task=task.task)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


def Update_task(task_id: int, task: TodoUpdate, db: Session):
    db_task = db.query(Todo).filter(Todo.id == task_id).first()
    if db_task:
        db_task.task = task.task
        db_task.completed = task.completed
        db.commit()
        db.refresh(db_task)
        return db_task
    else:
        raise HTTPException(status_code=404, detail="Task not found")


def Delete_task(task_id: int, db: Session):
    task = db.query(Todo).filter(Todo.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
        return {"message": "Task deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Task not found")


from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from db.database import get_db
from crud.todo import get_Todos, create_Task, get_Task, update_Task, delete_Task
from typing import List
from schemas.todo import Todo, CreateTask


todo_router = APIRouter(
    prefix="/todo",
    tags=["todo"]
)

@todo_router.get("", response_model=List[Todo], status_code=status.HTTP_200_OK)
def get_todos(db: Session = Depends(get_db),):
    return get_Todos(db)

@todo_router.post('', response_model=Todo, status_code=status.HTTP_201_CREATED)
def create_task(task:CreateTask, db:Session = Depends(get_db)):
    return create_Task(db, task)

@todo_router.get('/{id}', response_model=Todo, status_code=status.HTTP_200_OK)
def get_task(id:int, db:Session= Depends(get_db)):
    return get_Task(db, id)

@todo_router.put('/{id}', response_model=Todo, status_code=status.HTTP_200_OK)
def update_task(id:int, task:CreateTask, db:Session = Depends(get_db)):
    return update_Task(db, id, task)

@todo_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(id:int, db:Session = Depends(get_db)):
    return delete_Task(db, id)

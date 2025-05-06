from fastapi import APIRouter, Depends, HTTPException, status
from ..schemas.todo import TodoResponse,TodoCreate,TodoUpdate
from typing import List
from ..controllers.todo import Get_all_tasks, Create_task, Update_task, Delete_task
from sqlalchemy.orm import Session
from ..config.db import get_db

todo_router = APIRouter(
    prefix="/todo",
    tags=["todo"]
)


@todo_router.get('', status_code=status.HTTP_200_OK, response_model=List[TodoResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    return Get_all_tasks(db)



@todo_router.post('', status_code=status.HTTP_201_CREATED, response_model=TodoResponse)
def create_task(task: TodoCreate, db: Session = Depends(get_db)):
    return Create_task(task, db)


@todo_router.put('/{task_id}', status_code=status.HTTP_200_OK, response_model=TodoResponse)
def update_task(task_id: int, task: TodoUpdate, db: Session = Depends(get_db)):
    return Update_task(task_id, task, db)


@todo_router.delete('/{task_id}', status_code=status.HTTP_200_OK)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    return Delete_task(task_id, db)



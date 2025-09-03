from fastapi import APIRouter,status
from app.schemas.todo_schema import TodoCreate, TodoUpdate
from typing import List
from app.models.todo_model import TodoInDB
from app.services.todo_service import create_task, get_tasks, get_task, delete_task, update_task


todo_route = APIRouter(
    prefix='/todos',
    tags=["Todos"]
)

@todo_route.post("/", status_code=status.HTTP_201_CREATED, response_model=TodoInDB)
async def create_todo(todo:TodoCreate) ->TodoInDB:
    return await create_task(todo)

@todo_route.get('/', status_code=status.HTTP_200_OK, response_model=List[TodoInDB])
async def get_todos():
    return await get_tasks()

@todo_route.get('/{task_id}', status_code=status.HTTP_200_OK, response_model=TodoInDB)
async def get_todo(task_id:str):
    return await get_task(task_id)

@todo_route.delete('/{task_id}', status_code=status.HTTP_200_OK)
async def delete_todo(task_id:str):
    return await delete_task(task_id)

@todo_route.patch('/{task_id}', status_code=status.HTTP_200_OK, response_model=TodoInDB)
async def update_todo(task_id:str, task:TodoUpdate):
    return await update_task(task_id, task)

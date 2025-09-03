from app.schemas.todo_schema import TodoCreate, TodoUpdate
from typing import List, Dict
from bson import ObjectId
from app.models.todo_model import TodoInDB
from app.core.mongo import todo_collection
from fastapi import HTTPException, status


async def create_task(todo: TodoCreate) -> TodoInDB:
    try:
        new_task = todo.model_dump()
        result = await todo_collection.insert_one(new_task)
        created_task = await todo_collection.find_one({"_id": result.inserted_id})
        if created_task is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to retrieve the created task"
            )
        return TodoInDB(**created_task)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create new task: {str(e)}"
        )

async def get_tasks() -> List[TodoInDB]:
    try:
        tasks = todo_collection.find()
        todos = await tasks.to_list(length=None)
        return [TodoInDB(**todo) for todo in todos]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'failed to fetch tasks {str(e)}'
        )
    
async def get_task(task_id: str) -> TodoInDB:
    try:
        if not ObjectId.is_valid(task_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid task id"
            )
        
        task = await todo_collection.find_one({"_id": ObjectId(task_id)})

        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task Not found"
            )
        
        return TodoInDB(**task)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch task{str(e)} "
        )
    
async def delete_task(task_id:str):
    try:
        if not ObjectId(task_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid task Id"
            )
        
        task = await todo_collection.delete_one({"_id": ObjectId(task_id)})

        if task.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task Not Found"
            )
        
        return{"message":"Task deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"failded to delete task {str(e)}"
        )
    
async def update_task(task_id:str, task:TodoUpdate) -> TodoInDB:
    try:
        update_data: Dict = {k: v for k, v in task.model_dump().items() if v is not None}

        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No data provied for update"
            )
        
        await todo_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": update_data}
        )

        updated_task = await todo_collection.find_one({"_id": ObjectId(task_id)})

        return TodoInDB(**updated_task)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update the task {str(e)}"
        )
from fastapi import APIRouter, HTTPException, status, Depends
from ..schemas.todo import TodoCreate, TodoResponse, TodoUpdate
from typing import List
from ..config.database import todo_collection
from bson import ObjectId
from ..models.todo import todos_serializer, todo_serializer



todo_router = APIRouter(
    prefix="/todos",
    tags=["todos"]
)

@todo_router.get("/",response_model=List[TodoResponse], status_code=status.HTTP_200_OK)
async def get_tasks():
    return todos_serializer(await todo_collection.find().to_list(1000))


@todo_router.post("/", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_task(todo: TodoCreate):
    new_todo = todo.model_dump()
    new_todo["completed"] = False  # Add default completed value
    result = await todo_collection.insert_one(new_todo)
    created_todo = await todo_collection.find_one({"_id": result.inserted_id})
    return todo_serializer(created_todo)


@todo_router.put("/{id}", response_model=TodoResponse, status_code=status.HTTP_200_OK)
async def update_task(id: str, todo: TodoUpdate):
    try:
        todo_id = ObjectId(id)
        if not await todo_collection.find_one({"_id":todo_id}):
            raise HTTPException(status_code=404, detail="Task not found")
        
        update_task = todo.model_dump(exclude_unset=True)
        await todo_collection.update_one({"_id":todo_id}, {"$set":update_task})
        updated_todo = await todo_collection.find_one({"_id":todo_id})
        return todo_serializer(updated_todo)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@todo_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(id: str):
    try:
        todo_id = ObjectId(id)
        if not await todo_collection.find_one({"_id":todo_id}):
            raise HTTPException(status_code=404, detail="Task not found")
        
        await todo_collection.delete_one({"_id":todo_id})
        return {"message": "Task deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

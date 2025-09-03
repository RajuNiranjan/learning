from fastapi import FastAPI
from app.routes.todo_route import todo_route

app = FastAPI(
    title="FARM stack Todo App"
)

@app.get("/")
def root():
    return {"message":"Welcome to FARM stack Todo App"}

app.include_router(todo_route)
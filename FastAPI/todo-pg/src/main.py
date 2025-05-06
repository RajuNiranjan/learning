from fastapi import FastAPI
from .routes.todo import todo_router
from .config.db import engine
from .models.todo import Base


app = FastAPI(
    title="Todo app",
    description="a sample crud operation todo application"
)

Base.metadata.create_all(bind=engine)


@app.get("/test", tags=["testing"])
def index():
    return {"message":"Hello World"}


app.include_router(todo_router)

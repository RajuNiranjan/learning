from fastapi import FastAPI
from .routers.auth import auth_router

app = FastAPI(title="FastAPI Authentication Application")

@app.get("/")
def index():
    return {"data":"Welcome to FastAPI Authentication"}

app.include_router(auth_router, prefix='/api')
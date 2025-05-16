from fastapi import FastAPI
from app.routers.auth_router import auth_router

app = FastAPI()

@app.get("/",tags=["testing"])
def index():
    return {"data":"Welcome to FastAPI"}

app.include_router(auth_router, prefix='/api/v1')
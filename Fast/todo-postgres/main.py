from fastapi import FastAPI
from dotenv import load_dotenv
import os
from routers.todo import todo_router


load_dotenv()

app = FastAPI()

app.include_router(todo_router)


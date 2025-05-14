from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.auth import auth_router

app = FastAPI(title="FastAPI Authentication Application")

origins = [
    "http://localhost",
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],              # Allows all HTTP methods
    allow_headers=["*"],              # Allows all headers
)

@app.get("/")
def index():
    return {"data":"Welcome to FastAPI Authentication"}

app.include_router(auth_router, prefix='/api')
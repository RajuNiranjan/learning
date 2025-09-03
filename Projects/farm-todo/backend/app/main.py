from fastapi import FastAPI
from app.routes.todo_route import todo_route
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="FARM stack Todo App"
)

origins = [
    "http://localhost:5173",   
    "http://localhost",        
    "http://localhost:80",     
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message":"Welcome to FARM stack Todo App"}

app.include_router(todo_route)
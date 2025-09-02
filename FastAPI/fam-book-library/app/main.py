from fastapi import FastAPI
from app.routes.book_route import book_route

app = FastAPI(
    title="Books Library"
)

@app.get('/')
def root():
    return {"message":"Welcome to Book Library"}

app.include_router(book_route)
from fastapi import FastAPI
from typing import Optional 
from pydantic import BaseModel
import uvicorn

app = FastAPI()


# GET METHODS 

@app.get("/blogs")
def all_blogs():
    return {"data": {"message":"welcome to FastAPI course"}}

@app.get("/blogs/{id}")
def blog_by_id(id:int):
    return {"data":{"blog_id":id}}


@app.get('/blog')
def query_blog(limt:int=10, published:bool=False, sort: Optional[str]="asc"):
    return {"data":f"blog list {limt} published {published} sort {sort}"}

@app.get('/blog/{id}/comments')
def blog_comments(id:int, limit:int=10):
    return {"data":f"blog list {id} comments {limit}"}


# POST METHOD 

class Blog(BaseModel):
    title: str
    description: str 
    published: Optional[bool] = False
    author: Optional[str] = "Unknown"

@app.post('/blog')
def create_blog(request: Blog):
    return {"data":f'a new blog created {request.title} by {request.author} and published {request.published}'}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
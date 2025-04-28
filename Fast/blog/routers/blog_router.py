from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
import database, schemas, models
from typing import List
from repository import blog_repository


blog_router = APIRouter(
    prefix='/blog',
    tags=['blogs']
)

@blog_router.post('', status_code=status.HTTP_201_CREATED)
def create_blog(req: schemas.Blog, db: Session = Depends(database.get_db)):
    new_blog = models.Blog(title=req.title, body=req.body, creator_id=1)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

@blog_router.get('', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowBlog])
def get_all_blogs(db: Session = Depends(database.get_db)):
    return blog_repository.get_all(db)
 
@blog_router.get('/{id}', status_code=status.HTTP_200_OK, response_model=schemas.ShowBlog)
def get_blog(id: int, db: Session = Depends(database.get_db)):
    return blog_repository.get_blog(id, db)

@blog_router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(id:int, db: Session = Depends(database.get_db)):
    return blog_repository.delete_blog(id, db)

@blog_router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update_blog(id:int, req: schemas.Blog, db: Session = Depends(database.get_db)):
    return blog_repository.update_blog(id, req, db)

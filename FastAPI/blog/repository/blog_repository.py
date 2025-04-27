import models
from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends


def get_all(db:Session):
    return db.query(models.Blog).all()

def get_blog(id, db:Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog with id {id} not found")
    return blog


def delete_blog(id, db:Session):
    blog= db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog with id {id} not found")

    db.delete(blog)
    db.commit()
    return 'done'

def update_blog(id, req, db:Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog with id {id} not found")
    blog.title = req.title
    blog.body = req.body
    db.commit()
    return blog
from sqlalchemy.orm import Session
import models, hashing
from fastapi import HTTPException, status, Depends



def create_user(req, db:Session):  # Fixed spacing
    # Check if email already exists
    existing_user = db.query(models.User).filter(models.User.email == req.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    new_user = models.User(
        name=req.name,
        email=req.email,
        password=hashing.Hash.bcrypt(req.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user(id, db:Session):  # Fixed type hint spacing
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found"
        )
    return user


from sqlalchemy.orm import Session
import models
from fastapi import HTTPException, status
from hashing import Hash

def login(req:int, db:Session):
    user = db.query(models.User).filter(models.User.name == req.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid user")
    if not Hash.verify(user.password, req.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password")
    return user


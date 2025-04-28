from fastapi import APIRouter, Depends, status, HTTPException
import schemas, models, hashing, database
from sqlalchemy.orm import Session
from repository import user_repository



user_router = APIRouter(
    prefix='/user',  
    tags=['users']
)

@user_router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowUser)  
def create_user(req: schemas.User, db: Session = Depends(database.get_db)):  
    return user_repository.create_user(req, db)

@user_router.get('/{id}', status_code=status.HTTP_200_OK, response_model=schemas.ShowUser)  
def get_user(id: int, db: Session = Depends(database.get_db)): 
    return user_repository.get_user(id, db)

from fastapi import APIRouter, Depends, status, HTTPException
from repository import auth_repository
import schemas, database
from sqlalchemy.orm import Session

auth_router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@auth_router.post('/login', status_code=status.HTTP_200_OK, response_model=schemas.ShowUser)
def login(req: schemas.Login, db: Session = Depends(database.get_db)):
    return auth_repository.login(req, db)

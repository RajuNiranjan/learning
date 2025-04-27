from fastapi import APIRouter, Depends, status, HTTPException
import schemas, models, hashing, database
from sqlalchemy.orm import Session



user_router = APIRouter(
    prefix='/user',  # Uncommented prefix
    tags=['users']
)

@user_router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowUser)  # Updated route
def create_user(req: schemas.User, db: Session = Depends(database.get_db)):  # Fixed spacing
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

@user_router.get('/{id}', status_code=status.HTTP_200_OK, response_model=schemas.ShowUser)  # Updated route
def get_user(id: int, db: Session = Depends(database.get_db)):  # Fixed type hint spacing
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found"
        )
    return user

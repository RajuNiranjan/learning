from fastapi import APIRouter, status, Depends
from ..models.user import User, SignUp, LogIn
from ..crud.auth import signup_service,login_service,check_auth_service
from ..utils.token import get_current_user

auth_router = APIRouter(
    prefix='/auth',
    tags=["Auth"]
)

@auth_router.post('/signup', status_code=status.HTTP_201_CREATED, response_model=User)
async def signup(user:SignUp):
    return await signup_service(user)

@auth_router.post('/login', status_code=status.HTTP_200_OK, response_model=User)
async def login(user:LogIn):
    return await login_service(user)

@auth_router.get('/user',status_code=status.HTTP_200_OK)
async def get_user(current_use:dict = Depends(get_current_user)):
    return await check_auth_service(current_use["userId"])
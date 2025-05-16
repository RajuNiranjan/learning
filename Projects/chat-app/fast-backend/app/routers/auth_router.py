from fastapi import APIRouter, status, Response, Request
from app.models.user_model import SignUp, LogIn
from app.services.auth_service import signup_service, login_server,check_auth_server
from app.utils.token import decode_token

auth_router = APIRouter(
    prefix='/auth',
    tags=["Authentication"]
)

@auth_router.post("/signup", status_code=status.HTTP_201_CREATED,)
async def signup(user:SignUp, response:Response):
    return await signup_service(user, response)

@auth_router.post('/login',status_code=status.HTTP_200_OK)
async def login(user:LogIn, response:Response):
    return await login_server(user, response)

@auth_router.get('/check-auth',status_code=status.HTTP_200_OK)
async def check_auth(req:Request):
    return await check_auth_server(req)
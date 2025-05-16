from fastapi import APIRouter, status, Response
from app.models.user_model import SignUp, LogIn
from app.services.auth_service import signup_service


auth_router = APIRouter(
    prefix='/auth',
    tags=["Authentication"]
)

@auth_router.post("/signup", status_code=status.HTTP_201_CREATED,)
async def signup(user:SignUp, response:Response):
    return await signup_service(user, response)


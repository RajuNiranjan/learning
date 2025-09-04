from fastapi import APIRouter, status, Depends, HTTPException
from app.services.auth_service import AuthService
from app.schemas.user import UserCreate, UserProfile
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database

auth_router = APIRouter(
    prefix='/api/auth',
    tags=["Authentication"]
)

@auth_router.post('/signup', response_model=UserProfile, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, database: AsyncIOMotorDatabase = Depends(get_database)):
    try:
        auth_service = AuthService(database)
        user = await auth_service.create_user(user)

        return UserProfile(
            id=str(user.id),
            username=user.username,
            email=user.email,
            full_name=user.full_name,
            is_online=user.is_online,
            last_seen=user.last_seen
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'failed to created user {str(e)}'
        )
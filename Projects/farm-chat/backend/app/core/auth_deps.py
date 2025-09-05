from fastapi import HTTPException, status, Depends, Cookie
from fastapi.security import HTTPBearer
from typing import Optional
from .security import verify_token
from .database import get_database
from app.services.auth_service import AuthService
from motor.motor_asyncio import AsyncIOMotorDatabase


security = HTTPBearer(auto_error=False)

async def get_current_user(
    access_token: Optional[str] = Cookie(None),
    database: AsyncIOMotorDatabase = Depends(get_database)):
    
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token required"
        )
    
    user_id = verify_token(access_token, 'access')
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    auth_service = AuthService(database)

    user = await auth_service.get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user


async def get_current_active_user(current_user=Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user
from fastapi import APIRouter, status, Depends, HTTPException, Response, Cookie
from app.services.auth_service import AuthService
from app.schemas.user import UserCreate, UserProfile, UserLogin, UserUpdate
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.core.security import create_access_token, create_refresh_token, verify_token
from datetime import timezone, datetime
from typing import Optional
from app.core.auth_deps import get_current_active_user, get_current_user

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
    

@auth_router.post('/login')
async def login(response:Response, user_login: UserLogin,database: AsyncIOMotorDatabase = Depends(get_database)):
    auth_service = AuthService(database)
    user = await auth_service.authenticate_user(user_login)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token=create_access_token(str(user.id))
    refresh_token=create_refresh_token(str(user.id))

    await auth_service.store_refresh_token(str(user.id), refresh_token)
    await auth_service.update_user_online_status(str(user.id), True)

    response.set_cookie(
        key="access_token",
        httponly=True,
        value=access_token,
        secure=False,
        samesite='lax',
        max_age=15 * 60
    )

    response.set_cookie(
        key="refresh_token",
        httponly=True,
        value=refresh_token,
        secure=False,
        samesite='lax',
        max_age=30 * 24 * 60 * 60
    )

    return {
        "message": "Login successful",
        "user": UserProfile(
            id=str(user.id),
            username=user.username,
            full_name=user.full_name,
            email=user.email,
            is_online=True,
            last_seen=datetime.now(timezone.utc)
        )
    }


@auth_router.post('/refresh')
async def refresh_token(response:Response, refresh_token: Optional[str] = Cookie(None), database: AsyncIOMotorDatabase = Depends(get_database)):
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token required"
        )
    user_id = verify_token(refresh_token, 'refresh')
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    auth_service = AuthService(database)

    is_valid = await auth_service.verify_refresh_token(user_id, refresh_token)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    new_access_token = create_access_token(user_id)
    
    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=True,
        secure=False,  
        samesite="lax",
        max_age=15 * 60  
    )
    
    return {"message": "Token refreshed successfully"}


@auth_router.post('/logout')
async def logout(
    response:Response,
    refresh_token: Optional[str] = Cookie(None),
    current_user= Depends(get_current_active_user),
    database: AsyncIOMotorDatabase = Depends(get_database)):
    
    auth_service = AuthService(database)

    await auth_service.update_user_online_status(str(current_user.id), False)

    if refresh_token:
        await auth_service.remove_refresh_token(str(current_user.id), refresh_token)

    response.delete_cookie(key="access_token")
    response.delete_cookie(key="refresh_token")

    return {"message":"Logout successfully"}


@auth_router.get('/me', response_model=UserProfile)
async def get_current_user_profile(current_user=Depends(get_current_active_user)):
    return UserProfile(
        id=str(current_user.id),
        username=current_user.username,
        full_name=current_user.full_name,
        email=current_user.email,
        is_online=current_user.is_online,
        last_seen=current_user.last_seen
    )
from pstats import Stats
from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timezone
from app.core.security import get_hased_password, verify_password, verify_token
from app.schemas.user import UserCreate, UserLogin
from app.models.user import UserInDB
from bson import ObjectId
from typing import Optional

class AuthService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.db = database
    
    async def create_user(self, user:UserCreate) -> UserInDB:
        try:
            existed_user = await self.db.users.find_one({"email":user.email})
            if existed_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f'Email already registered'
                )
            
            existed_user = await self.db.users.find_one({"username":user.username})
            if existed_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f'Username already registered'
                )
            
            hash_pasword = get_hased_password(user.password)

            user_dict = user.model_dump()
            del user_dict['password']
            user_dict['password'] = hash_pasword
            user_dict['created_at'] = datetime.now(timezone.utc)
            user_dict['refresh_tokens'] = []
            user_dict['is_online'] = False
            user_dict['is_active'] = True

            result = await self.db.users.insert_one(user_dict)
            user_dict['_id']=result.inserted_id

            return UserInDB(**user_dict)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"failed to create user {str(e)}"
            )

    async def authenticate_user(self, user_login:UserLogin) -> UserInDB:
        try:
            user_dict = await self.db.users.find_one({"email":user_login.email})

            if not user_dict:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="email not registered"
                )

            user = UserInDB(**user_dict)
            if not verify_password(user_login.password, user.password):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Invalid credentials"
                )
            
            return user
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"failed to create user {str(e)}"
            )

        
    async def get_user_by_id(self, user_id:str) -> Optional[UserInDB]:
        try:
            user = await self.db.users.find_one({"_id": ObjectId(user_id)})
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="user not found"
                )
            return UserInDB(**user)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"failed to create user {str(e)}"
            )
        
    async def update_user_online_status(self, user_id:str, is_online: bool):
        await self.db.users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set":{
                    "is_online":is_online,
                    "last_seen":datetime.now(timezone.utc)
                }
            }
        )

    async def store_refresh_token(self, user_id:str, refresh_token:str):
        await self.db.users.update_one(
            {"_id":ObjectId(user_id)},
            {
                "$push":{"refresh_tokens": refresh_token}
            }
        ) 
    
    async def remove_refresh_token(self, user_id:str, refresh_token:str):
        await self.db.users.update_one(
            {"_id":ObjectId(user_id)},
            {
                "$pull":{"refresh_tokens": refresh_token}
            }
        ) 
    
    async def verify_refresh_token(self, user_id:str, refresh_token:str) -> bool:
        user = await self.get_user_by_id(user_id)
        return user and refresh_token in user.refresh_tokens



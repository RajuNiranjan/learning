from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from datetime import datetime, timezone
from app.core.security import get_hased_password
from app.schemas.user import UserCreate
from app.models.user import UserInDB


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

            result = await self.db.users.insert_one(user_dict)
            user_dict['_id']=result.inserted_id

            return UserInDB(**user_dict)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"failed to create user {str(e)}"
            )

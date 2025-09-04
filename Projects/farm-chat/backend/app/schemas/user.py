from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
from app.helper.py_objectid import PyObjectId

class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    full_name: Optional[str] = None
    is_active: bool = False

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=15)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    full_name: Optional[str] = None

class User(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime
    last_seen: Optional[datetime] = None
    is_online: bool = False

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId},
    )

class UserProfile(BaseModel):
    id:str
    username:str
    full_name:Optional[str]
    email: EmailStr
    is_online: bool
    last_seen: Optional[datetime]
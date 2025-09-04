from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict
from app.helper.py_objectid import PyObjectId
from datetime import datetime, timezone
from bson import ObjectId


class UserInDB(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = False
    password: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_seen: Optional[datetime] = None
    is_online: bool = False
    refresh_tokens: List[str] = Field(default_factory=list)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
    )

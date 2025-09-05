from app.core.config import get_settings
from datetime import datetime, timezone, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from typing import Any, Union, Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Access Token
def create_access_token(subject: Union[str, Any], expire_delta: timedelta = None) -> str:
    settings = get_settings()
    if expire_delta:
        expire = datetime.now(timezone.utc) + expire_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp":expire, "sub":subject, "type":"access"}

    return jwt.encode(to_encode, settings.SECRET_KEY.get_secret_value(), algorithm=settings.ALGORITHM)


# Refresh Token
def create_refresh_token(subject: Union[str, Any], expire_delta: timedelta = None) -> str:
    settings = get_settings()
    if expire_delta:
        expire = datetime.now(timezone.utc) + expire_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    to_encode = {"exp":expire, "sub":subject, "type":"refresh"}

    return jwt.encode(to_encode, settings.SECRET_KEY.get_secret_value(), algorithm=settings.ALGORITHM)

# Hash Password
def get_hased_password(password:str)->str:
    return pwd_context.hash(password)

# Verify Password 
def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Verify Token 
def verify_token(token: str, type: str = "access") -> Optional[str]:
    settings = get_settings()
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY.get_secret_value(),
            algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")

        if user_id is None or token_type != type:  
            return None
        return user_id
    except JWTError:
        return None

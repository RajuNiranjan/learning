from dotenv import load_dotenv
from datetime import datetime, timedelta
from jose import jwt
import os
from fastapi import HTTPException, Request, Depends, status

load_dotenv()

JWT_SECRET=os.getenv("JWT_SECRET")
JWT_ALGORITHM=os.getenv("JWT_ALGORITHM")


def gen_token(data:dict, expires_delta=timedelta(hours=1)):
    to_encode= data.copy()
    to_encode.update({"exp": datetime.utcnow() + expires_delta})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token:str):
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

def get_current_user(request:Request):
    token = request.cookies.get("jwt")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
    
    user_data = decode_token(token)
    return user_data
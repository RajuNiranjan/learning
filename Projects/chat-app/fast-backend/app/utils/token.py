from jose import jwt
from .env import JWT_ALGORITHM,JWT_EXPIRES_IN,JWT_SECRET
from datetime import datetime, timedelta, UTC
from fastapi import Request, HTTPException

def gen_token(user_id:str) -> str:
    expire = datetime.now(UTC) + timedelta(minutes=int(JWT_EXPIRES_IN))
    payload = {
        "userId":user_id,
        'exp':expire,
        'iat':datetime.now(UTC)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(req:Request):
    token= req.cookies.get("jwt")

    if not token:
        raise HTTPException(status_code=401, detail="Token not found in cookies")
    
    decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

    return decoded["userId"]
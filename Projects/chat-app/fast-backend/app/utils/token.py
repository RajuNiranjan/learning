from jose import jwt
from .env import JWT_ALGORITHM,JWT_EXPIRES_IN,JWT_SECRET
from datetime import datetime, timedelta, UTC

def gen_token(user_id:str) -> str:
    expire = datetime.now(UTC) + timedelta(minutes=int(JWT_EXPIRES_IN))
    payload = {
        "userId":user_id,
        'exp':expire,
        'iat':datetime.now(UTC)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


    

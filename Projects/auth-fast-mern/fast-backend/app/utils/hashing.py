from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(user_password:str, db_password:str) -> bool:
    return pwd_context.verify(user_password, db_password)
from pydantic import BaseModel

class User(BaseModel):
    _id:str
    username:str
    email:str
    password:str

class LogIn(BaseModel):
    emailOrUserName:str
    password:str

class SignUp(BaseModel):
    username:str
    email: str
    password: str

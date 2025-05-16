from pydantic import BaseModel

class SignUp(BaseModel):
    username:str
    email:str
    password:str
    profile_pic:str = ""

class LogIn(BaseModel):
    emailOrUserName:str
    password:str
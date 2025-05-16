from pydantic import BaseModel


class UserBaseModel(BaseModel):
    id:str
    username:str
    email:str
    profile_pic:str

class SignUp(BaseModel):
    username:str
    email:str
    password:str
    profile_pic:str = ""

class LogIn(BaseModel):
    emailOrUserName:str
    password:str
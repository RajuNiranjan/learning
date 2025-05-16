from app.config.database import user_collection
from app.models.user_model import SignUp, LogIn
from app.utils.hashing import hash_password,verify_password
from app.utils.token import gen_token,decode_token
from fastapi import HTTPException, status, Response, Request
from bson import ObjectId


async def signup_service(user: SignUp, response: Response):
    existing_user = await user_collection.find_one({
        "$or": [
            {"email": user.email},
            {"username": user.username}
        ]
    })

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already existed with this email or user name")
    
    hashed_password = hash_password(user.password)
    profile_pic = f"https://avatar.iran.liara.run/username?username={user.username}"

    new_user = {
        "username":user.username,
        "email":user.email,
        "password":hashed_password,
        "profile_pic":profile_pic
    }

    result = await user_collection.insert_one(new_user)
    new_user["_id"]=str(result.inserted_id)
    new_user.pop("password", None)

    token = gen_token(str(new_user["_id"]))

    response.set_cookie(
        key="jwt",
        value=token,
        httponly=True,
        max_age=60 * 60 * 24 * 7,
        secure=True,
        samesite="lax"
    )

    return new_user


async def login_server(user:LogIn, response:Response):
    user_data = await user_collection.find_one({
        "$or":[
            {"email":user.emailOrUserName},
            {"username":user.emailOrUserName},
        ]
    })

    if not user_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if not verify_password(user.password, user_data["password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid credentials")
    
    token = gen_token(str(user_data["_id"]))

    user_data.pop("password",None)
    user_data["_id"] = str(user_data["_id"])

    response.set_cookie(
        key="jwt",
        value=token,
        httponly=True,
        max_age=60 * 60 * 24 * 7,
        secure=True,
        samesite="lax"
    )

    return user_data


async def check_auth_server(req:Request):
    user_id= decode_token(req)
    user = await user_collection.find_one({"_id":ObjectId(user_id)})

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    
    user.pop("password",None)
    user["_id"]=str(user['_id'])

    return user

def logout_service(res:Response):
    res.delete_cookie("jwt")
    return {"message":"logout successfully"}
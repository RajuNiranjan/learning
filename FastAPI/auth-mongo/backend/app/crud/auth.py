from ..config.database import user_collection
from ..models.user import SignUp, LogIn
from fastapi import HTTPException,Response
from fastapi.responses import JSONResponse
from ..utils.hashing import hash_password, validate_password
from ..utils.token import gen_token
from bson import ObjectId
from bson.errors import InvalidId




async def signup_service(user: SignUp):
    existed_user = await user_collection.find_one({
        "$or": [{"email": user.email}, {"username": user.username}]
    })
    if existed_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = hash_password(user.password)

    result = await user_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed
    })
    
    new_user = await user_collection.find_one({"_id": result.inserted_id})

    token = gen_token({"userId": str(result.inserted_id)})

    new_user["_id"] = str(new_user.pop("_id"))
    new_user.pop("password", None)

    res = JSONResponse(new_user)
    res.set_cookie(
        key="jwt",
        value=token,
        httponly=True,
        secure=True,
        max_age=3600
    )

    return res

async def login_service(user_data: LogIn):
    user = await user_collection.find_one({"$or":[{"email":user_data.emailOrUserName},{"username":user_data.emailOrUserName}]})

    if not user:
        raise HTTPException(status_code=404, detail="user not existed")
    
    if not validate_password(user_data.password,user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    user.pop("password",None)

    user["_id"] = str(user.pop("_id"))

    token = gen_token({"userId":user["_id"]})

    res = JSONResponse(content=user)

    res.set_cookie(
        key="jwt",
        value=token,
        httponly=True,
        secure=True,
        max_age=3600
    )
    return res

async def check_auth_service(userId:str):
    user = await user_collection.find_one({"_id": ObjectId(userId)})
    if user:
        user["_id"] = str(user["_id"])  
        user.pop("password",None)
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")
    

def logout_service(res: Response):
    res.delete_cookie("jwt")
    return {"message": "Logged out successfully"}

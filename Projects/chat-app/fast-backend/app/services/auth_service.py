from app.config.database import user_collection
from app.models.user_model import UserBaseModel, SignUp, LogIn
from app.utils.hashing import hash_password,verify_password
from app.utils.token import gen_token
from fastapi import HTTPException, status, Response
from fastapi.responses import JSONResponse


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

    user_dict = user.model_dump()
    user_dict['password'] = hashed_password
    user_dict['profile_pic'] = profile_pic

    result = await user_collection.insert_one(user_dict)
    if not result.inserted_id:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create user")
    
    user_data = {
        "id": str(result.inserted_id),
        "username": user.username,
        "email": user.email,
        "profile_pic": profile_pic
    }

    token = gen_token(user_data["id"])

    response.set_cookie(
        key="jwt",
        value=token,
        httponly=True,
        max_age=60 * 60 * 24 * 7,
        secure=True,
        samesite="lax"
    )

    return user_data



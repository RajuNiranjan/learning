from fastapi import FastAPI
import models
from database import engine
from routers import blog_router, user_router


app = FastAPI()



models.Base.metadata.create_all(bind=engine)

app.include_router(user_router.user_router)
app.include_router(blog_router.blog_router)




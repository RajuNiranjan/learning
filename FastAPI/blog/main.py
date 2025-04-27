from fastapi import FastAPI
import models
from database import engine
from routers import user, blog


app = FastAPI()



models.Base.metadata.create_all(bind=engine)

app.include_router(user.user_router)
app.include_router(blog.blog_router)




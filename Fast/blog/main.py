from fastapi import FastAPI
import models
from database import engine
from routers import auth_router, blog_router, user_router


app = FastAPI(
    title="Blog API",
    description="A simple blog API with user authentication",
    version="1.0.0"
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(user_router.user_router)
app.include_router(blog_router.blog_router)
app.include_router(auth_router.auth_router)

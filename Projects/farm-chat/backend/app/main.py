from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.database import connect_to_mongo, close_mongo_connection
from app.core.config import get_settings
from app.routes.auth import auth_router
@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title=get_settings().PROJECT_NAME,
    lifespan=lifespan)

@app.get("/")
def root():
    settings = get_settings()
    return {
        "message": f"welcome to {settings.PROJECT_NAME}",
        "version": settings.VERSION,
        "docs": "/docs",
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}


app.include_router(auth_router)


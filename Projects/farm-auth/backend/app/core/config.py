from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from pydantic import SecretStr

class Settings(BaseSettings):
    PROJECT_NAME:str = "FARM Chat App"
    VERSION:str = "0.0.1"

    MONGODB_URL:str
    DATABASE_NAME:str

    SECRET_KEY:SecretStr
    ALGORITHM:str
    ACCESS_TOKEN_EXPIRE_MINUTES:int
    REFRESH_TOKEN_EXPIRE_DAYS:int

    REDIS_URL:str

    ALLOWED_HOSTS: List[str] = ["*"]
    CORS_ORIGINS: List[str] = [
        "http://localhost",
        "http://localhost:5173",
    ]

    model_config=SettingsConfigDict(
        env_file=".env",
        frozen=True
    )

settings = Settings()


def get_settings() -> Settings:
    return settings
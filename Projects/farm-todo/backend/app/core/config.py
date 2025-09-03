from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGODB_URI:str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "farm_todo"
    COLLECTION_NAME:str = "todo"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
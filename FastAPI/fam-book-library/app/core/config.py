from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    MONGODB_URI:str = "mongodb://localhost:27017"
    DATABASE_NAME:str = "fam_book_library"
    COLLECTION_NAME:str = "books"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
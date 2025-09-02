from .config import settings
from motor.motor_asyncio import AsyncIOMotorClient


client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client[settings.DATABASE_NAME]

book_collection = db[settings.COLLECTION_NAME]
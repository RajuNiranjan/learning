from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings


client = AsyncIOMotorClient(settings.MONGODB_URI)
db=client[settings.DATABASE_NAME]

todo_collection = db[settings.COLLECTION_NAME]
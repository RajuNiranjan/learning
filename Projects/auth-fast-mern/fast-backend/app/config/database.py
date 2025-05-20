from app.utils.env import DB_URI
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient(DB_URI)

db = client["fast-chat"]
user_collection = db['users']
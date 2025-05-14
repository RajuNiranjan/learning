from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os


DB_URI=os.getenv("DB_URI")

client = AsyncIOMotorClient(DB_URI)
db = client['fast-auth']
user_collection = db["users"]
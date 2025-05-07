import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient


load_dotenv()

DB_URI = os.getenv("DB_URI")

client = AsyncIOMotorClient(DB_URI)

database = client.todo

todo_collection = database.get_collection("fast_todo")



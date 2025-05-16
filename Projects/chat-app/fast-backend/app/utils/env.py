from dotenv import load_dotenv
import os

load_dotenv()

DB_URI= os.getenv("DB_URI")
JWT_SECRET= os.getenv("JWT_SECRET")
JWT_ALGORITHM= os.getenv("JWT_ALGORITHM")
JWT_EXPIRES_IN= os.getenv("JWT_EXPIRES_IN")

import os
from dotenv import load_dotenv
from langchain_openai import OpenAI

load_dotenv()

OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")

client = OpenAI(openai_api_key=OPENAI_API_KEY, model="gpt-4o-mini")

promt1 = "Can you name top 10 countires of asia?"

print(client.invoke(promt1).strip())
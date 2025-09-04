from fastapi import FastAPI
from app.core.config import get_settings

app = FastAPI()

@app.get('/')
def root():
    settings = get_settings()
    return{
        "message":f'welcome to {settings.PROJECT_NAME}',
        "version":settings.VERSION,
        "docs":'/docs'
    }

@app.get('/helth')
def helth_check():
    return {"status":"helthy"}
    
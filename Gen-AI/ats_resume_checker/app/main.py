from fastapi import FastAPI
from app.api.v1.resume import resume_router
from app.middlewares.logging import log_middleware

app=FastAPI()

@app.get("/")
def index():
    return {"message":"welcome to the ATS_RESUME_CHECKER"}


app.include_router(resume_router, prefix='/api/v1')


app.middleware("http")(log_middleware)
from fastapi import APIRouter, UploadFile, File, Form
from app.controllers.resume_controller import process_resume

resume_router=APIRouter(
    prefix="/resume",
    tags=["RESUME"]
)

@resume_router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    jd: UploadFile = File(...)
):
    return await process_resume(resume, jd)
from app.services.resume_service import ResumeAnalyzer
from app.utils.pdf_parser import extract_pdf_text

async def process_resume(resume_file, jd_file):
    resume_text = extract_pdf_text(resume_file)
    jd_text = extract_pdf_text(jd_file)

    analyzer = ResumeAnalyzer()
    score, feedback = analyzer.analyze(resume_text, jd_text)

    return {
        "score": float(score),    # 🔥 Critical fix
        "feedback": feedback
    }

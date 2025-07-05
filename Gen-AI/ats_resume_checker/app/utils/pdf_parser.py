from langchain_community.document_loaders import PyPDFLoader
import tempfile



def extract_pdf_text(upload_file):
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix='.pdf'
    ) as tmp:
        tmp.write(upload_file.file.read())
        tmp.flush()
        loader=PyPDFLoader(tmp.name)
        pages=loader.load()
        return ' '.join([page.page_content for page in pages])
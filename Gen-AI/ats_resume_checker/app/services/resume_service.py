from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from app.constants import RESUME_FEEDBACK_PROMPT
from langchain.chains import LLMChain
from app.config import OPENAI_API_KEY

class ResumeAnalyzer:

    def __init__(self):
        self.llm = ChatOpenAI(
            model='gpt-4o',
            temperature=0,
            api_key=OPENAI_API_KEY
        )
        self.embeddings=OpenAIEmbeddings(api_key=OPENAI_API_KEY)
        self.splitter=RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )
    
    

    def analyze(self, resume_text, jd_text):
        resume_chunks=self.splitter.split_text(resume_text)
        jd_chunks=self.splitter.split_text(jd_text)

        resume_db=FAISS.from_texts(resume_chunks, self.embeddings)
        jd_db=FAISS.from_texts(jd_chunks, self.embeddings)

        def score_chunks(query, db):
            results = db.similarity_search_with_score(query, k=3)
            return sum([1 / (1 + score) for _, score in results]) / len(results)

        jd_score = float(sum(score_chunks(chunk, resume_db) for chunk in jd_chunks) / len(jd_chunks))
        resume_score = float(sum(score_chunks(chunk, jd_db) for chunk in resume_chunks) / len(resume_chunks))
        final_score = round((jd_score + resume_score) / 2 * 100, 2)


        prompt = PromptTemplate.from_template(RESUME_FEEDBACK_PROMPT)
        chain = prompt | self.llm
        feedback = chain.invoke({"resume": resume_text, "jd": jd_text})  # ✅ correct


        return float(final_score), str(feedback)




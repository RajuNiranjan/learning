import os 
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain
load_dotenv()

OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(
    openai_api_key=OPENAI_API_KEY,
    model="gpt-4o-mini",
    temperature=0.7,
)

TEMPLATE=""" 
text={text}
subject={subject}
tone={tone}
number={number}

Instructios:
You are to generate a quiz in a {tone} tone based on the subject "{subject}".
the quiz should contain {number} multiple-choice question.
Each question should have:
- a clear and concise question text
- four option lebeled A, B, C, D
- a correct answer key

output must be in the following JSON format:
{response_json}

"""


quiz_prompt = PromptTemplate(
    input_variables=["text", "subject", "number", "tone", "response_json"],
    template=TEMPLATE
)

quiz_chain = LLMChain(
    llm=llm,
    prompt=quiz_prompt,
    output_key="quiz",
    verbose=True
)

TEMPLATE = """
You are an expert English grammarian and writer. Given a multiple-choice quiz for {subject} students,
you need to evaluate the complexity of the questions and provide a complete analysis of the quiz.

- Use **no more than 50 words** for the complexity analysis.
- If any question does not align with the cognitive and analytical abilities of the students,
revise only those questions and adjust the tone to better suit the appropriate difficulty level.

Quiz MCQs:
{quiz}

Please provide your evaluation and the updated quiz (if needed) from the perspective of an expert English writer:
"""


review_prompt = PromptTemplate(
    input_variables=["subject", "quiz"],
    template=TEMPLATE
)

review_chain = LLMChain(
    llm=llm,
    prompt=review_prompt,
    output_key="review",
    verbose=True
)

quiz_evaluate_chain=SequentialChain(
    chains=[quiz_chain, review_chain],
    input_variables=["text", "subject", "number", "tone", "response_json"],
    output_variables=["quiz", 'review'],
    verbose=True
)
from PyPDF2 import PdfReader
import json
import traceback

def read_file(file):
    if file.name.endswith('.pdf'):
        try:
            pdf_read = PdfReader(file)
            text = ""
            for page in pdf_read.pages:
                text+=page.extract_text()
            return text
        except Exception:
            raise Exception("error while reading file")
    
    elif file.name.endswith(".txt"):
        return file.read().decode("utf-8")
    else:
        raise Exception("unsupported file format only pdf and txt file supported")

def get_table_data(quiz):
    try:
        quiz_dic=json.loads(quiz)
        quiz_table_data=[]

        for key, value in quiz_dic.items():
            mcq= value['mcq']
            correct_answer=value['correct_answer']
            options=" ||\n ".join(
                [
                    f'{option} --> {option_value}'
                    for option, option_value in value["options"].items()
                ]
            )
            quiz_table_data.append({"MCQ":mcq, "Options":options, "Correct":correct_answer})
        
        return quiz_table_data
    except Exception as e:
        traceback.print_exception(type(e), e, e.__traceback__)
        return False
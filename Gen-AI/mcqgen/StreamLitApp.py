from src.mcqgen.utils import read_file, get_table_data
from src.mcqgen.MCQGen import quiz_evaluate_chain
import streamlit as st
from langchain.callbacks.manager import get_openai_callback
import json
import traceback
import pandas as pd
from src.mcqgen.log import logging

try:
    with open('response.json', 'r') as file:
        RESPONSE_JSON=file.read()
    logging.info("Successfully loaded response.json")
except FileNotFoundError as e:
    logging.error(f"reponse.json file not found: {e}")
except Exception as e:
    logging.error(f"Error loading response.json: {e}")
    RESPONSE_JSON = None


st.title("MCQ Generator")


with st.form("user_inputs"):
    #file uploader
    upload_file = st.file_uploader("upload pdf or txt file")

    #subject
    subject = st.text_input("Enter subject ")

    #number
    number = st.number_input("enter no. of questions", min_value=3, max_value=10)

    #tone
    tone = st.text_input("complexity", placeholder="simple")

    #button
    button = st.form_submit_button("Create MCQs")

    #check if the button is clicked and all fields have inputs

    if button and upload_file is not None and subject and number and tone:
        with st.spinner("loading..."):
            try:
                text=read_file(upload_file)

                with get_openai_callback() as cb:
                    response = quiz_evaluate_chain(
                        {
                            "text":text,
                            "subject":subject,
                            "number":number,
                            "tone":tone,
                            "response_json": json.dumps(RESPONSE_JSON)
                        }
                    )
                logging.info("quiz_eveluate_cahin completed")
            except Exception as e:
                logging.error(f"An error occurred: {e}", exc_info=True)
                traceback.print_exception(type(e), e, e.__traceback__)
                st.error("Error", e)

            else:
                logging.info(f"Total Tokens: {cb.total_tokens } ")
                logging.info(f"Prompt Tokens: {cb.prompt_tokens } ")
                logging.info(f"Completion Tokens: {cb.completion_tokens } ")
                logging.info(f"Total Cost: {cb.total_cost } ")

                if isinstance(response, dict):
                    quiz = response.get("quiz", None).strip("`").replace("json", "").strip()
                    if quiz is not None:
                        quiz = quiz.strip("`").replace("json", "").strip()
                        table_data=get_table_data(quiz)
                        if table_data is not None:
                            df = pd.DataFrame(table_data)
                            df.index=df.index+1
                            st.table(df)
                            st.text_area(label="Review", value=response['review'])
                            logging.info("Table displayed successfully")
                        else:
                            logging.error("Quiz data is missing or invalid")
                            st.error("error in the table data")
                else:
                    st.write(response)
                    logging.info("Response displayed")


                    
                    
                    

            


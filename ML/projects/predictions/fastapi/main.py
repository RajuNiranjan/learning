from fastapi import FastAPI
from pydantic import BaseModel
import pickle

app = FastAPI()

class ModelInput(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

diabetes_model = pickle.load(
    open("../multiple_disease_prediction/models/diabetes_model.svc", "rb")
)

@app.post("/diabetes_prediction")
def diabetes_predict(input: ModelInput):
    data = [[
        input.Pregnancies,
        input.Glucose,
        input.BloodPressure,
        input.SkinThickness,
        input.Insulin,
        input.BMI,
        input.DiabetesPedigreeFunction,
        input.Age
    ]]
    prediction = diabetes_model.predict(data)
    return {"result": "The person is diabetic" if prediction[0] else "The person is not diabetic"}

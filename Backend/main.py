from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import uvicorn


app = FastAPI(title="Diabetes Prediction API")

# --- CORS -------------------------------------------------
# Allow the frontend (usually running on localhost:3000) to call this API.
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model
with open("models/model.pkl", "rb") as file:
    model = pickle.load(file)


class PatientData(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float


@app.get("/")
def root():
    return {"message": "Welcome to Diabetes Prediction API"}


@app.post("/predict")
def predict(data: PatientData):
    # Convert input to NumPy array
    input_data = np.array([
        [
            data.Pregnancies,
            data.Glucose,
            data.BloodPressure,
            data.SkinThickness,
            data.Insulin,
            data.BMI,
            data.DiabetesPedigreeFunction,
            data.Age,
        ]
    ])

    # Make prediction
    prediction = model.predict(input_data)[0]
    prob = model.predict_proba(input_data)[0][1]  # Probability of diabetes

    result = "Diabetic" if prediction == 1 else "Non-Diabetic"

    return {
        "prediction": int(prediction),
        "result": result,
        "probability": round(float(prob), 3),
    }


if __name__ == "__main__":
    # Allow running this file directly: `python main.py`
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)






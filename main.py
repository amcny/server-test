from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class BMICalculator(BaseModel):
    weight: float  # Weight in kg
    height_cm: float  # Height in cm

@app.post("/calculate_bmi/")
def calculate_bmi(data: BMICalculator):
    height_m = data.height_cm / 100  # Convert cm to meters
    bmi = data.weight / (height_m ** 2)
    
    category = (
        "Underweight" if bmi < 18.5 else
        "Normal weight" if 18.5 <= bmi < 24.9 else
        "Overweight" if 25 <= bmi < 29.9 else
        "Obese"
    )
    
    return {
        "weight": data.weight,
        "height_cm": data.height_cm,
        "BMI": round(bmi, 2),
        "Category": category
    }
# Diabetes Prediction App

A full-stack web application for predicting diabetes risk using a trained Machine Learning model.

- **Backend:** FastAPI + scikit-learn (Python)
- **Frontend:** React (Create React App) + Tailwind CSS
- **Communication:** Frontend calls the backend via REST API (Axios)

---

## Tech Stack

### Backend
- Python
- FastAPI (API)
- Uvicorn (ASGI server)
- Pydantic (request validation)
- NumPy, Pandas (data handling)
- scikit-learn (ML model)
- Jupyter, Matplotlib, Seaborn (notebooks/visualization)

### Frontend
- JavaScript
- React (Create React App)
- Axios (HTTP client)
- Tailwind CSS (styling)

---

## Repository Structure

```text
.
├── Backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── models/              # contains model.pkl (used by the API)
│   ├── notebooks/           # experiments / training notebooks
│   └── src/                 # any backend helper code (if present)
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── public/
    └── src/
```

---

## Getting Started (Local Development)

### Prerequisites
- Python 3.9+ recommended
- Node.js 18+ recommended (any recent LTS should work)
- pip / venv

---

## Backend Setup (FastAPI)

1. Go to the backend directory:
   ```bash
   cd Backend
   ```

2. Create and activate a virtual environment:

   **macOS/Linux**
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

   **Windows (PowerShell)**
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Ensure the model file exists:
   - The backend loads the model from:
     - `Backend/models/model.pkl`

5. Run the API:
   ```bash
   python main.py
   ```

Backend will start on:
- `http://127.0.0.1:8000`

API docs:
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

---

## Frontend Setup (React)

1. Open a new terminal and go to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

Frontend will start on:
- `http://localhost:3000`

---

## API Usage

### `POST /predict`

Send patient input data as JSON.

Example:
```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Pregnancies": 2,
    "Glucose": 120,
    "BloodPressure": 70,
    "SkinThickness": 20,
    "Insulin": 85,
    "BMI": 28.5,
    "DiabetesPedigreeFunction": 0.35,
    "Age": 33
  }'
```

Example response:
```json
{
  "prediction": 0,
  "result": "Non-Diabetic",
  "probability": 0.123
}
```

---

## Notes / Troubleshooting

- **CORS:** The backend is configured to allow requests from common local frontend ports (e.g., `3000`, `5173`).
- If the frontend can’t reach the backend, check:
  - Backend is running on `127.0.0.1:8000`
  - The frontend is calling the correct API base URL
  - No firewall/proxy issues

---

## License

Add a license here (e.g., MIT) if you plan to open-source the project.

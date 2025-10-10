import React from "react";
import PredictionForm from "./components/PredictionForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        🩺 Diabetes Prediction App
      </h1>
      <PredictionForm />
    </div>
  );
}

export default App;

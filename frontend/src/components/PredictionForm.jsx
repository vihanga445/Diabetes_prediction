import React, { useState } from "react";
import axios from "axios";

const fields = [
  { label: "Pregnancies", name: "Pregnancies", range: "(0 - 20)", placeholder: "9" },
  { label: "Glucose", name: "Glucose", range: "(40 - 300) mg/dL", placeholder: "55" },
  { label: "Blood Pressure", name: "BloodPressure", range: "(40 - 130) mm Hg", placeholder: "80" },
  { label: "Skin Thickness", name: "SkinThickness", range: "(0 - 100) mm", placeholder: "6" },
  { label: "Insulin", name: "Insulin", range: "(0 - 900) µU/ml", placeholder: "500" },
  { label: "BMI", name: "BMI", range: "(10 - 70) kg/m²", placeholder: "19" },
  { label: "DPF Score", name: "DiabetesPedigreeFunction", range: "(0 - 3)", placeholder: "3" },
  { label: "Age", name: "Age", range: "(21 - 100) years", placeholder: "23" },
];

const PredictionForm = () => {
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map((f) => [f.name, ""]))
  );
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    for (const key in formData) {
      if (formData[key] === "" || isNaN(formData[key])) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setResult(null);

    if (!validate()) {
      setErrorMsg("Prediction Error: Please correct the highlighted form errors.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/predict", formData);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Server Error: Unable to get prediction. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
      {/* Error Message */}
      {errorMsg && (
        <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-semibold mb-1">
              {field.label}{" "}
              <span className="text-gray-400 text-xs">{field.range}</span>
            </label>
            <input
              type="number"
              step="any"
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none 
                ${
                  errorMsg && formData[field.name] === ""
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200"
                }`}
            />
          </div>
        ))}

        <div className="sm:col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {/* Result Section */}
      {result && (
        <div className="mt-8 p-6 border border-gray-200 bg-gray-50 rounded-xl text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Prediction Result</h2>
          <p
            className={`text-lg font-semibold ${
              result.result === "Diabetic" ? "text-red-600" : "text-green-600"
            }`}
          >
            {result.result}
          </p>
          <p className="text-gray-600 mt-1">
            Probability: <span className="font-medium">{result.probability}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;

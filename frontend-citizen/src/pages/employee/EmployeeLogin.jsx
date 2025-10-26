import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeeLogin } from "../../services/api";

const EmployeeLogin = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await employeeLogin(employeeId);
      // Save employee ID in localStorage
      localStorage.setItem("employeeId", data.id);
      localStorage.setItem("employeeName", data.name);
      navigate("/employee/dashboard");
    } catch (err) {
      setError("Invalid Employee ID. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-green-100 items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Employee Login
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <label className="block mb-2 font-semibold">Employee ID</label>
        <input
          type="number"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter your Employee ID"
          className="w-full border rounded-lg p-3 mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EmployeeLogin;

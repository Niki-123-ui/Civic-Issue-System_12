import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("Citizen"); // Default selection
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Later you can add real authentication
    if (role === "Citizen") navigate("/dashboard");
    if (role === "Admin") navigate("/admin/dashboard");
    if (role === "Employee") navigate("/employee/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-green-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          Login Portal
        </h1>

        {/* Role Selection */}
        <div className="flex justify-between mb-8">
          {["Citizen", "Admin", "Employee"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 mx-2 py-3 rounded-lg font-bold text-lg transition ${
                role === r
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Current Role Info */}
        <p className="text-center mt-6 text-gray-600">
          Selected Role:{" "}
          <span className="font-semibold text-blue-700">{role}</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
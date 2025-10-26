import React from "react";
import { useNavigate } from "react-router-dom";
import successImage from "../assets/images-8-removebg-preview.png"; // ✅ move image to assets
import { useLocation } from "react-router-dom";


const ReportSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract complaint ID from URL query (?id=...)
  const queryParams = new URLSearchParams(location.search);
  const complaintId = queryParams.get("id");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-cyan-900 to-purple-400 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">Citizen Portal</h1>
          <nav className="space-y-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="block text-left w-full hover:text-yellow-300"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/track/1")}
              className="block text-left w-full hover:text-yellow-300"
            >
              Track Progress
            </button>
            <button className="block text-left w-full hover:text-yellow-300">
              Notice
            </button>
            <button className="block text-left w-full hover:text-yellow-300">
              Profile
            </button>
          </nav>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-red-300 hover:text-red-500"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-200 via-blue-100 to-green-100 flex flex-col items-center justify-center p-6">
        <img
          src={successImage}
          alt="Success"
          className="w-64 h-64 object-contain mb-6"
        />

        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Complaint Registered Successfully 🎉
        </h2>

        <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
          Your complaint has been submitted successfully.
          You can track its progress anytime from the dashboard.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </main>
    </div>
  );
};

export default ReportSuccess;

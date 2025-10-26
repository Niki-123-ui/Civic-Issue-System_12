import React, { useState } from "react";
import { trackIssue } from "../services/api"; // API call
import { useNavigate } from "react-router-dom";

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await trackIssue(complaintId);
      setComplaint(data);
    } catch (err) {
      alert("Complaint not found. Please check the ID.");
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-cyan-900 to-purple-400 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">Citizen Portal</h1>
          <nav className="space-y-6">
            <button onClick={() => navigate("/dashboard")} className="hover:text-yellow-300">
              Dashboard
            </button>
            <button className="text-yellow-300 font-semibold">Track Progress</button>
            <button className="hover:text-yellow-300">Notice</button>
            <button className="hover:text-yellow-300">Profile</button>
          </nav>
        </div>
        <button onClick={() => navigate("/")} className="text-red-300 hover:text-red-500">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-200 via-blue-100 to-green-100 flex flex-col items-center justify-start p-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Track Complaint</h2>

        {/* Complaint ID Form */}
        <form onSubmit={handleTrack} className="flex gap-4 mb-8">
          <input
            type="number"
            placeholder="Enter Complaint ID"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            className="border rounded-lg p-3 w-64"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </form>

        {/* Complaint Details */}
        {complaint && (
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Complaint Details</h3>
            <p><span className="font-semibold">ID:</span> {complaint.id}</p>
            <p><span className="font-semibold">Category:</span> {complaint.category}</p>
            <p><span className="font-semibold">Description:</span> {complaint.description}</p>
            <p><span className="font-semibold">Location:</span> {complaint.location}</p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  complaint.status === "resolved"
                    ? "text-green-600"
                    : complaint.status === "pending"
                    ? "text-yellow-600"
                    : "text-blue-600"
                } font-semibold`}
              >
                {complaint.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Assigned To:</span>{" "}
              {complaint.assigned_to || "Not Assigned Yet"}
            </p>
            {complaint.photo && (
              <div className="mt-4">
                <p className="font-semibold">Attached Photo:</p>
                <img
                  src={`http://127.0.0.1:8000/${complaint.photo}`}
                  alt="Complaint"
                  className="w-64 h-64 object-cover border rounded-lg mt-2"
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TrackComplaint;


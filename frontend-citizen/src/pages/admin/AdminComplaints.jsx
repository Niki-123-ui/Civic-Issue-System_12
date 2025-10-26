import React, { useEffect, useState } from "react";
import { getAllComplaints } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const AdminComplaints = () => {
  const [complaint, setComplaint] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const complaints = await getAllComplaints();
        const selected = complaints.find((c) => c.id === parseInt(id));
        setComplaint(selected);
      } catch (err) {
        console.error("Error loading complaint details:", err);
      }
    };
    fetchComplaint();
  }, [id]);

  if (!complaint) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-cyan-900 to-purple-400 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Portal</h1>
        <nav className="space-y-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="block w-full text-left hover:text-yellow-300"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/complaints")}
            className="block w-full text-left hover:text-yellow-300"
          >
            Complaints
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Complaint Details</h2>
        <div className="bg-white p-6 rounded shadow">
          <p><strong>ID:</strong> {complaint.id}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Citizen:</strong> {complaint.name}</p>
          <p><strong>Location:</strong> {complaint.location}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
          <p><strong>Assigned To:</strong> {complaint.assigned_to || "None"}</p>
          {complaint.photo && (
            <img
              src={`http://127.0.0.1:8000/${complaint.photo}`}
              alt="Complaint"
              className="mt-4 w-64 h-64 object-contain border"
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminComplaints;

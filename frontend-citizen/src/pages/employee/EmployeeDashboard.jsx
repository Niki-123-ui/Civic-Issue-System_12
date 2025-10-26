import React, { useState, useEffect } from "react";
import {
  getEmployeeComplaints,
  employeeLogin,
  resolveComplaint,
} from "../../services/api";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");
  const [complaints, setComplaints] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (!employeeId) {
      navigate("/employee/login");
      return;
    }

    const fetchData = async () => {
      try {
        const empData = await employeeLogin(employeeId);
        setEmployee(empData);

        const tasks = await getEmployeeComplaints(employeeId);
        setComplaints(tasks);
      } catch (err) {
        console.error("Error fetching employee data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId, navigate]);

  const handleNavClick = (itemName) => {
    setActiveNavItem(itemName);
  };

  const handleResolve = async () => {
    if (!selectedComplaint) {
      alert("Select a complaint to mark as completed.");
      return;
    }

    try {
      await resolveComplaint(selectedComplaint.id, employeeId);
      alert("✅ Complaint marked as resolved!");

      // Refresh complaints
      const updated = await getEmployeeComplaints(employeeId);
      setComplaints(updated);
      setSelectedComplaint(null);
      setActiveNavItem("Dashboard");
    } catch (err) {
      console.error("Resolve error:", err);
      alert("Error resolving complaint.");
    }
  };

  const tasks = complaints.filter((c) => c.status !== "resolved");
  const history = complaints.filter((c) => c.status === "resolved");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-700">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-green-100 min-h-screen flex">
      {/* Sidebar */}
      <nav className="w-60 h-screen bg-gradient-to-b from-cyan-900 to-purple-300 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Employee Portal</h1>
        <p className="mb-6">Welcome, {employee?.name}</p>

        <ul className="flex flex-col gap-6 mt-6">
          {["Dashboard", "Task Details", "History"].map((item) => (
            <li key={item}>
              <button
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left px-2 py-1 rounded transition-colors duration-200 ${
                  activeNavItem === item
                    ? "bg-white text-cyan-900 font-semibold"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="mt-10 text-red-300 hover:text-red-500"
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          {activeNavItem}
        </h1>

        {/* Dashboard View */}
        {activeNavItem === "Dashboard" && (
          <div className="grid grid-cols-2 gap-8">
            {/* My Tasks */}
            <div className="bg-white rounded-2xl shadow p-6 border">
              <h2 className="text-2xl font-bold mb-4 text-blue-700">
                My Tasks
              </h2>
              {tasks.length > 0 ? (
                <ul className="space-y-3">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className={`p-3 rounded-lg cursor-pointer ${
                        selectedComplaint?.id === task.id
                          ? "bg-blue-200"
                          : "bg-blue-50"
                      }`}
                      onClick={() => {
                        setSelectedComplaint(task);
                        setActiveNavItem("Task Details");
                      }}
                    >
                      <span>{task.description}</span>
                      <span className="block text-sm text-gray-600">
                        {task.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No tasks assigned yet.</p>
              )}
            </div>

            {/* History */}
            <div className="bg-white rounded-2xl shadow p-6 border">
              <h2 className="text-2xl font-bold mb-4 text-blue-700">History</h2>
              {history.length > 0 ? (
                <ul className="space-y-3">
                  {history.map((task) => (
                    <li
                      key={task.id}
                      className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                    >
                      <span>{task.description}</span>
                      <span className="text-sm text-gray-600">
                        {task.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No completed tasks yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Task Details View */}
        {activeNavItem === "Task Details" && selectedComplaint && (
          <div className="bg-white rounded-2xl shadow p-6 border">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              Task Details
            </h2>
            <p>
              <strong>Category:</strong> {selectedComplaint.category}
            </p>
            <p>
              <strong>Description:</strong> {selectedComplaint.description}
            </p>
            <p>
              <strong>Citizen:</strong> {selectedComplaint.name}
            </p>
            <p>
              <strong>Location:</strong> {selectedComplaint.location}
            </p>
            <p>
              <strong>Status:</strong> {selectedComplaint.status}
            </p>

            {/* Mark as Resolved */}
            <button
              onClick={handleResolve}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Mark as Completed ✅
            </button>
          </div>
        )}

        {/* History View */}
        {activeNavItem === "History" && (
          <div className="bg-white rounded-2xl shadow p-6 border">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">History</h2>
            <ul className="space-y-3">
              {history.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                >
                  <span>{task.description}</span>
                  <span className="text-sm text-gray-600">{task.status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeeDashboard;




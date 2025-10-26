import React, { useEffect, useState } from "react";
import { getAllComplaints, getAllEmployees } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintsData = await getAllComplaints();
        const employeesData = await getAllEmployees();
        setComplaints(complaintsData);
        setEmployees(employeesData);
      } catch (err) {
        console.error("Error loading admin data:", err);
      }
    };
    fetchData();
  }, []);

  // Group complaints by department
  const groupByDepartment = (data, key) => {
    return data.reduce((groups, item) => {
      const dept = item[key] || "Other";
      if (!groups[dept]) groups[dept] = [];
      groups[dept].push(item);
      return groups;
    }, {});
  };

  const complaintsByDept = groupByDepartment(complaints, "category");
  const employeesByDept = groupByDepartment(employees, "department");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-cyan-900 to-purple-400 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">Admin Portal</h1>
          <nav className="space-y-6">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="block text-left w-full hover:text-yellow-300"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/admin/employees")}
              className="block text-left w-full hover:text-yellow-300"
            >
              Employees
            </button>
            <button
              onClick={() => navigate("/admin/complaints")}
              className="block text-left w-full hover:text-yellow-300"
            >
              Complaints
            </button>
            <button className="block text-left w-full hover:text-yellow-300">
              Reports
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
      <main className="flex-1 bg-gradient-to-br from-blue-200 via-blue-100 to-green-100 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="font-semibold">Total Complaints</h2>
            <p className="text-xl">{complaints.length}</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="font-semibold">Pending Complaints</h2>
            <p className="text-xl">
              {complaints.filter((c) => c.status === "pending").length}
            </p>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="font-semibold">Resolved Complaints</h2>
            <p className="text-xl">
              {complaints.filter((c) => c.status === "resolved").length}
            </p>
          </div>
        </div>

        {/* Employees grouped by department */}
        <h2 className="text-2xl font-bold mb-4">Employees by Department</h2>
        {Object.keys(employeesByDept).map((dept) => (
          <div key={dept} className="mb-6">
            <h3 className="text-xl font-semibold mb-3">{dept}</h3>
            <ul className="bg-white shadow rounded divide-y">
              {employeesByDept[dept].map((emp) => (
                <li key={emp.id} className="p-3 flex justify-between">
                  <span>
                    {emp.name} ({emp.department})
                  </span>
                  <span
                    className={
                      emp.status === "free" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {emp.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Complaints grouped by department */}
        <h2 className="text-2xl font-bold mb-4">Complaints by Department</h2>
        {Object.keys(complaintsByDept).map((dept) => (
          <div key={dept} className="mb-6">
            <h3 className="text-xl font-semibold mb-3">{dept}</h3>
            <ul className="bg-white shadow rounded divide-y">
              {complaintsByDept[dept].map((c) => (
                <li
                  key={c.id}
                  className="p-3 flex justify-between hover:bg-gray-100"
                >
                  <div>
                    <p>
                      <strong>{c.category}</strong> - {c.description}
                    </p>
                    <p>
                      Status: {c.status} | Assigned to:{" "}
                      {c.assigned_to || "None"}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/complaints/${c.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AdminDashboard;





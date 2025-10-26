import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Electricity", route: "/report/ElectricityReport" },
    { name: "Water", route: "/report/water" },
    { name: "Road / Transport", route: "/report/TransportReport" },
    { name: "Municipal Cleanliness", route: "/report/cleanliness" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-cyan-900 to-purple-400 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">Citizen Portal</h1>
          <nav className="space-y-6">
            <button className="block text-left w-full hover:text-yellow-300">
              Dashboard
            </button>
            <button
              onClick={() => navigate("/track/1")} // test with ID=1
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
      <main className="flex-1 bg-gradient-to-br from-blue-200 via-blue-100 to-green-100 p-10">
        <h2 className="text-4xl font-extrabold mb-8">Dashboard</h2>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6 flex flex-col items-center justify-between"
            >
              <h3 className="text-2xl font-bold mb-4">{cat.name}</h3>
              <button
                onClick={() => navigate(cat.route)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Select →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;



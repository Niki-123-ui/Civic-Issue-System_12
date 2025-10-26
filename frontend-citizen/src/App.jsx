import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // ✅ Make sure file is named Dashboard.jsx
import ElectricityReport from "./pages/report/ElectricityReport";
import TransportReport from "./pages/report/TransportReport";
import WaterReport from "./pages/report/WaterReport";
import CleanlinessReport from "./pages/report/CleanlinessReport";
import TrackComplaint from "./pages/TrackComplaint";
import ReportSuccess from "./pages/ReportSuccess";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/AdminComplaints";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track/:id" element={<TrackComplaint />} />
        <Route path="/report/success" element={<ReportSuccess />} />
        <Route path="/report/ElectricityReport" element={<ElectricityReport />} />
        <Route path="/report/TransportReport" element={<TransportReport />} />
        <Route path="/report/water" element={<WaterReport />} />
        <Route path="/report/cleanliness" element={<CleanlinessReport />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaints/:id" element={<AdminComplaints />} />

        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;







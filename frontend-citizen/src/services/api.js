import axios from "axios";

export const API_URL = "http://127.0.0.1:8000"; // FastAPI backend

// Report a new issue
export const reportIssue = async (category, description, name, location, photo) => {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("description", description);
  formData.append("name", name);
  formData.append("location", location);

  if (photo) {
    formData.append("photo", photo);
  }

  try {
    const res = await axios.post(`${API_URL}/complaints/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data; // { id, status, assigned_to, photo }
  } catch (err) {
    console.error("Error reporting issue:", err);
    throw err;
  }
};

// Track complaint by ID
export const trackIssue = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/complaints/${id}`);
    return res.data; // complaint details
  } catch (err) {
    console.error("Error tracking complaint:", err);
    throw err;
  }
};
// Get all complaints (admin)
export const getAllComplaints = async () => {
  try {
    const res = await axios.get(`${API_URL}/admin/complaints`);
    return res.data;
  } catch (err) {
    console.error("Error fetching complaints:", err);
    throw err;
  }
};
export const getComplaintsByDepartment = async (department) => {
  const res = await axios.get(`${API_URL}/admin/complaints?department=${department}`);
  return res.data;
};

// Get all employees (admin)
export const getAllEmployees = async () => {
  try {
    const res = await axios.get(`${API_URL}/admin/employees`);
    return res.data;
  } catch (err) {
    console.error("Error fetching employees:", err);
    throw err;
  }
};

// Employee login
export const employeeLogin = async (employeeId) => {
  try {
    const res = await axios.post(`${API_URL}/employee/login`, { employee_id: employeeId }, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    return res.data; // {id, name, department}
  } catch (err) {
    console.error("Error logging in employee:", err);
    throw err;
  }
};

// Get employee complaints
export const getEmployeeComplaints = async (employeeId) => {
  try {
    const res = await axios.get(`${API_URL}/employee/${employeeId}/complaints`);
    return res.data;
  } catch (err) {
    console.error("Error fetching employee complaints:", err);
    throw err;
  }
};

// Resolve a complaint
export const resolveComplaint = async (complaintId, employeeId) => {
  try {
    const formData = new FormData();
    formData.append("employee_id", employeeId);

    const res = await axios.post(
      `${API_URL}/employee/complaints/${complaintId}/resolve`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
  } catch (err) {
    console.error("Error resolving complaint:", err);
    throw err;
  }
};




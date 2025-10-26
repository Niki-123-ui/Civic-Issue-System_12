import React, { useState, useEffect } from "react";  // ✅ added useEffect
import { reportIssue } from "../../services/api";
import { useNavigate } from "react-router-dom";


const ElectricityReport = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(""); // manual or auto
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState(null);

  const navigate = useNavigate();

  // ✅ Auto-fetch location
  useEffect(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
    setGeoLocation(coords);
    console.log("Coords:", coords);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
      );
      const data = await res.json();
      console.log("Reverse geocode result:", data); // ✅ check response
      if (data.display_name) {
        setLocation(data.display_name);
      } else {
        setLocation(coords);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setLocation(coords);
    }
  },
  (err) => {
    console.error("Error getting location:", err);
    setGeoLocation(null);
  }
);

  } else {
    console.warn("Geolocation not supported by this browser.");
  }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalLocation = location || geoLocation || "Not provided";

      // ✅ match backend args: category, description, name, location, photo
      const data = await reportIssue(
        "electricity",  // lowercase category to match DB/seed
        description,
        name,
        finalLocation,
        photo
      );

      navigate(`/report/success?id=${data.id}`);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit complaint. See console.");
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
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-yellow-300"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/track/1")}
              className="hover:text-yellow-300"
            >
              Track Progress
            </button>
            <button className="hover:text-yellow-300">Notice</button>
            <button className="hover:text-yellow-300">Profile</button>
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
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Report Electricity Issue
          </h2>

          {/* Name */}
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          {/* Location */}
          <label className="block mb-2 font-semibold">Location</label>
          <input
            type="text"
            placeholder="Fetching your location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)} // manual override allowed
            className="w-full border rounded-lg p-3 mb-2"
          />
          {geoLocation && (
            <p className="text-sm text-gray-600 mb-4">
              📍 Auto-detected: {geoLocation}
            </p>
          )}

          {/* Description */}
          <label className="block mb-2 font-semibold">Issue Description</label>
          <textarea
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          {/* Photo */}
          <label className="block mb-2 font-semibold">Upload an image</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mb-6"
            accept="image/*"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ElectricityReport;



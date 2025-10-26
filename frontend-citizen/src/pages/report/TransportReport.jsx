import React, { useState, useEffect } from "react";
import { reportIssue } from "../../services/api"; // backend API call
import { useNavigate } from "react-router-dom";

const TransportReport = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      const data = await reportIssue(
        "transport",   // keep lowercase, backend matches case-insensitive
        description,
        name,
        location,
        photo
      );

      // navigate to success page with complaint id
      navigate(`/report/success?id=${data.id}`);
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("Error submitting complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Report Transport Issue
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
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        {/* Description */}
        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          placeholder="Enter issue description"
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
    </div>
  );
};

export default TransportReport;

import React, { useState, useEffect } from "react";
import useFlightStore from "../store/flightStore";
import useAircraftStore from "../store/useAircraftStore";

const FlightForm = () => {
  const { addFlight, flights } = useFlightStore();
  const { aircrafts, fetchAircrafts } = useAircraftStore();


  useEffect(() => {
        fetchAircrafts();
    }, [fetchAircrafts]);


  const [formData, setFormData] = useState({
    aircraftId: "",
    destination: "",
    lat: "",
    lng: "",
  });

  const availableAircrafts = aircrafts.filter((ac) => {
    const StatusAvailable = ac.status === "available";
    const hasActiveFlight = flights.some(
      (f) => f.aircraftId === ac.id && !f.landingTime);
    return StatusAvailable && !hasActiveFlight;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFlight(formData);
      setFormData({
        aircraftId: "",
        destination: "",
        lat: "",
        lng: "",
      });
      alert("Flight Added Successfully");
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="form-card">
      <h3>Add New Flight</h3>
      <form onSubmit={handleSubmit} className="military-form">
        <div className="form-group">
          <label>Aircraft:</label>
          <select
            name="aircraftId"
            value={formData.aircraftId}
            onChange={handleChange}
            required
          >
            <option value="">Select Aircraft</option>
            {availableAircrafts.map((ac) => (
              <option key={ac.id} value={ac.id}>
                {ac.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            placeholder="Enter destination..."
            value={formData.destination || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row" style={{ display: "flex", gap: "10px" }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Lat:</label>
            <input
              type="number"
              step="any"
              name="lat"
              placeholder="Latitude"
              value={formData.lat}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Lng:</label>
            <input
              type="number"
              step="any"
              name="lng"
              placeholder="Longitude"
              value={formData.lng}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn-takeoff">
          Add Flight
        </button>
      </form>
    </div>
  );
};

export default FlightForm;

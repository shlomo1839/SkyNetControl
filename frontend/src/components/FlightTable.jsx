import React, { useEffect } from "react";
import useFlightStore from "../store/flightStore";

const FlightTable = () => {
  const { flights, fetchFlights, setLanding, loading } = useFlightStore();

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  if (loading) return <p>Updating flight board...</p>;

  return (
    <div className="card table-card">
      <h3>Operational Flight Board</h3>
      <table className="military-table">
        <thead>
          <tr>
            <th>Tail Number</th>
            <th>Destination</th>
            <th>Coordinates (Lat/Lng)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights && flights.length > 0 ? (
            flights.map((flight) => (
              <tr key={flight.id}>
                <td className="bold-text">{flight.aircraft?.name || ""}</td>

                <td>{flight.destination || "No Destination"}</td>

                <td>
                  {flight.destLat}, {flight.destLong}
                </td>

                <td>
                  <span
                    className={`status-badge ${flight.landingTime ? "landed" : "in-air"}`}
                  >
                    {flight.landingTime ? "Landed" : "In Air"}
                  </span>
                </td>

                <td>
                  {!flight.landingTime ? (
                    <button
                      className="btn-land"
                      onClick={() => setLanding(flight.id)}
                    >
                      Report Landing
                    </button>
                  ) : (
                    <span className="landed-label">Mission Complete</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No active flights found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;

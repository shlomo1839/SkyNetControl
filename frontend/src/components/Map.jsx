import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useFlightStore from "../store/flightStore";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { use } from "react";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapEvents = () => {
  const addFlight = useFlightStore((state) => state.addFlight);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const newFlight = ({
        callsign: `FLIGHT-${Math.floor(Math.random() * 1000)}`,
        latitude: lat,
        longitude: lng,
        status: "In Air",
      });
      console.log("adding flight at:", lat, lng)

      try {
        await addFlight(newFlight);
      } catch (error) {
        console.error("Error adding flight:", error);
      }
    },
  });
  return null;
};

const Map = () => {
  const flights = useFlightStore((state) => state.flights);
  const position = [31.7683, 35.2137];

  return (
    <MapContainer
      center={position}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />

      {flights.map((flight) => (
        <Marker key={flight.id} position={[flight.latitude, flight.longitude]}>
          <Popup>
            <strong>Aircraft: {flight.callsign}</strong><br />
            Status: {flight.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

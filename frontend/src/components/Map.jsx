import React, { useRef, useMemo } from "react";
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


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;


const DraggableMarker = ({ flight }) => {
  const updateFlight = useFlightStore((state) => state.updatedFlightLocation);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          // console.log(`Flight ${flight.callsign} moved to:`, lat, lng);
          
          try {
            await updateFlight(flight.id, lat, lng);
          } catch (error) {
            console.error("Failed to update position:", error);
          }
        }
      },
    }),
    [flight.id, updateFlight]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={[flight.latitude, flight.longitude]}
      ref={markerRef}
    >
      <Popup>
        <strong>Aircraft: {flight.callsign}</strong><br />
        Status: {flight.status}<br />
      </Popup>
    </Marker>
  );
};

const MapEvents = () => {
  const addFlight = useFlightStore((state) => state.addFlight);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const newFlight = {
        callsign: `FLIGHT-${Math.floor(Math.random() * 1000)}`,
        latitude: lat,
        longitude: lng,
        status: "In Air",
      };
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
        <DraggableMarker key={flight.id} flight={flight} />
      ))}
    </MapContainer>
  );
};

export default Map;
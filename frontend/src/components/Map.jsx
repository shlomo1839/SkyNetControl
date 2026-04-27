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

const Map = () => {
  const eventHandlers = useMemo(
    () => ({
      dragend(event) {
        console.log(event.target.getLatLng());
      },
    }),
    [],
  );
  const { flights } = useFlightStore();

  return (
    <MapContainer
      center={[31.0461, 34.8516]}
      zoom={8}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        draggable={true}
        position={[31.0461, 34.8516]}
        eventHandlers={eventHandlers}
      ></Marker>
    </MapContainer>
  );
};

export default Map;

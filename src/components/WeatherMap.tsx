import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

export const WeatherMap = ({ lat, lon }: { lat: number; lon: number }) => {
  const center: LatLngExpression = [lat, lon];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "300px", width: "100%" }}
      className="rounded-lg overflow-hidden"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={center}>
        <Popup>
          Lat: {lat.toFixed(2)} <br />
          Lon: {lon.toFixed(2)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
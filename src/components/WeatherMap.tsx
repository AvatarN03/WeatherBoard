import { renderToStaticMarkup } from "react-dom/server";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import { MapPin } from "lucide-react";

import "leaflet/dist/leaflet.css";

const customIcon = L.divIcon({
  html: renderToStaticMarkup(
    <MapPin className="w-8 h-8 text-purple-200" fill="purple" />
  ),
  className: "", 
  iconAnchor: [16, 32], 
});

export const WeatherMap = ({ lat, lon }: { lat: number; lon: number }) => {
  const center: LatLngExpression = [lat, lon];

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "300px", width: "100%" }}
      className="rounded-lg overflow-hidden"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center} icon={customIcon}>
        <Popup>
          Lat: {lat.toFixed(2)} <br />
          Lon: {lon.toFixed(2)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
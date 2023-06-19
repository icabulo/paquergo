import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PacasMarker } from "./CustomMarkers";
import { AmigosMarker } from "./CustomMarkers";
import "./user-map.css";

function UserMap() {
  const currentLocation = [4.679163148484691, -74.08483538520206];

  const initialLocation = [4.705112387457778, -74.08152175280428];

  return (
    <div className="fullmap">
      <MapContainer center={initialLocation} zoom={12} scrollWheelZoom={true}>
        {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={currentLocation}>
          <Popup>Mi ubicación</Popup>
        </Marker>
        <PacasMarker />
        <AmigosMarker />
      </MapContainer>
    </div>
  );
}
export default UserMap;

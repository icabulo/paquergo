import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MyPacaMarker from "./MyPacaMarker";
import "./my-paca-map.css";

function MyPacaMap() {
  const currentLocation = [4.664714323348144, -74.13093566894533];

  const initialLocation = [4.658554956408209, -74.0801239013672];

  return (
    <div className="my-paca-map">
      <MapContainer center={initialLocation} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={currentLocation}>
          <Popup>Mi ubicación</Popup>
        </Marker>
        <MyPacaMarker />
      </MapContainer>
    </div>
  );
}
export default MyPacaMap;

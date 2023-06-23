import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MyWasteMarker from "./MyWasteMarker";
import "./my-waste-map.css";

function MyWasteMap() {
  const currentLocation = [4.679163148484691, -74.08483538520206];

  const initialLocation = [4.705112387457778, -74.08152175280428];

  return (
    <div className="my-waste-map">
      <MapContainer center={initialLocation} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={currentLocation}>
          <Popup>Mi ubicación</Popup>
        </Marker>
        <MyWasteMarker />
      </MapContainer>
    </div>
  );
}
export default MyWasteMap;

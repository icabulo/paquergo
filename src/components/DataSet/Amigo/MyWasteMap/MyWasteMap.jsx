import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MyWasteMarker from "./MyWasteMarker";
import "./my-waste-map.css";
import { useSelector } from "react-redux";

function MyWasteMap() {
  const { myLocation } = useSelector((store) => store.user);

  const currentLocation = myLocation;

  const initialLocation = myLocation;

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

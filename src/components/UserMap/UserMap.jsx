// MUI
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/system";

//LEAFLET
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PacasMarker } from "./CustomMarkers";
import { AmigosMarker } from "./CustomMarkers";
import "./user-map.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllWastesAsync } from "../../Redux/features/generalMap/generalMapSlice";
import { Button } from "@mui/material";

function UserMap() {
  const { userType, myLocation } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState({
    paca: true,
    waste: true,
  });
  const currentLocation = myLocation;

  const initialLocation = myLocation;

  const toggleMarker = (event) => {
    setIsActive({
      ...isActive,
      [event.target.name]: event.target.checked,
    });
  };

  //set default values to show in the map when role is changed
  useEffect(() => {
    setIsActive({
      paca: userType === "amigo" ? true : false,
      waste: userType === "paquerx" ? true : false,
    });
  }, [userType]);

  // fetch map info from the DB
  const getMarkersInfo = () => {
    dispatch(getAllWastesAsync()); //get waste list
    //TODO: get pacas list
  };

  useEffect(() => {
    getMarkersInfo();
  }, []);

  return (
    <div className="map-container">
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Mostra en mapa</FormLabel>

        <FormGroup>
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isActive.paca}
                  onChange={toggleMarker}
                  name="paca"
                />
              }
              label="Pacas"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isActive.waste}
                  onChange={toggleMarker}
                  name="waste"
                />
              }
              label="Desechos"
            />
          </Box>
        </FormGroup>
      </FormControl>
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
          {isActive.paca && <PacasMarker />}
          {isActive.waste && <AmigosMarker />}
        </MapContainer>
      </div>
      <Button variant="outlined" size="small" onClick={() => getMarkersInfo()}>
        recargar Mapa
      </Button>
    </div>
  );
}
export default UserMap;

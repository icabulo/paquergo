/* eslint-disable react/prop-types */
// import UserMap from "../../components/UserMap/UserMap";

import {
  Box,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Typography,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import "./dev-test.css";

function DevTest() {
  const initialLocation = [4.674848840293984, -74.06874582246627];
  const [inputLocation, setInputLocation] = useState(initialLocation);

  const locInput = useRef();

  const handleClick = () => {
    const newLocation = locInput.current.value;
    console.log("handleClick", newLocation);
  };

  //format text string into array of floats
  const formatLocation = (text) => {
    const [latitud, longitud] = text.split(",");
    return [parseFloat(latitud), parseFloat(longitud)];
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const latlan = formatLocation(data.get("location")); //format text string into array of floats
    console.log({
      email: data.get("username"),
      password: data.get("adress"),
      location: latlan,
    });
    // dispatch(setIsLoading(false));
  };
  return (
    <>
      <Typography variant="h3">Crear aviso de Amigo</Typography>

      <div className="minimap">
        <MapContainer center={initialLocation} zoom={14} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={inputLocation ? inputLocation : initialLocation}
            draggable
            autoPan
            eventHandlers={{
              click: (e) => {
                const { lat, lng } = e.latlng;
                setInputLocation([lat, lng]);
                // console.log("marker clicked", e);
              },
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                setInputLocation([lat, lng]);
              },
            }}
          >
            <Popup>
              {`Mis coordenadas:`}
              <br />
              {`Lat: ${inputLocation[0].toFixed(
                3
              )}, Lng: ${inputLocation[1].toFixed(3)}`}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <Box
        component="form"
        // noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          type="text"
          required
          id="location"
          label="Punto de entrega"
          name="location"
          margin="normal"
          autoComplete="location"
          fullWidth
          autoFocus
          placeholder="coordenadas: [lat, lng], ejemplo: 4.674, -74.068"
          inputRef={locInput}
          value={inputLocation}
          // value={inputLocation ? inputLocation : undefined}
          // onChange={handleLocation}
        />

        <Button onClick={handleClick}>Mostrar en mapa</Button>
        <TextField
          type="text"
          required
          id="username"
          label="Nombre de usuario"
          name="username"
          margin="normal"
          autoComplete="username"
          fullWidth
          autoFocus
        />
        <TextField
          type="text"
          id="adress"
          required
          label="Dirección"
          name="adress"
          margin="normal"
          fullWidth
          autoComplete="adress"
        />

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Guardar cambios
        </Button>
      </Box>
    </>
  );
}
export default DevTest;

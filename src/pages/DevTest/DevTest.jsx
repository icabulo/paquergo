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
import { FormControl } from "@mui/base";

function DevTest() {
  const initialLocation = [4.674848840293984, -74.06874582246627];
  const [inputLocation, setInputLocation] = useState(initialLocation);
  const locInput = useRef();
  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  const handleClick = () => {
    const newLocation = locInput.current.value.split(",");
    console.log("handleClick", newLocation);
    setInputLocation(newLocation);
  };

  const handleLocation = (e) => {
    console.log("LOCATION", e.target.value);
    const newLocation = e.target.value.split(",");
    console.log("array", newLocation);
    setInputLocation(newLocation);
  };

  return (
    <>
      {/* <UserMap /> */}

      <Typography variant="h3">Crear aviso de Amigo</Typography>

      <MapContainer
        center={inputLocation ? inputLocation : initialLocation}
        zoom={14}
        scrollWheelZoom={true}
      >
        {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={inputLocation ? inputLocation : initialLocation}
          draggable
          eventHandlers={{
            click: () => {
              console.log("marker clicked");
            },
            moveend: (e) => {
              const latlng = latLng;
              console.log("marker end", e.latlng);
            },
          }}
        >
          <Popup>Mi ubicación</Popup>
        </Marker>
      </MapContainer>

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
          placeholder="coordenadas: [log, lat], ejemplo: 4.674, -74.068"
          inputRef={locInput}
          // value={inputLocation ? inputLocation : undefined}
          // onChange={handleLocation}
        />

        {/* <FormControl
          // sx={{ width: "100%" }}
          variant="outlined"
          margin="normal"
          // fullWidth
          // error={formManager.repassword.activeError}
        >
          <InputLabel htmlFor="ejemplo">ejemplo</InputLabel>
          <OutlinedInput
            id="ejemplo"
            required
            type="text"
            aria-describedby="repassword-helper-text"
            label="ejemplo"
            ref={locInput}
          />
          <FormHelperText id="repassword-helper-text">
            coordenada
          </FormHelperText>
        </FormControl> */}

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

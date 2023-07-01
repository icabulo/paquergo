import { Box, TextField, Button, Typography } from "@mui/material";
import UploadInput from "./UploadInput";
import { useSnackbar } from "notistack";

// Leaflet maps
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import "./edit-profile.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  setMyLocation,
  setMyUsername,
} from "../../Redux/features/user/userSlice";
import { updateRequestToApi } from "../../api/userAPI";

function EditProfile() {
  const { myLocation, myUsername, userId } = useSelector((store) => store.user);
  const initialLocation = myLocation;
  const [inputLocation, setInputLocation] = useState(initialLocation);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //format text string into array of floats
  const formatLocation = (text) => {
    const [latitud, longitud] = text.split(",");
    return [parseFloat(latitud), parseFloat(longitud)];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const latlan = formatLocation(data.get("address")); //format text string into array of floats
      const reqBody = {
        username: data.get("username"),
        mapLocation: latlan,
      };
      // dispatch(updateUserAsync(reqBody));
      const promiseResponse = await updateRequestToApi(reqBody, userId);
      if (promiseResponse) {
        dispatch(setMyLocation(reqBody.mapLocation));
        dispatch(setMyUsername(reqBody.username));

        enqueueSnackbar("Cambios guardados", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
        navigate("/dashboard");
      }
    } catch (error) {
      enqueueSnackbar(`Error - ${error.message ? error.message : error}`, {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <>
      <Typography variant="h4">Mis datos</Typography>
      <UploadInput />
      <Box
        component="form"
        // noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          type="text"
          required
          id="username"
          label="Nombre de usuario"
          name="username"
          margin="normal"
          autoComplete="username"
          fullWidth
          placeholder={myUsername ? myUsername : ""}
          autoFocus
        />
        <TextField
          type="text"
          required
          id="address"
          label="Ubicación del mapa"
          name="address"
          margin="normal"
          autoComplete="address"
          fullWidth
          placeholder="ubicacion del mapa"
          value={inputLocation}
        />

        <div className="minimap">
          <MapContainer
            center={initialLocation}
            zoom={13}
            scrollWheelZoom={true}
          >
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
                },
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  setInputLocation([lat, lng]);
                },
              }}
            >
              <Popup>
                {`Ubicacion Preferida:`}
                <br />
                {`Lat: ${inputLocation[0].toFixed(
                  3
                )}, Lng: ${inputLocation[1].toFixed(3)}`}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Guardar cambios
        </Button>
      </Box>
    </>
  );
}
export default EditProfile;

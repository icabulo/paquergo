// Material UI
import { Box, TextField, Button, Typography } from "@mui/material";
// time and time picker
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useSnackbar } from "notistack";

// Leaflet maps
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./post-paquerx.css";

// redux
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addToMyPacaPost } from "../../Redux/features/user/userSlice";
import { addPacaPost } from "../../Redux/features/generalMap/generalMapSlice";
import { useState } from "react";

function PostPaquerx() {
  const dispatch = useDispatch();
  const initialLocation = [4.664714323348144, -74.13093566894533];
  const [inputLocation, setInputLocation] = useState(initialLocation);
  const [dateInput, setDateInput] = useState(dayjs());
  //   const [detailsInput, setDetailsInput] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  //format text string into array of floats
  const formatLocation = (text) => {
    const [latitud, longitud] = text.split(",");
    return [parseFloat(latitud), parseFloat(longitud)];
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const latlan = formatLocation(data.get("location")); //format text string into array of floats

    // same as in mock data. BUT GOT TO BE FORMATED FOR BACKEND
    const newPost = {
      pacaId: nanoid(),
      location: latlan,
      info: {
        userName: "Mi usuario",
        userId: "testuser123",
        date: dateInput.toISOString(),
        pacaState: "nuevo", //nuevo, modificado, finalizado
      },
    };
    dispatch(addToMyPacaPost(newPost));
    dispatch(addPacaPost(newPost));

    //success message
    enqueueSnackbar("Aviso creado", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
  };
  return (
    <>
      <Typography variant="h4">Crear nuevo aviso:</Typography>
      <Typography variant="h5">Haré paca en:</Typography>

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
              {`La Paca estará acá:`}
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
          label="Evento Paca"
          name="location"
          margin="normal"
          autoComplete="location"
          fullWidth
          placeholder="coordenadas: [lat, lng], ejemplo: 4.674, -74.068"
          //   inputRef={locInput}
          value={inputLocation}
          disabled
        />

        <Box sx={{ width: "300px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Fecha del evento"
                value={dateInput}
                onChange={(newValue) => setDateInput(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        {/* <TextField
          type="text"
          required
          id="details"
          label="Descripción"
          name="details"
          margin="normal"
          autoComplete="details"
          fullWidth
          variant="outlined"
          multiline
          rows={2}
          value={detailsInput}
          onChange={(e) => setDetailsInput(e.target.value)}
        /> */}

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          crear Paca
        </Button>
      </Box>
    </>
  );
}
export default PostPaquerx;

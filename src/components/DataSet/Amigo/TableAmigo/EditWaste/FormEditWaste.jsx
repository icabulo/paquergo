// Material UI
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
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
// minimap css class is set globally by default. So it is not necesary to have a new css file with the explicit minimap nameclass

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateWasteAsync } from "../../../../../Redux/features/user/userSlice";
import { setEditWasteModal } from "../../../../../Redux/features/modalWaste/modalWasteSlice";

import { useState } from "react";

function FormEditWaste() {
  const { myWasteList, selectedAlertId } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // get the current wasta data to display in the form inputs
  const currentWaste = myWasteList.filter(
    (item) => item.wasteId === selectedAlertId //selectedAlertId is set when clicking the edit button in the table
  )[0];

  const initialLocation = currentWaste.location;
  const [inputLocation, setInputLocation] = useState(initialLocation);
  const [dateInput, setDateInput] = useState(dayjs(currentWaste.date));
  const [detailsInput, setDetailsInput] = useState(currentWaste.description);
  const [alertState, setAlertState] = useState(currentWaste.deliveryState);

  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (event) => {
    setAlertState(event.target.value);
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

    const reqBody = {
      wasteId: selectedAlertId, //this is needed to dinamically create the endpoint route. It can also be refactor using the thunkAPI option in the userSlice.js (createWasteAsync)
      location: latlan,
      date: dateInput.toISOString(),
      description: data.get("details"),
      deliveryState: alertState, //pendiente, asignado, entregado
    };
    dispatch(updateWasteAsync(reqBody));

    //success message
    enqueueSnackbar("Aviso actualizado", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
    // dispatch(setEditWasteModal(false)); //close the modal
  };
  const handleDelete = () => {
    console.log("borrando aviso ...");
  };

  return (
    <>
      <Typography variant="h6" component="h2">
        Actualizar aviso:
      </Typography>
      <Typography variant="caption">Mover el marcador del mapa:</Typography>

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

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          type="text"
          required
          id="location"
          label="Lugar de entrega"
          name="location"
          margin="normal"
          autoComplete="location"
          fullWidth
          placeholder="coordenadas: [lat, lng], ejemplo: 4.674, -74.068"
          value={inputLocation}
        />

        <Box sx={{ width: "300px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Fecha de entrega"
                value={dateInput}
                onChange={(newValue) => setDateInput(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <TextField
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
        />

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="alert-state">Estado de entrega</InputLabel>
            <Select
              labelId="alert-state"
              id="alert-state"
              value={alertState}
              label="Estado de entrega"
              onChange={handleAlert}
            >
              <MenuItem value={"pendiente"}>Pendiente</MenuItem>
              <MenuItem value={"asignado"}>Asignado</MenuItem>
              <MenuItem value={"entregado"}>Entregado</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          crear aviso
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          sx={{ mt: 3, mb: 2, ml: 3 }}
        >
          Eliminar aviso
        </Button>
      </Box>
    </>
  );
}
export default FormEditWaste;

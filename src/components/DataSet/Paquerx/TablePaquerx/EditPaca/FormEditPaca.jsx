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
import {
  deletePacaAsync,
  updatePacaAsync,
} from "../../../../../Redux/features/user/userSlice";
import { setEditPacaModal } from "../../../../../Redux/features/modalWaste/modalWasteSlice";

import { useState } from "react";

function FormEditWaste() {
  const { myPacaList, selectedAlertId } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // get the current waste data to display in the form inputs
  const currentPaca = myPacaList.filter(
    (item) => item.pacaId === selectedAlertId //selectedAlertId is set when clicking the edit button in the table
  )[0];

  const initialLocation = currentPaca.location;

  const [inputLocation, setInputLocation] = useState(initialLocation);
  const [dateInput, setDateInput] = useState(dayjs(currentPaca.date));
  const [alertState, setAlertState] = useState(currentPaca.pacaState);

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
      pacaId: selectedAlertId, //this is needed to dinamically create the endpoint route. It can also be refactor using the thunkAPI option in the userSlice.js (createWasteAsync)
      location: latlan,
      date: dateInput.toISOString(),
      pacaState: alertState, //nuevo, modificado, finalizado
    };
    dispatch(updatePacaAsync(reqBody));

    //success message
    enqueueSnackbar("Aviso actualizado", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
    dispatch(setEditPacaModal(false)); //close the modal
  };
  const handleDelete = () => {
    dispatch(deletePacaAsync(selectedAlertId)); // selectedAlertId is not necessary if the wasteID is selected whit thunkAPI, but it needs code refactoring
    //success message
    enqueueSnackbar("Aviso borrado", {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
    dispatch(setEditPacaModal(false)); // needs to close the modal, otherwise currentPaca will be undefined
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

        <Box sx={{ minWidth: 120, mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="alert-state">Estado de la Paca</InputLabel>
            <Select
              labelId="alert-state"
              id="alert-state"
              value={alertState}
              label="Estado de entrega"
              onChange={handleAlert}
            >
              <MenuItem value={"nuevo"}>Nuevo</MenuItem>
              <MenuItem value={"modificado"}>Modificado</MenuItem>
              <MenuItem value={"finalizado"}>Finalizado</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Actualizar
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

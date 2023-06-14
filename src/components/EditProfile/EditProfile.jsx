import {
  Box,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import UploadInput from "./UploadInput";

function EditProfile() {
  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  return (
    <>
      <Typography variant="h3">Mis datos</Typography>
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
export default EditProfile;

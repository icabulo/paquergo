import {
  Box,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
} from "@mui/material";
import UploadInput from "./UploadInput";

function EditProfile() {
  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  return (
    <>
      <div>Formulario para editar perfil</div>
      <UploadInput />
      <Box
        component="form"
        // noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          type="email"
          required
          id="email"
          label="Correo / Email"
          name="email"
          margin="normal"
          autoComplete="email"
          fullWidth
          autoFocus
        />
        <TextField
          type="password"
          id="password"
          required
          label="Contraseña"
          name="password"
          margin="normal"
          fullWidth
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Recordar mis datos"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Guardar cambios
        </Button>
      </Box>
    </>
  );
}
export default EditProfile;

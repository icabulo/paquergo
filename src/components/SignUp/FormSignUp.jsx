/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Modal,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import FertilizeImg from "../../assets/fertilize.png";
import { useState } from "react";
import { registerRequest } from "../../api/authAPI";

function FormSignUp({ handleClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const initialState = {
    email: {
      activeError: false,
      errorMessage: "",
      inputValue: "",
    },
    password: {
      activeError: false,
      errorMessage: "",
      inputValue: "",
    },
    repassword: {
      activeError: false,
      errorMessage: "",
      inputValue: "",
    },
  };
  const [formManager, setFormManager] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const emailValidation = (email) => {
    // regex email validation
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const passwordValidation = (pass) => {
    // reges password validation
    // 1 number
    // 1 lowercase letter
    // 1 uppercase letter
    // no space character
    // length greater than 6
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}/;
    return regex.test(pass);
  };

  const repasswordValidation = (pass, repass) => {
    return pass === repass;
  };

  const handleSubmit = async (event) => {
    // console.log("submit data", formManager);
    event.preventDefault();

    // console.log(
    //   "email Validation",
    //   emailValidation(formManager.email.inputValue)
    // );
    if (!emailValidation(formManager.email.inputValue)) {
      setFormManager((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          activeError: true,
          errorMessage: "El email no es valido",
        },
      }));

      return;
    } else if (emailValidation(formManager.email.inputValue)) {
      setFormManager((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          activeError: false,
          errorMessage: "",
        },
      }));
    }
    // console.log(
    //   "password Validation",
    //   passwordValidation(formManager.password.inputValue)
    // );
    if (!passwordValidation(formManager.password.inputValue)) {
      setFormManager((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          activeError: true,
          errorMessage: "Clave insegura",
        },
      }));

      return;
    } else if (passwordValidation(formManager.password.inputValue)) {
      setFormManager((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          activeError: false,
          errorMessage: "",
        },
      }));
    }
    if (
      !repasswordValidation(
        formManager.password.inputValue,
        formManager.repassword.inputValue
      )
    ) {
      setFormManager((prev) => ({
        ...prev,
        repassword: {
          ...prev.repassword,
          activeError: true,
          errorMessage: "No coinciden ambas claves",
        },
      }));

      return;
    } else if (
      repasswordValidation(
        formManager.password.inputValue,
        formManager.repassword.inputValue
      )
    ) {
      setFormManager((prev) => ({
        ...prev,
        repassword: {
          ...prev.repassword,
          activeError: false,
          errorMessage: "",
        },
      }));
    }
    //reset formManager Errors

    // setFormManager((prev) => {
    //   const newState = { ...prev };
    //   for (const key in prev) {
    //     // console.log(key);
    //     newState[key] = {
    //       ...newState[key],
    //       activeError: false,
    //       errorMessage: "",
    //     };
    //   }

    //   return newState;
    // });

    const data = {
      userName: formManager.email.inputValue.split("@")[0],
      email: formManager.email.inputValue,
      password: formManager.password.inputValue,
      // repassword: formManager.repassword.inputValue,
    };

    // console.log("Data to be sent to server", data);

    try {
      const res = await registerRequest(data);
      // console.log("backend response", res);
      if (res.id) {
        enqueueSnackbar("Usuario creado", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          preventDuplicate: true,
        });
        handleClose();
        //if fetch was successfull send message and clear formMaganer state

        setFormManager((prev) => {
          const newState = { ...prev };
          for (const key in prev) {
            // console.log(key);
            newState[key] = {
              ...newState[key],
              inputValue: "",
            };
          }

          return newState;
        });
      } else {
        enqueueSnackbar(`${res.message}`, {
          variant: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          preventDuplicate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      item
      // xs={12}
      // sm={8}
      // md={5}
      component={Paper}
      elevation={1}
      square
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="compost login icon"
          src={FertilizeImg}
          sx={{ width: 70, height: 70 }}
        />
        <Typography component="h1" variant="h5">
          PaquerGo
        </Typography>
        <Typography component="p" variant="body1">
          Nuevo Usuario
        </Typography>
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
            error={formManager.email.activeError}
            helperText={formManager.email.errorMessage}
            onChange={(e) =>
              setFormManager((prev) => ({
                ...prev,
                email: { ...prev.email, inputValue: e.target.value },
              }))
            }
            value={formManager.email.inputValue}
          />
          {/* <TextField
            type="password"
            id="password"
            required
            label="Contraseña"
            name="password"
            margin="normal"
            fullWidth
            autoComplete="current-password"
            error={formManager.password.activeError}
            helperText={formManager.password.errorMessage}
            onChange={(e) =>
              setFormManager((prev) => ({
                ...prev,
                password: { ...prev.password, inputValue: e.target.value },
              }))
            }
            value={formManager.password.inputValue}
          /> */}

          <FormControl
            // sx={{ width: "100%" }}
            variant="outlined"
            margin="normal"
            fullWidth
            error={formManager.password.activeError}
          >
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <OutlinedInput
              id="password"
              required
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                setFormManager((prev) => ({
                  ...prev,
                  password: { ...prev.password, inputValue: e.target.value },
                }))
              }
              value={formManager.password.inputValue}
              aria-describedby="password-helper-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {formManager.password.activeError && (
              <FormHelperText id="password-helper-text">
                {formManager.password.errorMessage}
              </FormHelperText>
            )}
          </FormControl>

          {/* <TextField
            type="password"
            id="repassword"
            required
            label="Confirmar Contraseña"
            name="repassword"
            margin="normal"
            fullWidth
            error={formManager.repassword.activeError}
            helperText={formManager.repassword.errorMessage}
            onChange={(e) =>
              setFormManager((prev) => ({
                ...prev,
                repassword: { ...prev.repassword, inputValue: e.target.value },
              }))
            }
            value={formManager.repassword.inputValue}
          /> */}

          <FormControl
            // sx={{ width: "100%" }}
            variant="outlined"
            margin="normal"
            fullWidth
            error={formManager.repassword.activeError}
          >
            <InputLabel htmlFor="repassword">Confirmar Contraseña</InputLabel>
            <OutlinedInput
              id="repassword"
              required
              type={showRePassword ? "text" : "password"}
              onChange={(e) =>
                setFormManager((prev) => ({
                  ...prev,
                  repassword: {
                    ...prev.repassword,
                    inputValue: e.target.value,
                  },
                }))
              }
              value={formManager.repassword.inputValue}
              aria-describedby="repassword-helper-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle repassword visibility"
                    onClick={handleClickShowRePassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Repassword"
            />
            {formManager.repassword.activeError && (
              <FormHelperText id="repassword-helper-text">
                {formManager.repassword.errorMessage}
              </FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Usuario
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
export default FormSignUp;

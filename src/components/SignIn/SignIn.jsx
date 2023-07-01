// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SignUp } from "../SignUp";
import FooterSI from "./FooterSI"; //sign in footer imported as a separate component
import FertilizeImg from "../../assets/fertilize.png";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserAsync } from "../../Redux/features/user/userSlice.js";
import { loginRequest } from "../../api/authAPI";
import { useSnackbar } from "notistack";

export default function SignInSide() {
  const [activeModal, setActiveModal] = useState(false);
  const { isAuthenticated } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setActiveModal(true);
  };

  const handleClose = () => {
    setActiveModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const res = await loginRequest(loginData);
      if (res.message === "user Logged in - token created") {
        dispatch(getUserAsync(loginData.email)); //getuser will set auth and loading states when extra reducer is fulfilled
      } else {
        enqueueSnackbar(`${res.message}`, {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
      }
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* left image */}
      {/* isAuthenticated is set withing the getUserAsync function */}
      {isAuthenticated && <Navigate to="/dashboard" replace={true} />}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <Box
          xs={false}
          sx={{
            my: 18,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h5" color={"white"}>
            ParquerGo
          </Typography>
        </Box> */}
      </Grid>
      {/* main form */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            Conectando Amigos y Paquerxs
          </Typography>
          {/* LOGIN FORM */}
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
              Ingresar
            </Button>
          </Box>
          {/* BOTTOM SECTION */}
          <Grid container>
            <Grid item textAlign={"center"} width={"100%"}>
              <Typography variant="body2">
                ¿No tienes cuenta?{" "}
                <span>
                  <Link component="button" variant="body2" onClick={handleOpen}>
                    Crea tu usuario
                  </Link>
                </span>
              </Typography>
            </Grid>
            {activeModal && (
              <SignUp open={activeModal} handleClose={handleClose}></SignUp>
            )}
          </Grid>
          <FooterSI sx={{ mt: 3, fontSize: "10px" }} />
        </Box>
      </Grid>
    </Grid>
  );
}

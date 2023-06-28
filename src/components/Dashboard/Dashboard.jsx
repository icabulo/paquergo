import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../Redux/features/user/userSlice.js";
import { useNavigate, Outlet, Link as RouterLink } from "react-router-dom";

//MATERIAL UI
import {
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { AppBar, Drawer } from "./customStyle.js";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme, paquerTheme } from "../../themes/userThemes";

//ICONS
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Copyright from "./FooterDB";
import MainList from "./MainList.jsx";
import SecondaryList from "./SecondaryList.jsx";
import BadgeMenu from "../BadgeMenu/BadgeMenu.jsx";

export default function Dashboard() {
  const { userType } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(setIsAuthenticated(false));
    navigate("/");
  };

  return (
    <ThemeProvider theme={userType === "paquerx" ? paquerTheme : defaultTheme}>
      {/* toda la pantalla */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* barra superior de color */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {userType === "paquerx" ? "Paquerx" : "Amigo Abastecedor"}
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <BadgeMenu />
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesion
            </Button>
          </Toolbar>
        </AppBar>
        {/* menu desplegrable izquierda */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/* {mainListItems} */}
            <MainList />
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
            <SecondaryList />
          </List>
        </Drawer>
        {/* pantalla principal main */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            // border: "1px solid red",
          }}
        >
          {/* this toolbar makes the display area to be located below the colored dashboard title */}
          <Toolbar />
          {/* contenido desplegado en ventana main + copyright footer*/}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

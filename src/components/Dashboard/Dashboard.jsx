import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserWasteAsync,
  setIsAuthenticated,
} from "../../Redux/features/user/userSlice.js";
import { useNavigate, Outlet } from "react-router-dom";

//MATERIAL UI
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  List,
  Toolbar,
} from "@mui/material";
import { AppBar, Drawer } from "./customStyle.js";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme, paquerTheme } from "../../themes/userThemes";

//ICONS
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";

import MainList from "./MainList.jsx";
import SecondaryList from "./SecondaryList.jsx";
import BadgeMenu from "../BadgeMenu/BadgeMenu.jsx";
import SelectRole from "../SelectRole/SelectRole.jsx";
import FooterSI from "../SignIn/Footer.jsx";
import UserTitle from "./UserTitle.jsx";
import { logoutRequest } from "../../api/authAPI.js";

export default function Dashboard() {
  const { userType } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    dispatch(setIsAuthenticated(false));
    await logoutRequest();
    navigate("/");
  };

  // fetch wastes and pacas
  React.useEffect(() => {
    dispatch(getUserWasteAsync());
  }, []);

  return (
    <ThemeProvider theme={userType === "paquerx" ? paquerTheme : defaultTheme}>
      {userType === "not selected" && <SelectRole />}

      {/* complete screen */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* top bar - colored bar */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closes
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

            <UserTitle />
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
        {/* sidebar menu - drawer */}
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
        {/* Main window display area */}
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
          {/* main router-outlet window + copyright footer*/}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            <FooterSI />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

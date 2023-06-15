import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChatIcon from "@mui/icons-material/Chat";

import { Link as RouterLink } from "react-router-dom";

function SecondaryList() {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Coordinemos
      </ListSubheader>
      <ListItemButton component={RouterLink} to="chat">
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="map">
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Mapa" />
      </ListItemButton>
    </React.Fragment>
  );
}
export default SecondaryList;

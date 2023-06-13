import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
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
    </React.Fragment>
  );
}
export default SecondaryList;

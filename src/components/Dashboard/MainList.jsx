import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LayersIcon from "@mui/icons-material/Layers";
import RecyclingIcon from "@mui/icons-material/Recycling";

import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Amigo() {
  return (
    <React.Fragment>
      <ListItemButton component={RouterLink} to="main">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Pacas Cerca" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="heed">
        <ListItemIcon>
          <RecyclingIcon />
        </ListItemIcon>
        <ListItemText primary="Mis Avisos" />
      </ListItemButton>
    </React.Fragment>
  );
}

function Paquer() {
  return (
    <React.Fragment>
      <ListItemButton component={RouterLink} to="main">
        <ListItemIcon>
          <RecyclingIcon />
        </ListItemIcon>
        <ListItemText primary="Desechos" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="heed">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Mis Pacas" />
      </ListItemButton>
    </React.Fragment>
  );
}

function MainList() {
  const { userType } = useSelector((store) => store.user);

  const condition = userType === "paquerx" ? true : false;
  return (
    <>
      <ListSubheader component="div" inset>
        Mi Comunidad
      </ListSubheader>
      {condition && <Paquer />}
      {!condition && <Amigo />}
    </>
  );
}
export default MainList;

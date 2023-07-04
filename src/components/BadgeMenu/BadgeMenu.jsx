import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LayersIcon from "@mui/icons-material/Layers";
import RecyclingIcon from "@mui/icons-material/Recycling";

import { useSelector, useDispatch } from "react-redux";
import {
  setUserType,
  setIsAuthenticated,
} from "../../Redux/features/user/userSlice.js";
import { updateUserAsync } from "../../Redux/features/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../api/authAPI.js";

export default function BadgeMenu() {
  const { userImageUrl } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    dispatch(setIsAuthenticated(false));
    await logoutRequest();
  };

  const handleRole = (role = "not selected") => {
    const reqBody = {
      currentRole: role,
    };
    dispatch(setUserType(role)); // this will take effect immediately
    dispatch(updateUserAsync(reqBody)); // as update is an async operation, user type will be changed after backend reply
  };

  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar src={userImageUrl} sx={{ width: 32, height: 32 }}>
            M
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={() => navigate("/dashboard/profile")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Editar mi perfil
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Salir
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleRole("paquerx")}>
          <ListItemIcon>
            <LayersIcon fontSize="small" />
          </ListItemIcon>
          Paquerx
        </MenuItem>
        <MenuItem onClick={() => handleRole("amigo")}>
          <ListItemIcon>
            <RecyclingIcon fontSize="small" />
          </ListItemIcon>
          Amigo
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

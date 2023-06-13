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

import avatarImage from "../../assets/compost2.png";
import { useDispatch } from "react-redux";
import { setUserType } from "../../Redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function BadgeMenu() {
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
          <Avatar src={avatarImage} sx={{ width: 32, height: 32 }}>
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
        <MenuItem onClick={() => navigate("/")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Salir
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(setUserType("paquerx"))}>
          <ListItemIcon>
            <LayersIcon fontSize="small" />
          </ListItemIcon>
          Paquerx
        </MenuItem>
        <MenuItem onClick={() => dispatch(setUserType("amigo"))}>
          <ListItemIcon>
            <RecyclingIcon fontSize="small" />
          </ListItemIcon>
          Amigo
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

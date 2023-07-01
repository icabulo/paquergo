/* eslint-disable no-unused-vars */
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserType } from "../../Redux/features/user/userSlice";
import { updateUserAsync } from "../../Redux/features/user/userSlice";
import PaquerxCard from "./PaquerxCard";
import AmigoCard from "./AmigoCard";

function SelectRole() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "secondary",
    boxShadow: 24,
    p: 2,
  };

  const myCloseModal = () => {
    setOpen(false);
  };
  const handleClose = (event, reason) => {
    const condition = reason == "backdropClick" || reason == "escapeKeyDown";
    if (reason && condition) return; //cancel close outside modal area or escape key
    myCloseModal();
  };

  const handleRole = (role = "not selected") => {
    const reqBody = {
      currentRole: role,
    };
    dispatch(setUserType(role)); // this will take effect immediately
    dispatch(updateUserAsync(reqBody)); // as update is an async operation, user type will be changed after backend reply

    myCloseModal();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
        >
          Hoy Quiero Ser:
        </Typography>
        <Box
          id="modal-modal-description"
          sx={{ display: "flex", gap: "20px", marginTop: "10px" }}
        >
          <PaquerxCard handleRole={handleRole} />
          <AmigoCard handleRole={handleRole} />
        </Box>
      </Box>
    </Modal>
  );
}

export default SelectRole;

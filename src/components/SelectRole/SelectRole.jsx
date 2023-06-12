/* eslint-disable no-unused-vars */
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserType } from "../../Redux/features/user/userSlice";

//TODO: formulario de nombre personalizado y imagen de perfil
function SelectRole() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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

  const handleAmigo = () => {
    //call async update usertype in database
    dispatch(setUserType("amigo"));
    myCloseModal();
  };

  const HandlePaquerx = () => {
    // TODO: call async update usertype in database
    dispatch(setUserType("paquerx"));
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Selecciona tu rol
        </Typography>
        <Box id="modal-modal-description">
          <Button onClick={handleAmigo}>Amigo</Button>
          <Button onClick={HandlePaquerx}>Paquerx</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SelectRole;

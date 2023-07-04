/* eslint-disable no-unused-vars */
import { Box, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEditWasteModal } from "../../../../../Redux/features/modalWaste/modalWasteSlice";
import FormEditWaste from "./FormEditWaste";

function EditWaste() {
  const { modalEditWasteOpen } = useSelector((store) => store.modalWaste);

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
    overflowY: "scroll",
    maxHeight: "90vh",
  };

  const handleClose = () => {
    dispatch(setEditWasteModal(false));
  };

  return (
    <>
      <Modal
        open={modalEditWasteOpen} //modal open state is handle fro the edit button in the table
        onClose={handleClose}
        aria-labelledby="modal-edit-waste"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose}>Cerrar</Button>
          <FormEditWaste />
        </Box>
      </Modal>
    </>
  );
}

export default EditWaste;

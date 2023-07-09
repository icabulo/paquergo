/* eslint-disable no-unused-vars */
import { Box, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEditPacaModal } from "../../../../../Redux/features/modalWaste/modalWasteSlice";
import FormEditPaca from "./FormEditPaca";

function EditPaca() {
  const { modalEditPacaOpen } = useSelector((store) => store.modalWaste);

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
    dispatch(setEditPacaModal(false));
  };

  return (
    <>
      <Modal
        open={modalEditPacaOpen} //modal open state is handle fro the edit button in the table
        onClose={handleClose}
        aria-labelledby="modal-edit-waste"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose}>Cerrar</Button>
          <FormEditPaca />
        </Box>
      </Modal>
    </>
  );
}

export default EditPaca;

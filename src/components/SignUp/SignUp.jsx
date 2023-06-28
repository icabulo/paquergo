/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FormSignUp from "./FormSignUp";
import { PropTypes } from "prop-types";

function SignUp({ open = false, handleClose }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "secondary",
    boxShadow: 24,
    p: 2,
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
          Crea Tu Usuario
        </Typography>
        <Box
          id="modal-modal-description"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignitems: "center",
          }}
        >
          <FormSignUp handleClose={handleClose}></FormSignUp>
        </Box>
      </Box>
    </Modal>
  );
}

SignUp.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};

export default SignUp;

/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SignUp } from "../../components/SignUp";
import { useState } from "react";

function DevTest() {
  const [activeModal, setActiveModal] = useState(false);

  const handleOpen = () => {
    console.log("Modal Opened");
    setActiveModal(true);
  };

  const handleClose = () => {
    console.log("Modal closed");
    setActiveModal(false);
  };

  /*  const handleClick = () => {
    console.log("Toggle click");
    setActiveModal((prev) => !prev);
  }; */

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Button onClick={handleClose}>Close Modal</Button>

      {activeModal && (
        <SignUp open={activeModal} handleClose={handleClose}></SignUp>
      )}
    </div>
  );
}
export default DevTest;

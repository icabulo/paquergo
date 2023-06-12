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
import { SelectRole } from "../../components/SelectRole";
import { Routes, Route, NavLink } from "react-router-dom";
import { Dashboard } from "../../components/Dashboard";

function DevTest() {
  return (
    <div>
      <h2>DEV TEST</h2>
      <button>prueba</button>
      {/*  <button>
        <NavLink to="first">1</NavLink>
      </button>
      <button>
        <NavLink to="second">2</NavLink>
      </button> */}
      <Routes>
        <Route path="inicial" element={<p>Inicial</p>} />
      </Routes>
    </div>
  );
}
export default DevTest;

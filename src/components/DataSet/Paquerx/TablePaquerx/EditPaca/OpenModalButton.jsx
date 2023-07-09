import { useDispatch } from "react-redux";
import { setEditPacaModal } from "../../../../../Redux/features/modalWaste/modalWasteSlice";
import { Button } from "@mui/material";
import { PropTypes } from "prop-types";
import { setSelectedAlertId } from "../../../../../Redux/features/user/userSlice";

function OpenModalButton({ id }) {
  const dispatch = useDispatch();
  const handleclick = () => {
    dispatch(setEditPacaModal(true));
    dispatch(setSelectedAlertId(id));
  };
  return <Button onClick={handleclick}>Editar</Button>;
}

OpenModalButton.propTypes = {
  id: PropTypes.string,
};
export default OpenModalButton;

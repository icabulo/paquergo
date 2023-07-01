import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

function UserTitle() {
  const { userType, myUsername } = useSelector((store) => store.user);

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}>
      <Typography
        component="h2"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {userType === "paquerx" ? `Paquerx` : "Amigo Abastecedor"}
      </Typography>
      <Typography
        component="h3"
        variant="overline"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {myUsername ? myUsername : ""}
      </Typography>
    </Box>
  );
}
export default UserTitle;

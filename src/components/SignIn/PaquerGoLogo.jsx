import { Avatar, Box, Typography } from "@mui/material";
import FertilizeImg from "../../assets/fertilize.png";

function PaquerGoLogo() {
  return (
    <Box
      sx={{
        // margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        alt="compost login icon"
        src={FertilizeImg}
        sx={{ width: 70, height: 70 }}
      />
      <Typography component="h1" variant="h5">
        PaquerGo
      </Typography>
      <Typography component="p" variant="body1">
        Conectando Amigos y Paquerxs
      </Typography>
    </Box>
  );
}
export default PaquerGoLogo;

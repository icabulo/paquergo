import { Link, Typography, Box } from "@mui/material";

function FooterSI(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="#">
          PaquerGo
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Compost icons created by "}
        <Link
          color="inherit"
          href="https://www.flaticon.com/free-icons/compost"
          title="compost icons"
        >
          Freepik - Flaticon
        </Link>
      </Typography>
    </Box>
  );
}
export default FooterSI;

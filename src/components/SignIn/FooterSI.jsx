import { Link, Typography } from "@mui/material";

function FooterSI(props) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body2"
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
    </>
  );
}
export default FooterSI;

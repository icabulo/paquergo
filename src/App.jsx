import "./App.css";
import { CssBaseline } from "@mui/material"; //resets all css
import { SnackbarProvider } from "notistack"; //allow for popup messages like success confirmation
import { CustomRouter } from "./router/RouteManager";
/* snackbar> hook useSnackBar() 
destructuring> const {enqueueSnackbar} = SnackbarProvider()
const handleClick = () => {
  enqueueSnackbar("texto a mostrar", {
    variant: "success",
    anchorOrigin:{
      vertical: "top",
      horizontal: "right"
    }
  });
};
*/

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <CssBaseline>
          <CustomRouter />
        </CssBaseline>
      </SnackbarProvider>
    </>
  );
}

export default App;

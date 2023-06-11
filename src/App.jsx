import "./App.css";
import { CssBaseline } from "@mui/material"; //resets all css
import { SnackbarProvider } from "notistack"; //allow for popup messages like success confirmation
import { CustomRouter } from "./router/RouteManager";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
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
          <Provider store={store}>
            <CustomRouter />
          </Provider>
        </CssBaseline>
      </SnackbarProvider>
    </>
  );
}

export default App;

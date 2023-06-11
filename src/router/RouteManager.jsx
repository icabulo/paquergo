import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, UserDashboard } from "../pages";
import { DevTest } from "../pages/DevTest";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Hubo un error!!</div>,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/devtest",
    element: <DevTest />,
  },
]);

const CustomRouter = () => (
  <RouterProvider router={routerConfig}></RouterProvider>
);

export { CustomRouter };

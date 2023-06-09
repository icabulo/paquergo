import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, UserDashboard } from "../pages";

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
]);

const CustomRouter = () => (
  <RouterProvider router={routerConfig}></RouterProvider>
);

export { CustomRouter };

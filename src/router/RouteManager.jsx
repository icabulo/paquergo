import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, UserDashboard } from "../pages";
import { DevTest } from "../pages/DevTest";

/* const routerConfig = createBrowserRouter([
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
]); */

const CustomRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dashboard" element={<UserDashboard />}></Route>
      <Route path="/devtest/*" element={<DevTest />}></Route>
      <Route path="*" element={<div>404 not found</div>}></Route>
    </Routes>
  </BrowserRouter>
);

export { CustomRouter };
/* import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

export { CustomRouter }; */

import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

function ProtectedRoutes() {
  const { isAuthenticated } = useSelector((store) => store.user);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
export default ProtectedRoutes;

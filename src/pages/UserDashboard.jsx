import { useSelector } from "react-redux";
import { SelectRole } from "../components/SelectRole";
import { Outlet } from "react-router-dom";

function UserDashboard() {
  const { userType } = useSelector((store) => store.user);

  return (
    <>
      {userType === "not selected" && <SelectRole />}
      {/* Dashboad will be reandered as a route component in this outlet */}
      <Outlet />
    </>
  );
}
export default UserDashboard;

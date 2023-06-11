import { useSelector } from "react-redux";
import { Dashboard } from "../components/Dashboard";
import { SelectRole } from "../components/SelectRole";
// import { SignIn } from "../components/SignIn";

function UserDashboard() {
  const { userType } = useSelector((store) => store.user);

  return (
    <>
      {userType === "not selected" && <SelectRole />}
      <Dashboard />
    </>
  );
}
export default UserDashboard;

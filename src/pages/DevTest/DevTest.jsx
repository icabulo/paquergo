// import { PaquerxSet } from "../../components/DataSet/Paquerx";
import { userRequestToApi } from "../../Redux/features/user/userAPI";
import { SignIn } from "../../components/SignIn";

function DevTest() {
  return (
    <>
      <button onClick={() => userRequestToApi("test3@test.com")}>fetch</button>
      <SignIn />
    </>
  );
}
export default DevTest;

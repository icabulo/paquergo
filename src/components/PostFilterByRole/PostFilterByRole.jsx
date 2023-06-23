import { useSelector } from "react-redux";
// import { PostAmigo } from "../PostAmigo";
// import { PostPaquerx } from "../PostPaquerx";
import { AmigoSet } from "../DataSet/Amigo";
import { PaquerxSet } from "../DataSet/Paquerx";

function PostFilterByRole() {
  const { userType } = useSelector((store) => store.user);

  return <>{userType === "amigo" ? <AmigoSet /> : <PaquerxSet />}</>;
}
export default PostFilterByRole;

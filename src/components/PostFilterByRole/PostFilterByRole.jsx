import { useSelector } from "react-redux";
import { PostAmigo } from "../PostAmigo";
import { PostPaquerx } from "../PostPaquerx";

function PostFilterByRole() {
  const { userType } = useSelector((store) => store.user);

  return <>{userType === "amigo" ? <PostAmigo /> : <PostPaquerx />}</>;
}
export default PostFilterByRole;

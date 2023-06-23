import { useSelector } from "react-redux";
// import { PostAmigo } from "../PostAmigo";
// import { PostPaquerx } from "../PostPaquerx";
import { AmigoSet } from "../DataSet/Amigo";
import { PaquerxSet } from "../DataSet/Paquerx";
import { Typography } from "@mui/material";

function PostFilterByRole() {
  const { userType } = useSelector((store) => store.user);

  return (
    <>
      <Typography variant="h4">Mis avisos:</Typography>
      {userType === "amigo" ? <AmigoSet /> : <PaquerxSet />}
    </>
  );
}
export default PostFilterByRole;

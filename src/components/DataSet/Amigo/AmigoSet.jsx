import { TableAmigo } from "./TableAmigo";
import { MyWasteMap } from "./MyWasteMap";
import { PostAmigo } from "./PostAmigo";

import { useDispatch } from "react-redux";
import { getUserWasteAsync } from "../../../Redux/features/user/userSlice";
import { useEffect } from "react";

function AmigoSet() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWasteAsync());
  }, []);

  return (
    <>
      <MyWasteMap />
      <TableAmigo />
      <PostAmigo />
    </>
  );
}
export default AmigoSet;

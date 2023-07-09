import { PostPaquerx } from "./PostPaquerx";
import { MyPacaMap } from "./MyPacaMap";
import { TablePaquerx } from "./TablePaquerx";

import { useDispatch } from "react-redux";
import { getUserPacaAsync } from "../../../Redux/features/user/userSlice";
import { useEffect } from "react";

function PaquerxSet() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPacaAsync());
  }, []);
  return (
    <>
      <MyPacaMap />
      <TablePaquerx />
      <PostPaquerx />
    </>
  );
}
export default PaquerxSet;

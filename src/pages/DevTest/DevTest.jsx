import { useDispatch } from "react-redux";
import { getAllWastesAsync } from "../../Redux/features/generalMap/generalMapSlice";

function DevTest() {
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    console.log("clicked");
    dispatch(getAllWastesAsync());
  };
  return (
    <>
      <button onClick={handleSubmit}>fetch</button>
    </>
  );
}
export default DevTest;

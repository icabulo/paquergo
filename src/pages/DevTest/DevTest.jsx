import { useDispatch } from "react-redux";
import { getAllMarkersAsync } from "../../Redux/features/generalMap/generalMapSlice";

function DevTest() {
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    console.log("clicked");
    dispatch(getAllMarkersAsync());
  };
  return (
    <>
      <button onClick={handleSubmit}>fetch</button>
    </>
  );
}
export default DevTest;

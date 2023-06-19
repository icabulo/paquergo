import { Marker, Popup } from "react-leaflet";
import { pacaMarker } from "../MarkerIcons/MarkerIcons";
// import { allPacas } from "../../../Redux/mockData/pacasDatabase";
import { useSelector } from "react-redux";

function PacasMarker() {
  const { pacasList } = useSelector((store) => store.generalMap);

  return (
    <>
      {pacasList.map((paca) => (
        <Marker key={paca.pacaId} position={paca.location} icon={pacaMarker}>
          <Popup>
            {paca.info.date} <br /> {`oraganiza: ${paca.info.userName}`} <br />{" "}
            {`chat id: ${paca.info.userId}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
export default PacasMarker;

import { Marker, Popup } from "react-leaflet";
import { pacaMarker } from "../MarkerIcons/MarkerIcons";
import { allPacas } from "../../../Redux/mockData/pacasDatabase";

function PacasMarker() {
  return (
    <>
      {allPacas.map((paca) => (
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

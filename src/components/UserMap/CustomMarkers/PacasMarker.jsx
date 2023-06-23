import { Marker, Popup } from "react-leaflet";
import { pacaMarker } from "../MarkerIcons/MarkerIcons";
// import { allPacas } from "../../../Redux/mockData/pacasDatabase";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function PacasMarker() {
  const { pacasList } = useSelector((store) => store.generalMap);

  return (
    <>
      {pacasList.map((paca) => (
        <Marker key={paca.pacaId} position={paca.location} icon={pacaMarker}>
          <Popup>
            {dayjs(paca.date).format("DD/MMMM/YYYY - HH:mm A")} <br />{" "}
            {`oraganiza: ${paca.userName}`} <br /> {`chat id: ${paca.userId}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
export default PacasMarker;

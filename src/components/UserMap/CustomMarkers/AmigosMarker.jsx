import { Marker, Popup } from "react-leaflet";
import { amigoMarker } from "../MarkerIcons/MarkerIcons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function AmigosMarker() {
  const { wasteList } = useSelector((store) => store.generalMap);
  return (
    <>
      {wasteList.map((amigo) => (
        <Marker
          key={amigo.wasteId}
          position={amigo.location}
          icon={amigoMarker}
        >
          <Popup>
            {dayjs(amigo.date).format("DD/MMMM/YYYY - HH:mm A")} <br />{" "}
            {`Detalles: ${amigo.description}`}
            <br /> {`Entrega: ${amigo.userName}`} <br />
            {`chat id: ${amigo.userId}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
export default AmigosMarker;

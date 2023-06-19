import { Marker, Popup } from "react-leaflet";
import { amigoMarker } from "../MarkerIcons/MarkerIcons";
import { useSelector } from "react-redux";

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
            {amigo.info.date} <br /> {`Detalles: ${amigo.info.description}`}
            <br /> {`Entrega: ${amigo.info.userName}`} <br />
            {`chat id: ${amigo.info.userId}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
export default AmigosMarker;

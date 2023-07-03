import { Marker, Popup } from "react-leaflet";
// import { amigoMarker } from "../MarkerIcons/MarkerIcons";
import { amigoMarker } from "../../../UserMap/MarkerIcons/MarkerIcons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function MyWasteMarker() {
  const { myWasteList, myUsername, userId } = useSelector(
    (store) => store.user
  );

  return (
    <>
      {myWasteList.map((amigo) => (
        <Marker
          key={amigo.wasteId}
          position={amigo.location}
          icon={amigoMarker}
        >
          <Popup>
            {`Estado: ${amigo.deliveryState}`}
            <br />
            {dayjs(amigo.date).format("DD/MMMM/YYYY - HH:mm A")}
            <br />
            {`Detalles: ${amigo.description}`}
            <br />
            {`Entrega: ${myUsername}`}
            <br />
            {`chat id: ${userId}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default MyWasteMarker;

import { Marker, Popup } from "react-leaflet";
// import { amigoMarker } from "../MarkerIcons/MarkerIcons";
import { amigoMarker } from "../../../UserMap/MarkerIcons/MarkerIcons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function MyWasteMarker() {
  const { myWasteList } = useSelector((store) => store.user);

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
            {`Entrega: MY_NAME=goes here`}
            <br />
            {`chat id: MY_ID=goes here`}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default MyWasteMarker;

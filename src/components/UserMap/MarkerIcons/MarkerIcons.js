import L from "leaflet";
import PacaIcon from "../../../assets/icons/pacaIcon.svg";
import wasteIcon from "../../../assets/icons/waste.svg";

export const pacaMarker = L.icon({
  iconUrl: PacaIcon,
  iconRetinaUrl: PacaIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [30, 30],
  className: "leaflet-venue-icon",
});

export const amigoMarker = L.icon({
  iconUrl: wasteIcon,
  iconRetinaUrl: wasteIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [30, 30],
  className: "leaflet-venue-icon",
});

import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import custom from "/public/assets/marker.svg";
import { useEffect } from "react";
const LeafletMap = ({ data }) => {
  // Define your custom icon
  const customIcon = L.icon({
    iconUrl: custom.src, // Path to your icon image
    iconSize: [35, 35], // Size of the icon
    iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
  });
  return (
    <>
      <MapContainer className="w-full h-full" center={[52.5200, 13.4050]} zoom={13} scrollWheelZoom={true} dragging={true} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((value, index) => {
          return (
            <Marker key={index} icon={customIcon} position={value.pos}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default LeafletMap;

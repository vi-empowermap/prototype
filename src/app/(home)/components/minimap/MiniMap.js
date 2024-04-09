import { TileLayer, MapContainer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
const LeafletMap = () => {


  return (
    <>
      <MapContainer className="w-full h-full" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} dragging={true} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
      </MapContainer>
    </>
  );
};

export default LeafletMap;

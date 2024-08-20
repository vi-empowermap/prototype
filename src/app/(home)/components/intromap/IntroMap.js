import { TileLayer, MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { MAPTILELAYER } from "../../constant/mapInfo";
import { useEffect, useRef } from "react";

const MapController = ({  }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([51.1657, 10.4515], 14, {
      animate: true,
      duration: 120 // Duration in seconds
    });
    
  }, [map]);

  return null;
};
const IntroMap = ({setMapLoaded}) => {


  return (
    <>
      <MapContainer className="w-full h-full" center={[51.1657, 10.4515]} zoom={7} doubleClickZoom={false} scrollWheelZoom={false} dragging={false} zoomControl={false} whenReady={(map) => { setMapLoaded(true) }} attributionControl={false} >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={MAPTILELAYER.ex01} />
        <MapController />
      </MapContainer>
    </>
  );
};

export default IntroMap;

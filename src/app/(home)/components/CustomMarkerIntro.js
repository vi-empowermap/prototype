import { useMarkerIcon } from "@/app/utils/hooks/useMarkerIcon";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const CustomMarkerIntro = ({ id, title, imageUrl, font, color, getData, setData, artderorganisation, position, activeColor, archivoraktiv }) => {
  const markerRef = useRef(null);

  const acurrentIcon = useMarkerIcon({ id: id, archivoraktiv: archivoraktiv, activeColor: activeColor, artderorganisation: artderorganisation, selection: true });

  const customIcon2 = L.divIcon({
    className: "marker",
    html: acurrentIcon,
    iconSize: [45, 45],
    iconAnchor: [22.5, 42],
    popupAnchor: [0, -45],
  });

  return (
    <>
      <Marker ref={markerRef} icon={customIcon2} position={position} autoPan={false}></Marker>
    </>
  );
};

export default CustomMarkerIntro;

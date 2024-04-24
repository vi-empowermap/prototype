import { TileLayer, MapContainer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import custom1 from "/public/assets/rect.svg";
import custom2 from "/public/assets/circle.svg";
import custom3 from "/public/assets/triangle.svg";
import CustomMarker from "../CustomMarker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clikedMarkerAtom, setViewAtom } from "@/app/utils/state";
import { useEffect } from "react";

/* Event: if cancel selection of marker */
const LocationFinderDummy = () => {
  const setClickedMarkerAtom = useSetRecoilState(clikedMarkerAtom)
  const map = useMapEvent({ });
  useEffect(() => {
    map.on("popupclose", () => setClickedMarkerAtom(-1))

    return () => {
      map.off("popupclose", () => setClickedMarkerAtom(-1))
    }
  },[map])

  return null;
};
const MapController = ({ setViewAtomValue }) => {
    const map = useMap();
   
    useEffect(() => {
      // console.log(custom);
      if (setViewAtomValue.name !== "berlin") {
        map.setView(setViewAtomValue.pos);
        map.setZoom(15);
      }else{
        map.setView([52.5200, 13.4050]);
        map.setZoom(10);
      }
      
    }, [setViewAtomValue]);
  
  
    return null;
  };

const LeafletMap = ({ data, setData, getDataForMarker }) => {
    const setViewAtomValue = useRecoilValue(setViewAtom)
    // const [getData, setData] = useRecoilState(dataAtom);
  // Define your custom icon
  
  // const customIcon1 = L.divIcon({
  //   className: "marker",
  //   html: svgUrl, // Path to your icon image
  //   iconSize: [35, 35], // Size of the icon
  //   iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
  //   popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
  // });
  // const customIcon1 = L.divIcon({
  //   iconUrl: custom1.src, // Path to your icon image
  //   iconSize: [35, 35], // Size of the icon
  //   iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
  //   popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
  // });
 
 
  return (
    <>
      <MapContainer className="w-full h-full" center={setViewAtomValue.pos} zoom={13} scrollWheelZoom={true} dragging={true} zoomControl={false} doubleClickZoom={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationFinderDummy />
        <MapController setViewAtomValue={setViewAtomValue} />
        {getDataForMarker.map((value, index) => {
          return (
            <CustomMarker key={index} getData={data} setData={setData} id={value.id} artderorganisation={value.artderorganisation} position={value.location} activeColor={value.bgColor} />
          );
        })}
      </MapContainer>
    </>
  );
};

export default LeafletMap;

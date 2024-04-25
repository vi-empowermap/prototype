import { TileLayer, MapContainer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import CustomMarker from "../CustomMarker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clikedMarkerAtom, setViewAtom } from "@/app/utils/state";
import { useEffect } from "react";
import { MAPTILELAYER } from "../../constant/mapInfo";

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
      if (setViewAtomValue.name !== "start") {
        map.setView(setViewAtomValue.pos);
        map.setZoom(9);
      }else{
        map.setView([51.1657, 10.4515]);
        map.setZoom(7);
      }
      
    }, [setViewAtomValue]);
  
  
    return null;
  };

const LeafletMap = ({ data, setData, getDataForMarker }) => {
    const setViewAtomValue = useRecoilValue(setViewAtom)
 
  return (
    <>
      <MapContainer className="w-full h-full" center={setViewAtomValue.pos} zoom={7} scrollWheelZoom={true} dragging={true} zoomControl={false} doubleClickZoom={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={`${MAPTILELAYER.ex01}`} />
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

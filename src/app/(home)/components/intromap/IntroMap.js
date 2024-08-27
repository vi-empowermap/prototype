import { TileLayer, MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import { MAPTILELAYER } from "../../constant/mapInfo";
import { useEffect } from "react";
import germanyPolygonjson from "../../../utils/json/germany.json"
import CustomMarker from "../CustomMarker";
import CustomMarkerIntro from "../CustomMarkerIntro";


// Function to generate a random point within the Germany polygon using Turf.js
const getRandomCoordinatesInGermany = () => {
 
  const bbox = turf.bbox(germanyPolygonjson); // Get the bounding box of the polygon
  let point;

  // Generate a random point within the bounding box and check if it's inside the polygon
  do {
    point = turf.randomPoint(1, { bbox }).features[0]; // Generate a single random point
  } while (!turf.booleanPointInPolygon(point, germanyPolygonjson["features"][0]["geometry"])); // Check if the point is within the polygon

  const [longitude, latitude] = point.geometry.coordinates;
  return [latitude, longitude]; // Return in [lat, lon] format
};

const MapController = () => {
  
  const map = useMap();
  useEffect(() => {
    const randomCoordinates = getRandomCoordinatesInGermany();
    map.flyTo(randomCoordinates, 14, {
      animate: true,
      duration: 60, // Duration in seconds
    });
  }, [map]);

  return null;
};
const IntroMap = ({data, getDataForMarker, setMapLoaded}) => {

  useEffect(() => {
    console.log(getDataForMarker)
  },[])

  return (
    <>
      <MapContainer className="w-full h-full" center={getRandomCoordinatesInGermany()} zoom={14} doubleClickZoom={false} scrollWheelZoom={false} dragging={false} zoomControl={false} whenReady={(map) => { setMapLoaded(true) }} attributionControl={false} >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={MAPTILELAYER.ex01} />
        <MapController />
        {getDataForMarker.map((value, index) => {
          if (value.filterVisible) {
            return (
              <CustomMarkerIntro
                key={index}
                imageUrl={value.orgaimage}
                title={value.organame}
                color={value.bgColor}
                font={value.font}
                getData={data}
                setData={() => {}}
                id={value.id}
                artderorganisation={value.artderorganisation}
                position={value.location}
                activeColor={value.bgColor}
                archivoraktiv={value.archivoraktiv}
              />
            );
          }
        })}
      </MapContainer>
    </>
  );
};

export default IntroMap;

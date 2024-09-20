import { TileLayer, MapContainer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarker from "../CustomMarker";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clickedItemsListAtom, clikedMarkerAtom, closeOrgaAtom, geoLocationPermission, geoLocationPermissionAsked, geoLocationPermissionError, mapErrorMessage, orgaFilterMapCenter, setViewAtom } from "@/app/utils/state";
import { useEffect, useState } from "react";
import { MAPTILELAYER } from "../../constant/mapInfo";
import { useSearchParams } from "next/navigation";
import germanyGeoJson from "../../../utils/json/germany.json";
import {geoJSON} from "leaflet";


const MAP_DEFAULT_ZOOM_VALUE = 6

/* Event: if cancel selection of marker */
const LocationFinderDummy = ({ doubleScreenTouched }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("organisation");
  const getCloseOrgaAtom = useRecoilValue(closeOrgaAtom);
  const setClickedMarkerAtom = useSetRecoilState(clikedMarkerAtom);
  const setClickedItemsList = useSetRecoilState(clickedItemsListAtom);
  
  const map = useMapEvent({
    click() {
      setClickedMarkerAtom(-1);
    },
  });

  useEffect(() => {
    const closeEvent = () => {
      setClickedMarkerAtom(-1);
      setClickedItemsList([]);
    };
    map.on("popupclose", closeEvent);

    return () => {
      map.off("popupclose", closeEvent);
    };
  }, [map]);

  /* Orga page Resizing Map */
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [getCloseOrgaAtom, map, search]);

  useEffect(() => {
    if (map) {
      if (Boolean(search)) {
        setTimeout(() => {
          map.invalidateSize();
        }, 300);
      }
    }
  }, [search, map]);
  /* Double tap resizing map */
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [doubleScreenTouched, map]);

  useEffect(() => {
    const resizeEvent = () => {
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    };
    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return null;
};

function SetMaxBounds({ geoJSONData }) {
  const map = useMap();
  const [getMapErrorMessage, setMapErrorMessage] = useRecoilState(mapErrorMessage)

  useEffect(() => {
    if (geoJSONData) {
      const geojsonLayer = geoJSON(geoJSONData);
      const bounds = geojsonLayer.getBounds();
      map.setMaxBounds(bounds);
    
      map.fitBounds(bounds); // Optionally, fit the map to the bounds



      // Add an event listener to detect when the map moves
      const onMoveEnd = () => {
        if (!bounds.contains(map.getCenter())) {
          if(!getMapErrorMessage){
            setMapErrorMessage(true)
          }
         
        }
      };

      map.on('moveend', onMoveEnd);

      // Clean up the event listener when the component is unmounted or geoJSONData changes
      return () => {
        map.off('moveend', onMoveEnd);
      };
    }

    
  }, [geoJSONData, map]);

  return null;
}

const MapController = ({ setViewAtomValue }) => {
  const map = useMap();
  const setGeoLocationPermissionError = useSetRecoilState(geoLocationPermissionError);
  const getGeoLocationPermissionAsked = useRecoilValue(geoLocationPermissionAsked)
  const [getOrgaFilterMapCenter, setOrgaFilterMapCenter] = useRecoilState(orgaFilterMapCenter)
  useEffect(() => {
    if (setViewAtomValue.name !== "start") {
      if (setViewAtomValue.type === "mini") {
        map.setView(setViewAtomValue.pos, 9, { animate: false });
      } else {
        map.closePopup();
        map.setView(setViewAtomValue.pos, 13);
      }
    } else {
      // center reset

      // check if a User clicked the geolocation button or not
 
        // if clicked
        if (getGeoLocationPermissionAsked) {
          const successCallback = (position) => {
            setGeoLocationPermissionError(false);
            map.setView([position.coords.latitude, position.coords.longitude], 12);
          };
          const errorCallback = (error) => {
            setGeoLocationPermissionError(true);
            // error handling if bestimmung is on but you turn off the geolocation permission
            map.setView([51.1657, 10.4515], MAP_DEFAULT_ZOOM_VALUE);
          };
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
          } else {
            alert("Geolocation is not supported by this browser.");
          }
        }else{
          map.setView([51.1657, 10.4515], MAP_DEFAULT_ZOOM_VALUE);
        }
      
      // const geoPermissionCheck = localStorage.getItem("padlas_standortbestimmung");

      // if (geoPermissionCheck) {
      //   const geoPermission = JSON.parse(geoPermissionCheck);
      //   // if clicked
      //   if (geoPermission.answer) {
      //     const successCallback = (position) => {
      //       setGeoLocationPermissionError(false);
      //       map.setView([position.coords.latitude, position.coords.longitude], 10);
      //     };
      //     const errorCallback = (error) => {
      //       setGeoLocationPermissionError(true);
      //       // error handling if bestimmung is on but you turn off the geolocation permission
      //       map.setView([51.1657, 10.4515], 6);
      //     };
      //     if (navigator.geolocation) {
      //       navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      //     } else {
      //       alert("Geolocation is not supported by this browser.");
      //     }
      //   } else {
      //     setGeoLocationPermissionError(false);
      //     map.setView([51.1657, 10.4515], 6);
      //   }
    

      // if not
    }
  }, [setViewAtomValue]);

  useEffect(() => {
    if(getOrgaFilterMapCenter){
      map.setView([51.1657, 10.4515], MAP_DEFAULT_ZOOM_VALUE);
    setOrgaFilterMapCenter(false)
    } 
    
  },[getOrgaFilterMapCenter])

  return null;
};

const LeafletMap = ({ doubleScreenTouched, data, setData, getDataForMarker }) => {
  const [geoJSONData, setGeoJSONData] = useState(null);

  useEffect(() => {
    setGeoJSONData(germanyGeoJson);
  }, []);
  const setViewAtomValue = useRecoilValue(setViewAtom);
  // const getGeoLocationPermission = useRecoilValue(geoLocationPermission);

  return (
    <>
      <MapContainer attributionControl={false} className="w-full h-full" center={setViewAtomValue.pos} zoom={6} minZoom={6} scrollWheelZoom={true} dragging={true} zoomControl={false} doubleClickZoom={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={`${MAPTILELAYER.ex01}`} />
        {geoJSONData && <SetMaxBounds geoJSONData={geoJSONData} />}
        <LocationFinderDummy doubleScreenTouched={doubleScreenTouched} />
        <MapController setViewAtomValue={setViewAtomValue} />
        {getDataForMarker.map((value, index) => {
          if (value.filterVisible) {
            return (
              <CustomMarker
                key={index}
                imageUrl={value.orgaimage}
                title={value.organame}
                color={value.bgColor}
                font={value.font}
                getData={data}
                setData={setData}
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

export default LeafletMap;

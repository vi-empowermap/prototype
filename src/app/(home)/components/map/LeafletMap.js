import { TileLayer, MapContainer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarker from "../CustomMarker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clickedItemsListAtom, clikedMarkerAtom, closeOrgaAtom, geoLocationPermission, setViewAtom } from "@/app/utils/state";
import { useEffect, useState } from "react";
import { MAPTILELAYER } from "../../constant/mapInfo";
import { useSearchParams } from "next/navigation";
import germanyGeoJson from "../../../utils/json/germany.json"
import L from 'leaflet';
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

  useEffect(() => {
    if (geoJSONData) {
      const geojsonLayer = L.geoJSON(geoJSONData);
      const bounds = geojsonLayer.getBounds();
      map.setMaxBounds(bounds);
      map.fitBounds(bounds); // Optionally, fit the map to the bounds
    }
  }, [geoJSONData, map]);

  return null;
}

const MapController = ({ setViewAtomValue }) => {
  const map = useMap();

  

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
        const successCallback = (position) => {
          map.setView([position.coords.latitude, position.coords.longitude], 10);
        };
        const errorCallback = (error) => {
          map.setView([51.1657, 10.4515], 7);
        };
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
        
        // if not
      
    }
  }, [setViewAtomValue]);

  return null;
};

const LeafletMap = ({ doubleScreenTouched, data, setData, getDataForMarker }) => {
  const [geoJSONData, setGeoJSONData] = useState(null);

  useEffect(() => {
    setGeoJSONData(germanyGeoJson)
  },[])
  const setViewAtomValue = useRecoilValue(setViewAtom);
  // const getGeoLocationPermission = useRecoilValue(geoLocationPermission);

  return (
    <>
      <MapContainer attributionControl={false} className="w-full h-full" center={setViewAtomValue.pos} zoom={7} minZoom={5} scrollWheelZoom={true} dragging={true} zoomControl={false} doubleClickZoom={false}>
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

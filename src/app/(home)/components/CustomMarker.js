import { useMarkerIcon } from "@/app/utils/hooks/useMarkerIcon";
import { clickedItemsListAtom, clikedMarkerAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useRecoilState, useSetRecoilState } from "recoil";

const CustomMarker = ({ id, title, imageUrl, font, color, getData, setData, artderorganisation, position, activeColor, archivoraktiv }) => {
  const [getClickedMarkerAtom, setClickedMarkerAtom] = useRecoilState(clikedMarkerAtom);
  const setclickedItemsList = useSetRecoilState(clickedItemsListAtom);

  const markerRef = useRef(null);
  const map = useMap();
  const [clicked, setClicked] = useState({
    id: "",
  });

  const currentIcon = useMarkerIcon({ id: id, archivoraktiv: archivoraktiv, activeColor: activeColor, artderorganisation: artderorganisation, selection: false });
  const acurrentIcon = useMarkerIcon({ id: id, archivoraktiv: archivoraktiv, activeColor: activeColor, artderorganisation: artderorganisation, selection: true });
  const customIcon1 = L.divIcon({
    className: "marker",
    html: currentIcon, // Path to your icon image
    iconSize: [35, 35], // Size of the icon
    iconAnchor: [17.5, 35], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
  });

  const customIcon2 = L.divIcon({
    className: "marker",
    html: acurrentIcon,
    iconSize: [45, 45],
    iconAnchor: [22.5, 42],
    popupAnchor: [0, -45],
  });

  const dragEndEvent = () => {
    if (markerRef.current) {
      const boundsFirst = map.getBounds();
      if (boundsFirst.contains(markerRef.current.getLatLng())) {
        // map.addLayer(markerRef.current);
        const data = [...getData];
        data.find((e) => e.id === id).visible = true;
        setData(data);
      } else {
        // map.removeLayer(markerRef.current);
        const data = [...getData];
        data.find((e) => e.id === id).visible = false;
        setData(data);
      }
    }
  };

  useEffect(() => {
    map.on("moveend", dragEndEvent);

    dragEndEvent();
  }, []);

  /* Click Marker */
  useEffect(() => {
    if (clicked.id === id) {
      dragEndEvent();
      setClickedMarkerAtom(id);
    }
  }, [clicked]);

  return (
    <>
      <Marker
        ref={markerRef}
        icon={getClickedMarkerAtom === id ? customIcon2 : customIcon1}
        position={position}
        autoPan={false}
        eventHandlers={{
          click: (e) => {
            const data = [...getData];
            const index = data.findIndex((e) => e.id === id);
            const item = data.splice(index, 1)[0];
            data.splice(0, 0, item);
            setData(data);
            setclickedItemsList([id]);
            setClicked({
              id: item.id,
              pos: [item.location.lat, item.location.lon],
            });
          },
        }}
      >
        <Popup closeButton={true} autoPan={false}>
          <div className="flex flex-col w-fit font-jetBrainsMono font-medium">
            <div style={{ color: color }} className={`flex flex-1 w-fit font-semibold text-sm p-2 pt-4 ${String(imageUrl) === "" && "pt-6"}`}>
              {title}
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default CustomMarker;

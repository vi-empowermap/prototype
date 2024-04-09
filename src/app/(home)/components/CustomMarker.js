import { clickedItemsListAtom, dataAtom } from "@/app/utils/state";
import { useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useRecoilState, useSetRecoilState } from "recoil";

const CustomMarker = ({ id, getData, setData, customIcon, position }) => {
    const setclickedItemsList = useSetRecoilState(clickedItemsListAtom)
  const markerRef = useRef(null);
  const map = useMap();

  const dragEndEvent = () => {
    if (markerRef.current) {
      const boundsFirst = map.getBounds();
      if (boundsFirst.contains(markerRef.current.getLatLng())) {
        map.addLayer(markerRef.current);
        const data = [...getData];
        data.find((e) => e.id === id).visible = true;

        setData(data);
      } else {
        map.removeLayer(markerRef.current);

        const data = [...getData]
        data.find((e) => e.id === id).visible = false;
        setData(data)
      }
    }
  };

  useEffect(() => {
    map.on("dragend", dragEndEvent);
    map.on("zoomend", dragEndEvent);
    // start
    dragEndEvent();
  }, []);
  return (
    <>
      <Marker ref={markerRef} icon={customIcon} position={position}
        eventHandlers={{
            click: (e) => {
                setclickedItemsList([id])
            }
        }}
      >
        <Popup>
         Orga: {id}
        </Popup>
      </Marker>
    </>
  );
};

export default CustomMarker;

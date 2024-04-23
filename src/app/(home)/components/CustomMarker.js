import { clickedItemsListAtom, dataAtom, setViewAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const CustomMarker = ({ id, getData, setData, customIcon, position }) => {
  const setclickedItemsList = useSetRecoilState(clickedItemsListAtom);
  const getSetViewAtom = useRecoilValue(setViewAtom);
  const markerRef = useRef(null);
  const map = useMap();
  const [clicked, setClicked] = useState({
    id: ""
  });

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

        const data = [...getData];
        data.find((e) => e.id === id).visible = false;
        setData(data);
      }
    }
  };

  useEffect(() => {
    // console.log(position)
  
    map.on("dragend", dragEndEvent);
    map.on("zoomend", dragEndEvent);
    // start
    dragEndEvent();
  }, []);

  useEffect(() => {
    if(clicked.id === id){
      map.setView(clicked.pos, map.getZoom())
    }
  },[clicked])
    useEffect(() => {
    if(getSetViewAtom.name !== "berlin"){
      map.setView(getSetViewAtom.pos, 12);
    }
  },[getSetViewAtom])
  return (
    <>
      <Marker
        ref={markerRef}
        icon={customIcon}
        position={position}
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
              })
          },
        }}
      >
        <Popup>Orga: {id + 1}</Popup>
      </Marker>
    </>
  );
};

export default CustomMarker;

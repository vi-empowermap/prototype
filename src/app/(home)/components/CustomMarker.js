import { useMarkerIcon } from "@/app/utils/hooks/useMarkerIcon";
import { clickedItemsListAtom, dataAtom, setViewAtom, clikedMarkerAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const CustomMarker = ({ id,title,imageUrl,font, color, getData, setData, artderorganisation, position, activeColor, archivoraktiv }) => {
  const [getClickedMarkerAtom, setClickedMarkerAtom] = useRecoilState(clikedMarkerAtom);
  const setclickedItemsList = useSetRecoilState(clickedItemsListAtom);
  const getSetViewAtom = useRecoilValue(setViewAtom);
  const markerRef = useRef(null);
  const map = useMap();
  const [clicked, setClicked] = useState({
    id: "",
  });
 
  const currentIcon = useMarkerIcon({id:id, archivoraktiv: archivoraktiv, activeColor: activeColor, artderorganisation:artderorganisation, selection: false});
  const acurrentIcon = useMarkerIcon({id:id, archivoraktiv: archivoraktiv, activeColor: activeColor, artderorganisation:artderorganisation, selection: true});
  const customIcon1 = L.divIcon({
    className: "marker",
    html: currentIcon, // Path to your icon image
    iconSize: [35 / 1.4, 35 / 1.4], // Size of the icon
    iconAnchor: [17 / 1.4, 35 / 1.4], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -35 / 1.4], // Point from which the popup should open relative to the iconAnchor
  });

  const customIcon2 = L.divIcon({
    className: "marker",
    html: acurrentIcon, 
    iconSize: [35, 35], 
    iconAnchor: [17, 35],
    popupAnchor: [0, -35], 
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
    
    // map.on("dragend", dragEndEvent);
    // map.on("zoomend", dragEndEvent);
   
    // start
    dragEndEvent();
  }, []);
  
  
  /* Click Marker */
  useEffect(() => {
    
    if (clicked.id === id) {
      // map.setView(clicked.pos, map.getZoom(), { animate: false , duration: 0.3 });
      dragEndEvent();
      setClickedMarkerAtom(id);
      // setTimeout(() => {
      //   // TODO: 💡 Do I need to update all of the markers? or just update the clicked marker.
      //   dragEndEvent()
      // }, 300);
      // if(clicked.id !== getClickedMarkerAtom){
      //   setClicked({id: ""})
      // }
     
    }
  }, [clicked]);
  // useEffect(() => {
  //   if (getSetViewAtom.name !== "start") {
  //     // map.setView(getSetViewAtom.pos, 12);
  //     // if (getSetViewAtom.id === id) {
  //     //   setClickedMarkerAtom(id);
  //     // }
  //   }
  // }, [getSetViewAtom]);
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
        <Popup 
        closeButton={true}
        autoPan={false}
        
        >
          <div className="flex flex-col w-fit font-jetBrainsMono font-medium">
          {/* If we need a photo then use this */}
            {/* {String(imageUrl) !== "" && <div style={{backgroundImage: `url(${process.env.KB_FOR_FILE}/@/file/${String(imageUrl).slice(7)})`}} className="w-60 aspect-video bg-neutral-300 flex justify-center items-center bg-cover">
            </div>} */}
            <div style={{color: color,}} className={`flex flex-1 w-fit font-semibold text-sm p-2 ${String(imageUrl) === "" && "pt-6"}`}>{title}</div>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default CustomMarker;

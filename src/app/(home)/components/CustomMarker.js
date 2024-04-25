import { clickedItemsListAtom, dataAtom, setViewAtom, clikedMarkerAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const CustomMarker = ({ id, getData, setData, artderorganisation, position, activeColor, archivoraktiv }) => {
  const [getClickedMarkerAtom, setClickedMarkerAtom] = useRecoilState(clikedMarkerAtom);
  const setclickedItemsList = useSetRecoilState(clickedItemsListAtom);
  const getSetViewAtom = useRecoilValue(setViewAtom);
  const markerRef = useRef(null);
  const map = useMap();
  const [clicked, setClicked] = useState({
    id: "",
  });

// Circle
  const svgUrl1 = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .a${id}1 {
        fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <rect class="a${id}1" x="0" y="0" width="800" height="800" rx="400" ry="400"/>
</svg>`;
// rect
const svgUrl2 = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
    <defs>
      <style>
        .a${id}2 {
          fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
          stroke-width: 0px;
        }
      </style>
    </defs>
    <rect class="a${id}2" x="0" y="0" width="800" height="800"/>
  </svg>`;
// Triangle
  const svgUrl3 = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
    <defs>
      <style>
        .a${id}3 {
          fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
          stroke-width: 0px;
        }
      </style>
    </defs>
    <polygon class="a${id}3" points="400 42.6 .7 734.2 799.3 734.2 400 42.6"/>
  </svg>`;
  const asvgUrl1 = `
  
  <svg  xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .a${id}4 {
        fill: ${activeColor};
        stroke-width: 0px;
      }
    </style>
  </defs>
  
  <rect class="a${id}4" x="0" y="0" width="800" height="800" rx="400" ry="400"/>
</svg>`;
  const asvgUrl2 = `
  <svg  xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
    <defs>
      <style>
        .a${id}5 {
          fill: ${activeColor};
          stroke-width: 0px;
        }
      </style>
    </defs>
    <rect class="a${id}5" x="0" y="0" width="800" height="800"/>
  </svg>`;
  const asvgUrl3 = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1200 1200">
  <defs>
    <style>
      .a${id}6 {
        fill: ${activeColor};
        stroke-width: 0px;
      }

      .a${id}62 {
        fill: none;
        stroke: ${activeColor};
        stroke-miterlimit: 10;
        stroke-width: 21px;
      }
    </style>
  </defs>
  <polygon class="a${id}6" points="600 158.6 200.7 850.2 999.3 850.2 600 158.6"/>
  <circle class="a${id}62" cx="600" cy="600" r="520.1"/>
</svg>
 `;
  const currentIcon = artderorganisation === "xx" ? svgUrl1 : artderorganisation === "yy" ? svgUrl3 : svgUrl2;
  const acurrentIcon = artderorganisation === "xx" ? asvgUrl1 : artderorganisation === "yy" ? asvgUrl3 : asvgUrl2;
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
    map.on("dragend", dragEndEvent);
    map.on("zoomend", dragEndEvent);
    // start
    dragEndEvent();
  }, []);

  /* Click Marker */
  useEffect(() => {
    if (clicked.id === id) {
      map.setView(clicked.pos, map.getZoom(), { animate: true, duration: 0.3 });
      setTimeout(() => {
        setClickedMarkerAtom(id);
      }, 300);
      // if(clicked.id !== getClickedMarkerAtom){
      //   setClicked({id: ""})
      // }
     
    }
  }, [clicked]);
  useEffect(() => {
    if (getSetViewAtom.name !== "start") {
      map.setView(getSetViewAtom.pos, 12);
      if (getSetViewAtom.id === id) {
        setClickedMarkerAtom(id);
      }
    }
  }, [getSetViewAtom]);
  return (
    <>
      <Marker
        ref={markerRef}
        icon={getClickedMarkerAtom === id ? customIcon2 : customIcon1}
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
            });
          },
        }}
      >
        <Popup closeButton={true}>Orga: {id + 1}</Popup>
      </Marker>
    </>
  );
};

export default CustomMarker;

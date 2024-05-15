import { TileLayer, MapContainer, useMap, useMapEvent } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import CustomMarker from "../CustomMarker"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { clickedItemsListAtom, clikedMarkerAtom, closeOrgaAtom, setViewAtom } from "@/app/utils/state"
import { useEffect } from "react"
import { MAPTILELAYER } from "../../constant/mapInfo"
import { useSearchParams } from "next/navigation"

/* Event: if cancel selection of marker */
const LocationFinderDummy = ({doubleScreenTouched}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("organisation");
  const getCloseOrgaAtom = useRecoilValue(closeOrgaAtom)
  const setClickedMarkerAtom = useSetRecoilState(clikedMarkerAtom)
  const setClickedItemsList = useSetRecoilState(clickedItemsListAtom);
  const map = useMapEvent({
      click() {
        setClickedMarkerAtom(-1)
       
      }
   })
  useEffect(() => {
    const closeEvent = () => {
      setClickedMarkerAtom(-1)
      setClickedItemsList([])
    }
    map.on("popupclose", closeEvent)

    return () => {
      map.off("popupclose", closeEvent)
    }
  },[map])
/* Orga page Resizing Map */
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize()
    },300)

  },[getCloseOrgaAtom])
  useEffect(() => {
    if(Boolean(search)){
      setTimeout(() => {
        map.invalidateSize()
      },300)
    }
  },[search])
  /* Double tap resizing map */
  useEffect(() => {
    
      setTimeout(() => {
        map.invalidateSize()
      },300)
    
  },[doubleScreenTouched])

  useEffect(() => {
    const resizeEvent = () => {
      setTimeout(() => {
        map.invalidateSize()
      },300)
    }
    window.addEventListener('resize', resizeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent)
    }
  },[])

  return null
}
const MapController = ({ setViewAtomValue }) => {
    const map = useMap()
   
    useEffect(() => {
      // console.log(custom)
      if (setViewAtomValue.name !== "start") {
        if(setViewAtomValue.type === "mini"){
          map.setView(setViewAtomValue.pos, 18, {animate: false})
         
        }else{
          map.closePopup()
          map.setView(setViewAtomValue.pos, 13)
          
       
        }
      }else{
        // center reset
        map.setView([51.1657, 10.4515],7)
      
       
      }
      
    }, [setViewAtomValue])
  
  
    return null
  }

const LeafletMap = ({doubleScreenTouched, data, setData, getDataForMarker }) => {
    const setViewAtomValue = useRecoilValue(setViewAtom)
 
  return (
    <>
      <MapContainer className="w-full h-full" center={setViewAtomValue.pos} zoom={7} minZoom={5} scrollWheelZoom={true} dragging={true} zoomControl={false} doubleClickZoom={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={`${MAPTILELAYER.ex01}`} />
        <LocationFinderDummy doubleScreenTouched={doubleScreenTouched} />
        <MapController setViewAtomValue={setViewAtomValue} />
        {getDataForMarker.map((value, index) => {
          if(value.filterVisible){
            return (
            <CustomMarker key={index} getData={data} setData={setData} id={value.id} artderorganisation={value.artderorganisation} position={value.location} activeColor={value.bgColor} archivoraktiv={value.archivoraktiv} />
          )
          }
          
        })}
      </MapContainer>
    </>
  )
}

export default LeafletMap

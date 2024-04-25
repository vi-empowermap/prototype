import { TileLayer, MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import seg from "/public/assets/berlin.json";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentBundesLand, setViewAtom } from "@/app/utils/state";
import { MAPTILELAYER } from "../../constant/mapInfo";

const LeafletMap = () => {
  const [setViewAtomValue, setViewAtomSet] = useRecoilState(setViewAtom);
  const [getCurrentBundesLand,setCurrentBundesLand] = useRecoilState(currentBundesLand);
  
  const setColor = ({properties}) => {
    return {
      weight: 2,
      fillColor: getCurrentBundesLand === properties.name.toLowerCase() ? "black" :"white",
      opacity: 1,
      color: "black",
      // dashArray: "0",
    };
  };

  return (
    <>
      <MapContainer className="w-full h-full bg-red-400" center={[51.1657, 10.4515]} zoom={5} doubleClickZoom={false} scrollWheelZoom={false} dragging={false} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={MAPTILELAYER.exMini02} />
        <GeoJSON
          attribution="&copy; credits due..."
          data={seg}
          style={setColor}
          eventHandlers={{
            mouseover: (e) => {
              let layer = e.layer;
              const bundesland = layer.feature.properties.name;
              setCurrentBundesLand(bundesland.toLowerCase());
        
              layer.bringToFront();
            
            },
            mouseout: (e) => {
              let layer = e.layer;
              layer.setStyle({
                fillColor: "white",
              });
              // layer.bringToFront();

              setCurrentBundesLand("");
            },
            click: (e) => {
              const latlng = e.latlng;
              const bundesland = e["layer"].feature.properties.name;
              console.log(bundesland);

              setViewAtomSet({
                pos: [latlng.lat, latlng.lng],
                name: bundesland,
                type: "mini",
              });
            },
          }}
        />
      </MapContainer>
    </>
  );
};

export default LeafletMap;

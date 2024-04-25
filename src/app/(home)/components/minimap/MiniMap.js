import { TileLayer, MapContainer, GeoJSON } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import seg from "/public/assets/berlin.json"
import { useRecoilState, useRecoilValue } from "recoil";
import { setViewAtom } from "@/app/utils/state";
const LeafletMap = () => {
  const [setViewAtomValue, setViewAtomSet] = useRecoilState(setViewAtom)
  const setColor = ({ properties }) => {
    return {
      weight: 3,
      fillColor: "black",
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };

  return (
    <>
      <MapContainer className="w-full h-full" center={[51.1657, 10.4515]} zoom={5} doubleClickZoom={false} scrollWheelZoom={false} dragging={false} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          attribution="&copy; credits due..."
          data={seg}
          style={setColor}
          eventHandlers={{
            mouseover: (e) => {
              // console.log(e);
              let layer = e.layer;
              layer.setStyle({
                fillColor: "black",
                fillOpacity: 1,
              });
              layer.bringToFront();
            },
            mouseout: (e) => {
              // console.log(e);
              let layer = e.layer;
              layer.setStyle({
                fillColor: "black",
                fillOpacity: 0.5,
              });
              layer.bringToFront();
            },
            click: (e) => {     
              const latlng = e.latlng;
              const bundesland = e["layer"].feature.properties.name;
              console.log(bundesland)
              setViewAtomSet({
                pos: [latlng.lat, latlng.lng],
                name: bundesland
              })
            },
          }}
        />
      </MapContainer>
    </>
  );
};

export default LeafletMap;

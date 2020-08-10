import React from "react";
import "./Map.css";
import { showDataOnMap } from "./util";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
// function Map({ countries, casesType, center, zoom }) {
//   return (
//     <div className="map">
//       <LeafletMap center={center} zoom={zoom}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {/* loop countries and draw circles on map */}
//         {showDataOnMap(countries, casesType)}
//       </LeafletMap>
//     </div>
//   );
// }

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;

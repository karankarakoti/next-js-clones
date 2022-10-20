import { getCenter } from "geolib";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const Map = ({
  searchResults
}) => {

  const [ selectedLocation, setSelectedLocation ] = useState({});

  const coordinates = searchResults?.map(result => ({
    "latitude": result.lat,
    "longitude": result.long
  }));

  const center = getCenter(coordinates);

  const [ viewport, setViewPort ] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 10
  });

  return (
    <ReactMapGL
      mapboxAccessToken={process.env.mapbox_key}
      mapStyle="mapbox://styles/karankarakoti/cl9gwbhby001114msh32qfcl0"            
      {...viewport}            
      onMove={(e) => setViewPort(e.viewState)}
    >
      {searchResults?.map((item, index) => (
        <div key={index}>
          <Marker
            longitude={item.long}
            latitude={item.lat}      
            offsetLeft={-20}
            offsetTop={-10}             
            className="z-40"
          >
            <p 
              role="img"
              className="cursor-pointer text-2xl"              
              aria-label="push-pin"  
              onClick={() => setSelectedLocation(item)}                           
            >
              📌
            </p>
          </Marker>
          {selectedLocation?.lat === item.lat && (
            <Popup
              closeOnClick={true}
              closeButton={true}
              onClose={() => setSelectedLocation({})}              
              latitude={item.lat}
              longitude={item.long}              
            >              
              {item.title}             
            </Popup>
          )}
        </div>
      ))}      
    </ReactMapGL>
  )
}
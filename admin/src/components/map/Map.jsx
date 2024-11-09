import React, { useMemo, useRef, useState } from "react";
import { GoogleMap } from '@react-google-maps/api';

const MapView = ({ children }) => {
  const mapRef = useRef(null);
  const [position, setPosition] = useState({
    lat: 28.6139, // Center of Delhi
    lng: 77.209
  });

  const options = useMemo(() => ({
    mapId: "28fbb85fa828483f",
    disableDefaultUI: true,
    clickableIcons: false,
    zoom: 10
  }), []);

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }

  return (
    <div className="w-full h-full rounded-md overflow-hidden">
      <GoogleMap
        zoom={7}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onDragEnd={handleCenter}
        onLoad={handleLoad}
        center={position}
        mapContainerClassName="map-container"
        options={options} // Ensuring options are passed correctly
      >
        {children}
      </GoogleMap>
    </div>
  );
};

export default MapView;

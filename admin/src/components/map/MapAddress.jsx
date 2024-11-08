'use client'

import React, { useState, useEffect, useRef } from 'react';
import {MarkerF} from '@react-google-maps/api';
import Map from './Map'; // Make sure this is correctly set up

const MapMarker = ({ setAddress, getCoord }) => {
  const [coords, setCoords] = useState({ lat: 13.078339, lng: 80.180592 });

  useEffect(() => {
    getCoord(coords);

    const service = new google.maps.Geocoder();
    const helper = async () => {
      try {
        const res = await service.geocode({ location: coords });
        if (res.results[0]) {
          setAddress({ address: res.results[0].formatted_address, placeId: res.results[0].place_id });
        }
      } catch (error) {
        console.error('Geocoding failed: ', error);
      }
    };
    helper();
  }, [coords, getCoord, setAddress]);

  const handleClick = (e) => {
    if (e.latLng) {
      setCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  return (
    <Map
      onClick={handleClick}
      center={coords}
      zoom={15}
    >
      <MarkerF position={coords} />
    </Map>
  );
};

export default MapMarker;

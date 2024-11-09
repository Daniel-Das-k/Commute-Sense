import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, TrafficLayer, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';  // If you want to use this hook
// import { currentUser } from './store/reducer/UserReducer';  // Assuming the same Redux logic

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 28.6139, // Delhi latitude
  lng: 77.2090, // Delhi longitude
};

const busStopsData = [
  { name: 'Kendriya Terminal (Church Road)', latitude: 28.617312, longitude: 77.203904 },
  { name: 'Kendriya Terminal / Gurudwara Rakab Gunj', latitude: 28.6195246, longitude: 77.2060375 },
  { name: 'Talkatora Road', latitude: 28.6253589, longitude: 77.1942895 },
  { name: 'RML Hospital', latitude: 28.6257093, longitude: 77.2006339 },
  { name: 'Gurudwara Bangla Sahib', latitude: 28.6258652, longitude: 77.20895180000001 },
  { name: 'YMCA / Palika Kendra', latitude: 28.62636, longitude: 77.21267999999999 },
];

const MapView = () => {
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [trafficVisible, setTrafficVisible] = useState(true);

  // Google Maps API Loader
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAaCWjzUJ1XziqSuWycOTNorOmfe2swDIc',
  });

  // Redux user authentication
  useEffect(() => {
    dispatch(currentUser()).then((state) => {
      if (!state.payload?.currentUser && !user) {
        navigate('/login');
      }
    });
  }, [dispatch, user]);

  const handleCalculateRoute = () => {
    if (!origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(), // current time
          trafficModel: 'pessimistic',
        },
        provideRouteAlternatives: true,
        region: 'IN', // for India region
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const optimizedRoute = getShortestRoute(result.routes);
          setDirectionsResponse(optimizedRoute);
        } else {
          console.error('Error fetching directions:', status);
        }
      }
    );
  };

  // Function to find the shortest route from alternatives
  const getShortestRoute = (routes) => {
    let shortestRoute = routes[0];
    let shortestDuration = routes[0].legs[0].duration_in_traffic.value;

    routes.forEach((route) => {
      const routeDuration = route.legs[0].duration_in_traffic.value;
      if (routeDuration < shortestDuration) {
        shortestRoute = route;
        shortestDuration = routeDuration;
      }
    });

    return { routes: [shortestRoute] };
  };

  // If Google Maps API is still loading
  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <GoogleMap center={center} zoom={12} mapContainerStyle={mapContainerStyle}>
        {busStopsData.map((stop, index) => (
          <Marker key={index} position={{ lat: stop.latitude, lng: stop.longitude }} label={stop.name} />
        ))}

        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        {trafficVisible && <TrafficLayer />}
      </GoogleMap>

      <div className="controls">
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={handleCalculateRoute}>Calculate Route</button>
      </div>
    </>
  );
};

export default MapView;

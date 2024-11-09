import React, { useState } from 'react';
import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import MapView from './Map';

// Sample data for stops
const stops = [
    { name: "Devs REC Club", location: { lat: 13.0827, lng: 80.2707 } }, // Chennai
    { name: "Pawlab", location: { lat: 28.7041, lng: 77.1025 } }, // Delhi
    { name: "Automated Bus Scheduling Project", location: { lat: 12.9716, lng: 77.5946 } }, // Bangalore
    { name: "Sixth Sense Project", location: { lat: 19.0760, lng: 72.8777 } }, // Mumbai
    { name: "Hackmageddon Chapter 1", location: { lat: 22.5726, lng: 88.3639 } }, // Kolkata
];

// Generate additional random projects for demonstration
for (let i = 0; i < 95; i++) {
    stops.push({
        name: `Project ${i + 5}`, // Naming projects sequentially
        location: {
            lat: Math.random() * (28.8835 - 28.4082) + 28.4082, // Random latitude within Delhi
            lng: Math.random() * (77.3534 - 76.8370) + 76.8370  // Random longitude within Delhi
        }
    });
}

const containerStyle = {
    width: '100%',
    height: '600px'
};


const Map = () => {
    const [selected, setSelected] = useState(null);

    return (
        <MapView
            mapContainerStyle={containerStyle}

            zoom={5}
        >
            {stops.map((stop, index) => (
                <MarkerF
                    key={index}
                    position={stop.location}
                    onClick={() => {
                        setSelected(stop); // Set the selected marker
                    }}
                />
            ))}

            {selected && (
                <InfoWindowF
                    position={selected.location} // Position of the InfoWindow
                    onCloseClick={() => {
                        setSelected(null); // Close the InfoWindow
                    }}
                >
                    <div className='text-black'>
                        <h2>{selected.name}</h2>
                        <p>More details about {selected.name}...</p>
                    </div>
                </InfoWindowF>
            )}
        </MapView>
    );
}

export default Map;
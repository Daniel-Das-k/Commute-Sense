import React, { useState } from 'react';
import { GoogleMap, PolylineF, MarkerF, InfoWindowF } from '@react-google-maps/api';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,

} from '@/components/ui/card'; // Adjust the import based on your project structure
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';

const MapDashboard = () => {
  const center = { lat: 28.6139, lng: 77.209 }; // Center around Delhi
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);

  // Define multiple routes
  const busRoutes = [
    { id: 1, color: '#FF0000', waypoints: [{ lat: 28.7041, lng: 77.1025 }, { lat: 28.6139, lng: 77.209 }, { lat: 28.5355, lng: 77.391 }] },
    { id: 2, color: '#00FF00', waypoints: [{ lat: 28.6139, lng: 77.209 }, { lat: 28.5273, lng: 77.0687 }, { lat: 28.4595, lng: 77.0266 }] },
    { id: 3, color: '#0000FF', waypoints: [{ lat: 28.7041, lng: 77.1025 }, { lat: 28.4595, lng: 77.0266 }, { lat: 28.5355, lng: 77.391 }] },
    { id: 4, color: '#FFAA00', waypoints: [{ lat: 28.7041, lng: 77.1025 }, { lat: 28.5976, lng: 77.2235 }, { lat: 28.4595, lng: 77.0266 }] },
    { id: 5, color: '#AA00FF', waypoints: [{ lat: 28.5355, lng: 77.391 }, { lat: 28.5273, lng: 77.0687 }, { lat: 28.4595, lng: 77.0266 }] },
    { id: 6, color: '#00AAAA', waypoints: [{ lat: 28.5273, lng: 77.0687 }, { lat: 28.6139, lng: 77.209 }, { lat: 28.7041, lng: 77.1025 }] },
    { id: 7, color: '#AA0000', waypoints: [{ lat: 28.6139, lng: 77.209 }, { lat: 28.4595, lng: 77.0266 }, { lat: 28.7041, lng: 77.1025 }] },
    { id: 8, color: '#00AA00', waypoints: [{ lat: 28.7041, lng: 77.1025 }, { lat: 28.5976, lng: 77.2235 }, { lat: 28.5273, lng: 77.0687 }] },
    { id: 9, color: '#0000AA', waypoints: [{ lat: 28.5976, lng: 77.2235 }, { lat: 28.4595, lng: 77.0266 }, { lat: 28.7041, lng: 77.1025 }] },
    { id: 10, color: '#FF5500', waypoints: [{ lat: 28.6139, lng: 77.209 }, { lat: 28.7041, lng: 77.1025 }, { lat: 28.4595, lng: 77.0266 }] },
    { id: 11, color: '#5500FF', waypoints: [{ lat: 28.6139, lng: 77.209 }, { lat: 28.5273, lng: 77.0687 }, { lat: 28.7041, lng: 77.1025 }] },
    { id: 12, color: '#FFA500', waypoints: [{ lat: 28.7041, lng: 77.1025 }, { lat: 28.5355, lng: 77.391 }, { lat: 28.4595, lng: 77.0266 }] },
    { id: 13, color: '#FF4500', waypoints: [{ lat: 28.5273, lng: 77.0687 }, { lat: 28.4595, lng: 77.0266 }, { lat: 28.5976, lng: 77.2235 }] },
    { id: 14, color: '#FFD700', waypoints: [{ lat: 28.6139, lng: 77.209 }, { lat: 28.7041, lng: 77.1025 }, { lat: 28.5273, lng: 77.0687 }] },
    { id: 15, color: '#00CED1', waypoints: [{ lat: 28.7041, lng: 77.1025 }, { lat: 28.6139, lng: 77.209 }, { lat: 28.5976, lng: 77.2235 }] }
  ];

  const mockWaypoints = [
    { id: 1, name: "Connaught Place", lat: 28.6270, lng: 77.2170, passengers: 30, avgWaitTime: 5, imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "India Gate", lat: 28.6128, lng: 77.2295, passengers: 20, avgWaitTime: 3, imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Khan Market", lat: 28.6002, lng: 77.2274, passengers: 25, avgWaitTime: 4, imageUrl: "https://via.placeholder.com/150" },
    { id: 4, name: "Lajpat Nagar", lat: 28.5763, lng: 77.2397, passengers: 15, avgWaitTime: 6, imageUrl: "https://via.placeholder.com/150" },
    { id: 5, name: "Saket", lat: 28.5222, lng: 77.2090, passengers: 35, avgWaitTime: 4, imageUrl: "https://via.placeholder.com/150" },
    { id: 6, name: "Dwarka", lat: 28.6083, lng: 77.0369, passengers: 18, avgWaitTime: 5, imageUrl: "https://via.placeholder.com/150" },
    { id: 7, name: "Vasant Kunj", lat: 28.5403, lng: 77.1566, passengers: 28, avgWaitTime: 7, imageUrl: "https://via.placeholder.com/150" },
    { id: 8, name: "Janakpuri", lat: 28.6219, lng: 77.0891, passengers: 22, avgWaitTime: 6, imageUrl: "https://via.placeholder.com/150" },
    { id: 9, name: "Noida Sector 18", lat: 28.5708, lng: 77.3213, passengers: 40, avgWaitTime: 3, imageUrl: "https://via.placeholder.com/150" },
    { id: 10, name: "Gurgaon", lat: 28.4595, lng: 77.0266, passengers: 50, avgWaitTime: 8, imageUrl: "https://via.placeholder.com/150" }
  ];
  // Check for overlapping routes (basic detection based on proximity)
  const detectOverlapping = (routes) => {
    const overlaps = [];
    for (let i = 0; i < routes.length; i++) {
      for (let j = i + 1; j < routes.length; j++) {
        const overlap = routes[i].waypoints.some((pointA) =>
          routes[j].waypoints.some((pointB) =>
            Math.abs(pointA.lat - pointB.lat) < 0.001 && Math.abs(pointA.lng - pointB.lng) < 0.001
          )
        );
        if (overlap) {
          overlaps.push({ routeA: routes[i], routeB: routes[j] });
        }
      }
    }
    return overlaps;
  };

  const overlaps = detectOverlapping(busRoutes);

  return (
    <div className="p-6 space-y-8">
      {/* Map Section */}
      <h2 className="text-3xl font-bold border-b-2">Routes Dashboard with Overlap Detection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map Section */}
        <div className="h-[600px]">
          <GoogleMap
            center={center}
            zoom={10}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            {busRoutes.map(route => (
              <PolylineF
                key={route.id}
                path={route.waypoints}
                options={{
                  strokeColor: route.color,
                  strokeOpacity: 0.8,
                  strokeWeight: 2
                }}
              />
            ))}

            {mockWaypoints.map((waypoint) => (
              <MarkerF
                key={waypoint.id}
                position={{ lat: waypoint.lat, lng: waypoint.lng }}
                onClick={() => setSelectedWaypoint(waypoint)}
              />
            ))}

            {selectedWaypoint && (
              <InfoWindowF
                position={{ lat: selectedWaypoint.lat, lng: selectedWaypoint.lng }}
                onCloseClick={() => setSelectedWaypoint(null)}
              >
                <div>
                  <h3>{selectedWaypoint.name}</h3>
                  <img src={selectedWaypoint.imageUrl} alt={selectedWaypoint.name} style={{ width: '100px', height: 'auto' }} />
                  <p>Passengers: {selectedWaypoint.passengers}</p>
                  <p>Avg Wait Time: {selectedWaypoint.avgWaitTime} mins</p>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>

        {/* Route Data and Overlap Info Section */}
        <div className='h-[600px] overflow-y-scroll overflow-x-hidden'>
          <Card>
            <CardHeader>
              <CardTitle>Route Overlap Detection</CardTitle>
              <CardContent>
                {overlaps.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Route A ID</TableHead>
                        <TableHead>Route B ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overlaps.map((overlap, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{overlap.routeA.id}</TableCell>
                          <TableCell>{overlap.routeB.id}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No overlapping routes detected.</p>
                )}
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div >
  );
};

export default MapDashboard;

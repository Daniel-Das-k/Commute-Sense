import React from 'react';
import MapView from './Map';
import {
    InfoWindowF,
    MarkerF,
    PolylineF
} from '@react-google-maps/api';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from '@/components/ui/table'


const MapBus = ({ bus }) => {
    const [selectedWaypoint, setSelectedWaypoint] = React.useState(null);
    const [selectedRoute, setSelectedRoute] = React.useState(null);

    const center = {
        lat: 28.6139, // Center of Delhi
        lng: 77.209
    };

    // Updated bus routes with realistic Delhi routes
    const busRoutes = [
        {
            id: 1,
            name: "Green Line",
            color: "#008000",
            waypoints: [
                { id: 1, name: "Inderlok", lat: 28.6728, lng: 77.1700, passengers: 30, avgWaitTime: 5 },
                { id: 2, name: "Ashok Park Main", lat: 28.6697, lng: 77.1616, passengers: 25, avgWaitTime: 4 },
                { id: 3, name: "Punjabi Bagh", lat: 28.6619, lng: 77.1365, passengers: 35, avgWaitTime: 6 },
                { id: 4, name: "Shivaji Park", lat: 28.6558, lng: 77.1306, passengers: 20, avgWaitTime: 3 },
                { id: 5, name: "Madipur", lat: 28.6558, lng: 77.1182, passengers: 15, avgWaitTime: 4 },
            ]
        },
        {
            id: 2,
            name: "Blue Line",
            color: "#0000FF",
            waypoints: [
                { id: 6, name: "Rajiv Chowk", lat: 28.6328, lng: 77.2195, passengers: 50, avgWaitTime: 7 },
                { id: 7, name: "Mandi House", lat: 28.6257, lng: 77.2343, passengers: 40, avgWaitTime: 5 },
                { id: 8, name: "Barakhamba Road", lat: 28.6295, lng: 77.2273, passengers: 35, avgWaitTime: 4 },
                { id: 9, name: "Ramakrishna Ashram Marg", lat: 28.6392, lng: 77.2123, passengers: 30, avgWaitTime: 6 },
                { id: 10, name: "Jhandewalan", lat: 28.6447, lng: 77.2027, passengers: 25, avgWaitTime: 5 },
            ]
        },
        {
            id: 3,
            name: "Yellow Line",
            color: "#FFFF00",
            waypoints: [
                { id: 11, name: "Chandni Chowk", lat: 28.6580, lng: 77.2300, passengers: 45, avgWaitTime: 6 },
                { id: 12, name: "Chawri Bazar", lat: 28.6491, lng: 77.2260, passengers: 35, avgWaitTime: 5 },
                { id: 13, name: "New Delhi", lat: 28.6428, lng: 77.2206, passengers: 55, avgWaitTime: 8 },
                { id: 14, name: "Patel Chowk", lat: 28.6225, lng: 77.2117, passengers: 30, avgWaitTime: 4 },
                { id: 15, name: "Central Secretariat", lat: 28.6146, lng: 77.2118, passengers: 40, avgWaitTime: 7 },
            ]
        },
        {
            id: 4,
            name: "Route 340",
            color: "#FF0000",
            direction: "Connaught Place to Badarpur Border",
            waypoints: [
                { id: 1, name: "Connaught Place", lat: 28.6315, lng: 77.2167, passengers: 30, avgWaitTime: 5 },
                { id: 2, name: "Barakhamba Road", lat: 28.6292, lng: 77.2271, passengers: 25, avgWaitTime: 4 },
                { id: 3, name: "Mandi House", lat: 28.6256, lng: 77.2343, passengers: 35, avgWaitTime: 6 },
                { id: 4, name: "Pragati Maidan", lat: 28.6208, lng: 77.2400, passengers: 20, avgWaitTime: 3 },
                { id: 5, name: "ITO", lat: 28.6171, lng: 77.2496, passengers: 40, avgWaitTime: 7 },
                { id: 6, name: "Lajpat Nagar", lat: 28.5705, lng: 77.2376, passengers: 30, avgWaitTime: 5 },
                { id: 7, name: "Nehru Place", lat: 28.5491, lng: 77.2545, passengers: 35, avgWaitTime: 6 },
                { id: 8, name: "Badarpur Border", lat: 28.5030, lng: 77.3024, passengers: 15, avgWaitTime: 4 },
            ]
        },
        {
            id: 6,
            name: "Route 429",
            color: "#00FF00",
            direction: "Old Delhi to Mehrauli",
            waypoints: [
                { id: 9, name: "Old Delhi", lat: 28.6564, lng: 77.2408, passengers: 40, avgWaitTime: 6 },
                { id: 10, name: "Chandni Chowk", lat: 28.6506, lng: 77.2315, passengers: 45, avgWaitTime: 7 },
                { id: 11, name: "Delhi Gate", lat: 28.6406, lng: 77.2409, passengers: 30, avgWaitTime: 5 },
                { id: 12, name: "ITO", lat: 28.6171, lng: 77.2496, passengers: 35, avgWaitTime: 6 },
                { id: 13, name: "Ashram", lat: 28.5816, lng: 77.2599, passengers: 25, avgWaitTime: 4 },
                { id: 14, name: "Saket", lat: 28.5242, lng: 77.2154, passengers: 20, avgWaitTime: 3 },
                { id: 15, name: "Mehrauli", lat: 28.5182, lng: 77.1867, passengers: 15, avgWaitTime: 4 },
            ]
        },
        {
            id: 5,
            name: "Route 604",
            color: "#0000FF",
            direction: "Uttam Nagar to Vasant Vihar",
            waypoints: [
                { id: 16, name: "Uttam Nagar", lat: 28.6217, lng: 77.0587, passengers: 35, avgWaitTime: 6 },
                { id: 17, name: "Janakpuri", lat: 28.6289, lng: 77.0817, passengers: 30, avgWaitTime: 5 },
                { id: 18, name: "Rajouri Garden", lat: 28.6472, lng: 77.1187, passengers: 40, avgWaitTime: 7 },
                { id: 19, name: "Shadipur", lat: 28.6518, lng: 77.1563, passengers: 25, avgWaitTime: 4 },
                { id: 20, name: "Patel Nagar", lat: 28.6545, lng: 77.1714, passengers: 30, avgWaitTime: 5 },
                { id: 21, name: "Shankar Road", lat: 28.6427, lng: 77.1953, passengers: 20, avgWaitTime: 3 },
                { id: 22, name: "RK Puram", lat: 28.5687, lng: 77.1754, passengers: 35, avgWaitTime: 6 },
                { id: 23, name: "Vasant Vihar", lat: 28.5566, lng: 77.1568, passengers: 15, avgWaitTime: 4 },
            ]
        }
    ];

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-4xl font-bold">Delhi Metro Map</h1>

            <div className="pt-6 space-y-4">
                <h2 className="text-3xl font-bold border-b-2">Route Map & Waypoints</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Map Section */}
                    <div className="h-[600px]">
                        <MapView center={center} zoom={12}>
                            {busRoutes.map(route => (
                                <React.Fragment key={route.id}>
                                    <PolylineF
                                        path={route.waypoints.map(wp => ({ lat: wp.lat, lng: wp.lng }))}
                                        options={{
                                            strokeColor: route.color,
                                            strokeOpacity: 0.8,
                                            strokeWeight: 3,
                                        }}
                                    />
                                    {route.waypoints.map((waypoint) => (
                                        <MarkerF
                                            key={waypoint.id}
                                            position={{ lat: waypoint.lat, lng: waypoint.lng }}
                                            onClick={() => {
                                                setSelectedWaypoint(waypoint);
                                                setSelectedRoute(route);
                                            }}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}

                            {selectedWaypoint && (
                                <InfoWindowF
                                    position={{ lat: selectedWaypoint.lat, lng: selectedWaypoint.lng }}
                                    onCloseClick={() => setSelectedWaypoint(null)}
                                >
                                    <div className='text-black'>
                                        <h3 className="font-bold">{selectedWaypoint.name}</h3>
                                        <p>Line: {selectedRoute.name}</p>
                                        <p>Passengers: {selectedWaypoint.passengers}</p>
                                        <p>Avg Wait Time: {selectedWaypoint.avgWaitTime} mins</p>
                                    </div>
                                </InfoWindowF>
                            )}
                        </MapView>
                    </div>

                    {/* Waypoint Data Section */}
                    <div>
                        <Card className='h-[600px] overflow-y-scroll overflow-x-hidden'>
                            <CardHeader>
                                <CardTitle>Route Details</CardTitle>
                                <CardDescription>Passenger data and wait times for all routes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Line</TableHead>
                                            <TableHead>Stop Name</TableHead>
                                            <TableHead>Passengers</TableHead>
                                            <TableHead>Avg Wait Time (mins)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody >
                                        {busRoutes.flatMap((route) =>
                                            route.waypoints.map((waypoint) => (
                                                <TableRow key={waypoint.id}>
                                                    <TableCell>{route.name}</TableCell>
                                                    <TableCell>{waypoint.name}</TableCell>
                                                    <TableCell>{waypoint.passengers}</TableCell>
                                                    <TableCell>{waypoint.avgWaitTime}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapBus;
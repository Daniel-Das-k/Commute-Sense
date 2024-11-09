import { useState } from 'react'
import { Clock, Bus, MapPin, User, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkerF, PolylineF } from '@react-google-maps/api'
import MapView from '@/components/map/Map'

// Mock data for the route
const routeData = {
  id: "R002",
  name: "Delhi City Connector",
  status: "On Time",
  busNumber: "D-456",
  driver: "Ravi Sharma",
  startTime: "07:30 AM",
  endTime: "09:30 AM",
  date: "2023-09-25",
  waypoints: [
    {
      id: 1,
      name: "Kashmere Gate",
      lat: 28.6692,
      lon: 77.2285,
      time: "07:30 AM",
      status: "Completed",
      description: "Major interchange point with metro connectivity."
    },
    {
      id: 2,
      name: "Red Fort",
      lat: 28.6562,
      lon: 77.2410,
      time: "07:45 AM",
      status: "Completed",
      description: "Historic fort and UNESCO World Heritage site."
    },
    {
      id: 3,
      name: "India Gate",
      lat: 28.6129,
      lon: 77.2295,
      time: "08:00 AM",
      status: "In Progress",
      description: "War memorial dedicated to Indian soldiers."
    },
    {
      id: 4,
      name: "Connaught Place",
      lat: 28.6315,
      lon: 77.2167,
      time: "08:15 AM",
      status: "Upcoming",
      description: "Popular shopping and business district."
    },
    {
      id: 5,
      name: "Jantar Mantar",
      lat: 28.6345,
      lon: 77.2195,
      time: "08:25 AM",
      status: "Upcoming",
      description: "An astronomical observatory with impressive instruments."
    },
    {
      id: 6,
      name: "AIIMS",
      lat: 28.5687,
      lon: 77.2100,
      time: "09:00 AM",
      status: "Upcoming",
      description: "All India Institute of Medical Sciences, a premier hospital."
    },
    {
      id: 7,
      name: "Saket",
      lat: 28.5245,
      lon: 77.2066,
      time: "09:15 AM",
      status: "Upcoming",
      description: "Residential and commercial area with shopping malls."
    },
    {
      id: 8,
      name: "Chhatarpur",
      lat: 28.5144,
      lon: 77.1787,
      time: "09:30 AM",
      status: "Upcoming",
      description: "Home to historical temples and cultural sites."
    },
    {
      id: 9,
      name: "Mehrauli",
      lat: 28.5256,
      lon: 77.1864,
      time: "09:45 AM",
      status: "Upcoming",
      description: "Area with rich historical significance and heritage."
    }
  ],
  passengers: [
    {
      id: 1,
      name: "Sunita Verma",
      pickup: "Kashmere Gate",
      dropoff: "Red Fort",
      contact: "+91 98765 43210",
      age: 29,
      ticketId: "TK-001"
    },
    {
      id: 2,
      name: "Rohit Singh",
      pickup: "Red Fort",
      dropoff: "Connaught Place",
      contact: "+91 87654 32109",
      age: 34,
      ticketId: "TK-002"
    },
    {
      id: 3,
      name: "Neha Kapoor",
      pickup: "India Gate",
      dropoff: "Saket",
      contact: "+91 76543 21098",
      age: 25,
      ticketId: "TK-003"
    },
    {
      id: 4,
      name: "Ajay Mehta",
      pickup: "Connaught Place",
      dropoff: "AIIMS",
      contact: "+91 65432 10987",
      age: 40,
      ticketId: "TK-004"
    },
    {
      id: 5,
      name: "Priya Sharma",
      pickup: "AIIMS",
      dropoff: "Saket",
      contact: "+91 54321 09876",
      age: 31,
      ticketId: "TK-005"
    },
    {
      id: 6,
      name: "Deepak Kumar",
      pickup: "Saket",
      dropoff: "Chhatarpur",
      contact: "+91 43210 98765",
      age: 28,
      ticketId: "TK-006"
    },
    {
      id: 7,
      name: "Anjali Reddy",
      pickup: "Chhatarpur",
      dropoff: "Mehrauli",
      contact: "+91 32109 87654",
      age: 23,
      ticketId: "TK-007"
    }
  ],
  totalPassengers: 7,
  routeDistance: "18.5 km",
  estimatedTravelTime: "1 hour 15 minutes",
  busCapacity: 40,
  remainingSeats: 33,
  feedback: [
    { passengerId: 1, comment: "Smooth ride, very punctual!", rating: 5 },
    { passengerId: 2, comment: "Comfortable seating but a bit crowded.", rating: 4 },
    { passengerId: 3, comment: "Great service, will use again!", rating: 5 },
    { passengerId: 4, comment: "Bus was on time, but it could use better air conditioning.", rating: 3 },
    { passengerId: 5, comment: "Overall good experience.", rating: 4 },
    { passengerId: 6, comment: "Nice route, but please maintain cleanliness.", rating: 4 },
    { passengerId: 7, comment: "The driver was very polite and helpful.", rating: 5 },
  ]
};
// Google Maps container style
const mapContainerStyle = {
  height: '500px',
  width: '100%'
}


export default function RouteDetails() {
  const [activeTab, setActiveTab] = useState("map")

  // Loading the Google Maps script

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-500'
      case 'in progress': return 'bg-blue-500'
      case 'upcoming': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const routePath = routeData.waypoints.map(wp => ({ lat: wp.lat, lng: wp.lon }))

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Route Details: {routeData.name}</h1>
        <Badge variant="outline" className="text-lg">{routeData.status}</Badge>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Route Information</CardTitle>
          <CardDescription>Key details about the current route</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center space-x-2">
            <Bus className="h-4 w-4 text-muted-foreground" />
            <span>Bus: {routeData.busNumber}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Driver: {routeData.driver}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{routeData.startTime} - {routeData.endTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{routeData.date}</span>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="passengers">Passengers</TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
              <CardDescription>Visual representation of the route and stops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full">

                <MapView
                  mapContainerStyle={mapContainerStyle}
                  zoom={12}
                >
                  {routeData.waypoints.map((waypoint) => (
                    <MarkerF
                      key={waypoint.id}
                      position={{ lat: waypoint.lat, lng: waypoint.lon }}
                      label={waypoint.name}
                    />
                  ))}
                  <PolylineF path={routePath} options={{ strokeColor: "#0000FF" }} />
                </MapView>

              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Waypoints and Stops</CardTitle>
              <CardDescription>Detailed list of all stops on this route</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stop Name</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routeData.waypoints.map((waypoint) => (
                    <TableRow key={waypoint.id}>
                      <TableCell className="font-medium">{waypoint.name}</TableCell>
                      <TableCell>{waypoint.time}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(waypoint.status)}>
                          {waypoint.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passengers">
          <Card>
            <CardHeader>
              <CardTitle>Passenger Information</CardTitle>
              <CardDescription>List of passengers and their stop details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Passenger Name</TableHead>
                    <TableHead>Pickup Location</TableHead>
                    <TableHead>Dropoff Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routeData.passengers.map((passenger) => (
                    <TableRow key={passenger.id}>
                      <TableCell className="font-medium">{passenger.name}</TableCell>
                      <TableCell>{passenger.pickup}</TableCell>
                      <TableCell>{passenger.dropoff}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Edit Route</Button>
        <Button>Start Route</Button>
      </div>
    </div>
  )
}
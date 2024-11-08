import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bus, Clock, MapPin, Users } from "lucide-react"

export default function BusSchedulingDashboard() {
  const routes = [
    {
      id: 1,
      name: "Route 1 - Connaught Place to Dwarka",
      stops: 8,
      duration: "1h 30m",
      distance: "25 km",
      vehicle: "Bus 1",
      driver: "Amit Kumar",
      startTime: "7:00 AM",
      endTime: "8:30 AM",
      schedule: [
        { time: "7:00", stop: "Connaught Place" },
        { time: "7:15", stop: "Janpath" },
        { time: "7:30", stop: "RK Ashram Marg" },
        { time: "7:45", stop: "Naraina Vihar" },
        { time: "8:00", stop: "Dhaula Kuan" },
        { time: "8:10", stop: "Palam" },
        { time: "8:20", stop: "Dwarka Sector 9" },
        { time: "8:30", stop: "Dwarka Sector 21" },
      ],
    },
    {
      id: 2,
      name: "Route 2 - ISBT Kashmiri Gate to Nehru Place",
      stops: 10,
      duration: "2h 00m",
      distance: "30 km",
      vehicle: "Bus 2",
      driver: "Suresh Yadav",
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      schedule: [
        { time: "9:00", stop: "ISBT Kashmiri Gate" },
        { time: "9:10", stop: "Red Fort" },
        { time: "9:25", stop: "Chandni Chowk" },
        { time: "9:35", stop: "I.T.O" },
        { time: "9:45", stop: "India Gate" },
        { time: "10:00", stop: "Lodhi Road" },
        { time: "10:15", stop: "Khan Market" },
        { time: "10:30", stop: "AIIMS" },
        { time: "10:45", stop: "Moolchand" },
        { time: "11:00", stop: "Nehru Place" },
      ],
    },
    {
      id: 3,
      name: "Route 3 - Karol Bagh to Saket",
      stops: 7,
      duration: "1h 20m",
      distance: "18 km",
      vehicle: "Bus 3",
      driver: "Anil Verma",
      startTime: "6:30 AM",
      endTime: "7:50 AM",
      schedule: [
        { time: "6:30", stop: "Karol Bagh" },
        { time: "6:45", stop: "Patel Nagar" },
        { time: "7:00", stop: "Rajender Nagar" },
        { time: "7:10", stop: "Lajpat Nagar" },
        { time: "7:20", stop: "Kailash Colony" },
        { time: "7:35", stop: "Malviya Nagar" },
        { time: "7:50", stop: "Saket" },
      ],
    },
    {
      id: 4,
      name: "Route 4 - Shalimar Bagh to Vasant Kunj",
      stops: 9,
      duration: "2h 15m",
      distance: "32 km",
      vehicle: "Bus 4",
      driver: "Rakesh Sharma",
      startTime: "8:00 AM",
      endTime: "10:15 AM",
      schedule: [
        { time: "8:00", stop: "Shalimar Bagh" },
        { time: "8:15", stop: "Pitampura" },
        { time: "8:30", stop: "Rohini Sector 3" },
        { time: "8:45", stop: "Rani Bagh" },
        { time: "9:00", stop: "Punjabi Bagh" },
        { time: "9:20", stop: "Rajouri Garden" },
        { time: "9:40", stop: "Safdarjung Enclave" },
        { time: "10:00", stop: "Vasant Vihar" },
        { time: "10:15", stop: "Vasant Kunj" },
      ],
    },
    {
      id: 5,
      name: "Route 5 - Inderlok to Badarpur",
      stops: 10,
      duration: "2h 30m",
      distance: "35 km",
      vehicle: "Bus 5",
      driver: "Manoj Singh",
      startTime: "6:00 AM",
      endTime: "8:30 AM",
      schedule: [
        { time: "6:00", stop: "Inderlok" },
        { time: "6:15", stop: "Shastri Nagar" },
        { time: "6:30", stop: "Jhandewalan" },
        { time: "6:50", stop: "Rajiv Chowk" },
        { time: "7:10", stop: "Mandi House" },
        { time: "7:25", stop: "Khan Market" },
        { time: "7:45", stop: "AIIMS" },
        { time: "8:00", stop: "Hauz Khas" },
        { time: "8:15", stop: "Kalkaji" },
        { time: "8:30", stop: "Badarpur" },
      ],
    },
  ]

  const colors = [
    "bg-pink-200 dark:bg-pink-700",
    "bg-blue-200 dark:bg-blue-700",
    "bg-yellow-200 dark:bg-yellow-700",
    "bg-green-200 dark:bg-green-700",
    "bg-purple-200 dark:bg-purple-700",
    "bg-orange-200 dark:bg-orange-700",
  ]


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Route Layers</h2>
        <div className="space-y-2">
          {["Route", "Stops", "Time Windows", "Vehicle Capacity"].map((layer) => (
            <div key={layer} className="flex items-center">
              <Checkbox id={layer} />
              <label htmlFor={layer} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                {layer}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bus Scheduling Dashboard</h1>
          <Button>Optimize</Button>
        </div>

        {routes.map((route) => (
          <Card key={route.id} className="mb-6 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">{route.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2 mb-4">
                {route.schedule.map((stop, index) => (
                  <div key={index} className={`p-2 rounded ${colors[index % colors.length]}`}>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {`${route.id}-${String.fromCharCode(65 + index)}`}
                    </div>
                    <div className="text-xs text-gray-700 dark:text-gray-300">{stop.time}</div>
                    <div className="text-xs text-gray-700 dark:text-gray-300">{stop.stop}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-80 bg-white dark:bg-gray-800 p-4 border-l dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Route Details</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {routes.map((route) => (
            <Card key={route.id} className="mb-4 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{route.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Stops: {route.stops}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Duration: {route.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Distance: {route.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Bus className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Vehicle: {route.vehicle}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Driver: {route.driver}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">
                      Time: {route.startTime} - {route.endTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
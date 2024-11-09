import React from 'react'
import { Bus, MapPin, Clock, Battery, Layers, ChevronDown, MoreVertical, AlertTriangle, Users, Fuel, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"

const BusCard = ({ bus }) => {
  const navigate = useNavigate()
  return (
    <Card className="cursor-pointer" onClick={() => {
      navigate('66d2d3a46bc363e6241b6c63')
    }}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">Bus {bus.id}</span>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={`font-semibold ${bus.status === 'On Route' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
              {bus.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Route:</span>
            <span>{bus.route}</span>
          </div>
          <div className="flex justify-between">
            <span>Driver:</span>
            <span>{bus.driver}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Fuel:</span>
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-1" />
              <Progress value={bus.fuel} className="w-20" />
            </div>
          </div>
          <div className="flex justify-between">
            <span>Next Stop:</span>
            <span>{bus.nextStop}</span>
          </div>
          <div className="flex justify-between">
            <span>ETA:</span>
            <span>{bus.eta}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BusFleetDashboard() {
  const buses = [
    { id: 1001, status: 'On Route', route: 'Route 1', driver: 'John Doe', fuel: 75, nextStop: 'Central Station', eta: '10:30 AM' },
    { id: 1002, status: 'On Route', route: 'Route 2', driver: 'Jane Smith', fuel: 60, nextStop: 'Main Street', eta: '10:45 AM' },
    { id: 1003, status: 'In Maintenance', route: 'N/A', driver: 'N/A', fuel: 100, nextStop: 'N/A', eta: 'N/A' },
    { id: 1004, status: 'On Route', route: 'Route 3', driver: 'Bob Johnson', fuel: 85, nextStop: 'Park Avenue', eta: '11:00 AM' },
    { id: 1005, status: 'On Route', route: 'Route 1', driver: 'Alice Brown', fuel: 50, nextStop: 'River Road', eta: '11:15 AM' },
    { id: 1006, status: 'On Route', route: 'Route 2', driver: 'Charlie Wilson', fuel: 70, nextStop: 'Hill Street', eta: '11:30 AM' },
  ]

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-1/4 p-4 border-r border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Fleet Overview</h2>
          <Button variant="outline" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-4">
            {[
              { label: 'Total Buses', value: 50 },
              { label: 'Active Buses', value: 42 },
              { label: 'On Route', value: 36 },
              { label: 'In Maintenance', value: 3 },
              { label: 'Idle', value: 3 },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <span>{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                  <Progress value={(item.value / 50) * 100} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Bus className="h-4 w-4 mr-2" />
              Buses
            </Button>
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              Routes
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Drivers
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="on-route">On Route</SelectItem>
                <SelectItem value="maintenance">In Maintenance</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buses.map((bus) => (
              <BusCard key={bus.id} bus={bus} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-1/4 p-4 border-l border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Alerts</h2>
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-4">
            {[
              { type: 'Delay', message: 'Bus 1002 is running 15 minutes late on Route 2' },
              { type: 'Maintenance', message: 'Bus 1003 requires immediate maintenance check' },
              { type: 'Route Change', message: 'Route 3 diverted due to road work on Main Street' },
              { type: 'Weather', message: 'Heavy rain expected, prepare for potential delays' },
              { type: 'Overcrowding', message: 'Bus 1005 reporting overcrowding on Route 1' },
            ].map((alert, index) => (
              <Card key={index} className="cursor-pointer">
                <CardContent className="p-3 flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{alert.type}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alert.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className='flex flex-col space-y-4 h-[calc(100vh-150px)]'>
      <div className='h-full w-full relative'>
        <BusFleetDashboard />
        {/* <MapBuses /> */}
      </div>
    </div>
  )
}

export default Dashboard
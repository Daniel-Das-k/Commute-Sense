import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Bus, Users, Clock, Search, ArrowUpDown } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MapView from '@/components/map/Map'

// Mock data for stops
const stopsData = [
    { id: 1, name: "Central Station", type: "Transit Hub", dailyPassengers: 5000, avgWaitTime: 5, lat: 40.7128, lon: -74.0060 },
    { id: 2, name: "Main Street", type: "Bus Stop", dailyPassengers: 1200, avgWaitTime: 8, lat: 40.7282, lon: -73.9942 },
    { id: 3, name: "Park Avenue", type: "Bus Stop", dailyPassengers: 800, avgWaitTime: 10, lat: 40.7489, lon: -73.9680 },
    { id: 4, name: "Business District", type: "Transit Hub", dailyPassengers: 3000, avgWaitTime: 6, lat: 40.7831, lon: -73.9712 },
    { id: 5, name: "North End Terminal", type: "Transit Hub", dailyPassengers: 2500, avgWaitTime: 7, lat: 40.8075, lon: -73.9465 },
]

// Mock data for stop usage over time
const stopUsageData = [
    { hour: '6AM', passengers: 200 },
    { hour: '8AM', passengers: 800 },
    { hour: '10AM', passengers: 600 },
    { hour: '12PM', passengers: 400 },
    { hour: '2PM', passengers: 500 },
    { hour: '4PM', passengers: 700 },
    { hour: '6PM', passengers: 900 },
    { hour: '8PM', passengers: 300 },
]

export default function AllStopsDashboard() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortColumn, setSortColumn] = useState("name")
    const [sortDirection, setSortDirection] = useState("asc")

    const filteredStops = stopsData.filter(stop =>
        stop.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const sortedStops = [...filteredStops].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    return (
        <div className=" mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">All Stops Dashboard</h1>


            <Card>
                <CardHeader>
                    <CardTitle>All Stops</CardTitle>
                    <CardDescription>Detailed list of all stops in the system</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                placeholder="Search stops..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>
                        <Select onValueChange={(value) => handleSort(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="type">Type</SelectItem>
                                <SelectItem value="dailyPassengers">Daily Passengers</SelectItem>
                                <SelectItem value="avgWaitTime">Avg. Wait Time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    <Button variant="ghost" onClick={() => handleSort("name")}>
                                        Name {sortColumn === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" onClick={() => handleSort("type")}>
                                        Type {sortColumn === "type" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                                    </Button>
                                </TableHead>
                                <TableHead className="text-right">
                                    <Button variant="ghost" onClick={() => handleSort("dailyPassengers")}>
                                        Daily Passengers {sortColumn === "dailyPassengers" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                                    </Button>
                                </TableHead>
                                <TableHead className="text-right">
                                    <Button variant="ghost" onClick={() => handleSort("avgWaitTime")}>
                                        Avg. Wait Time {sortColumn === "avgWaitTime" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                                    </Button>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedStops.map((stop) => (
                                <TableRow key={stop.id}>
                                    <TableCell className="font-medium">{stop.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{stop.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{stop.dailyPassengers.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">{stop.avgWaitTime} min</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
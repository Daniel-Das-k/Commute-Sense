import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for drivers
const driversData = [
  { id: 1, name: "John Doe", status: "Active", currentShift: "Morning", lastActive: "2023-06-15 08:30", completedTrips: 1250, rating: 4.8 },
  { id: 2, name: "Jane Smith", status: "Inactive", currentShift: "N/A", lastActive: "2023-06-14 17:45", completedTrips: 980, rating: 4.6 },
  { id: 3, name: "Mike Johnson", status: "On Break", currentShift: "Afternoon", lastActive: "2023-06-15 13:15", completedTrips: 1500, rating: 4.9 },
  { id: 4, name: "Emily Brown", status: "Active", currentShift: "Evening", lastActive: "2023-06-15 19:00", completedTrips: 750, rating: 4.7 },
  { id: 5, name: "Chris Wilson", status: "Inactive", currentShift: "N/A", lastActive: "2023-06-13 22:30", completedTrips: 1100, rating: 4.5 },
  { id: 6, name: "Sarah Davis", status: "Active", currentShift: "Night", lastActive: "2023-06-15 23:45", completedTrips: 890, rating: 4.8 },
  { id: 7, name: "Tom Anderson", status: "On Leave", currentShift: "N/A", lastActive: "2023-06-10 15:20", completedTrips: 2000, rating: 4.9 },
  { id: 8, name: "Lisa Taylor", status: "Active", currentShift: "Morning", lastActive: "2023-06-15 07:50", completedTrips: 1300, rating: 4.7 },
  { id: 9, name: "Mark Robinson", status: "Active", currentShift: "Afternoon", lastActive: "2023-06-15 14:30", completedTrips: 950, rating: 4.6 },
  { id: 10, name: "Amy White", status: "Inactive", currentShift: "N/A", lastActive: "2023-06-14 20:15", completedTrips: 800, rating: 4.5 },
]



export default function DriversTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortKey, setSortKey] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [driversPerPage] = useState(5)

  const filteredDrivers = driversData.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.currentShift.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const indexOfLastDriver = currentPage * driversPerPage
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage
  const currentDrivers = sortedDrivers.slice(indexOfFirstDriver, indexOfLastDriver)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-red-500'
      case 'on break': return 'bg-yellow-500'
      case 'on leave': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All Drivers</CardTitle>
        <CardDescription>Comprehensive list of all drivers and their current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Select onValueChange={(value) => setDriversPerPage(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Drivers per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('name')}>
                  Name
                  {sortKey === 'name' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('status')}>
                  Status
                  {sortKey === 'status' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('currentShift')}>
                  Current Shift
                  {sortKey === 'currentShift' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('lastActive')}>
                  Last Active
                  {sortKey === 'lastActive' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('completedTrips')}>
                  Completed Trips
                  {sortKey === 'completedTrips' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('rating')}>
                  Rating
                  {sortKey === 'rating' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDrivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">{driver.name}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                </TableCell>
                <TableCell>{driver.currentShift}</TableCell>
                <TableCell>{driver.lastActive}</TableCell>
                <TableCell>{driver.completedTrips}</TableCell>
                <TableCell>{driver.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <div>
            Showing {indexOfFirstDriver + 1} to {Math.min(indexOfLastDriver, sortedDrivers.length)} of {sortedDrivers.length} drivers
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastDriver >= sortedDrivers.length}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
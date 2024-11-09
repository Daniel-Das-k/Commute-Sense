import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MapPin, TrendingDown, TrendingUp, Clock, Repeat, Maximize2 } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import MapRoutes from '@/components/map/MapRoutes'

// Mock data for charts
const routeOptimizationData = [
  { name: 'Mon', before: 100, after: 80 },
  { name: 'Tue', before: 120, after: 90 },
  { name: 'Wed', before: 110, after: 85 },
  { name: 'Thu', before: 130, after: 95 },
  { name: 'Fri', before: 140, after: 100 },
  { name: 'Sat', before: 90, after: 75 },
  { name: 'Sun', before: 80, after: 70 },
]

const overlapData = [
  { name: 'Route A', overlap: 30 },
  { name: 'Route B', overlap: 45 },
  { name: 'Route C', overlap: 20 },
  { name: 'Route D', overlap: 55 },
  { name: 'Route E', overlap: 15 },
]

export default function Dashboard() {
  return (
    <div className="py-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Route Optimization Dashboard</h1>

      {/* Map placeholder */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
        </CardHeader>
        <MapRoutes />
      </Card>

      {/* Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance Saved</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 km</div>
            <p className="text-xs text-muted-foreground">-15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Increase</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 hours</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Route Overlaps Reduced</CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">-8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Route Optimization Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Route Optimization Impact</CardTitle>
          <CardDescription>Comparison of route distances before and after optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routeOptimizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="before" fill="#8884d8" name="Before Optimization" />
                <Bar dataKey="after" fill="#82ca9d" name="After Optimization" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Route Overlap Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Route Overlap Analysis</CardTitle>
            <CardDescription>Percentage of overlap between routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overlapData.map((route) => (
                <div key={route.name} className="flex items-center">
                  <div className="w-24 flex-shrink-0">{route.name}</div>
                  <div className="flex-grow">
                    <Progress value={route.overlap} className="h-2" />
                  </div>
                  <div className="w-12 text-right">{route.overlap}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Metrics</CardTitle>
            <CardDescription>Key performance indicators for route optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Route Compression</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overlap Reduction</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Time Efficiency</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Fuel Savings</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
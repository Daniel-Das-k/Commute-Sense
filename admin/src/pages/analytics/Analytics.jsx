import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { LineChart, Line } from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'
import { MapPin, Bus, Clock, Users, TrendingUp, Zap, AlertTriangle, ThumbsUp } from 'lucide-react'
import MapView from '@/components/map/Map'

// Enhanced mock data
const kpiData = [
  { title: "Total Buses", value: "3,500", icon: <Bus className="h-5 w-5 text-indigo-600" />, change: "+2.5%" },
  { title: "Active Routes", value: "657", icon: <MapPin className="h-5 w-5 text-blue-600" />, change: "+5" },
  { title: "Daily Ridership", value: "3.5M", icon: <Users className="h-5 w-5 text-green-600" />, change: "+4.2%" },
  { title: "On-Time Performance", value: "87%", icon: <Clock className="h-5 w-5 text-yellow-600" />, change: "+1.5%" },
  { title: "Fuel Efficiency", value: "5.2 km/L", icon: <Zap className="h-5 w-5 text-purple-600" />, change: "+0.3 km/L" },
  { title: "Maintenance Issues", value: "42", icon: <AlertTriangle className="h-5 w-5 text-red-600" />, change: "-15%" },
  { title: "Customer Satisfaction", value: "4.2/5", icon: <ThumbsUp className="h-5 w-5 text-pink-600" />, change: "+0.3" },
  { title: "Revenue", value: "₹15.2M", icon: <TrendingUp className="h-5 w-5 text-orange-600" />, change: "+7.8%" },
]

const routeEfficiencyData = [
  { name: 'Route 1', efficiency: 92, ridership: 15000 },
  { name: 'Route 2', efficiency: 88, ridership: 12500 },
  { name: 'Route 3', efficiency: 95, ridership: 18000 },
  { name: 'Route 4', efficiency: 85, ridership: 13800 },
  { name: 'Route 5', efficiency: 91, ridership: 16500 },
]

const ridershipTrendData = [
  { month: 'Jan', passengers: 3200000, forecast: 3180000 },
  { month: 'Feb', passengers: 3300000, forecast: 3250000 },
  { month: 'Mar', passengers: 3400000, forecast: 3320000 },
  { month: 'Apr', passengers: 3500000, forecast: 3450000 },
  { month: 'May', passengers: 3600000, forecast: 3550000 },
  { month: 'Jun', passengers: 3550000, forecast: 3600000 },
]

const fuelEfficiencyData = [
  { name: 'Efficient', value: 65 },
  { name: 'Moderate', value: 25 },
  { name: 'Inefficient', value: 10 },
]

const routeDetailsData = [
  { id: 1, name: 'Route 1', buses: 45, avgRidership: '15,000', efficiency: '92%', satisfaction: '4.3/5' },
  { id: 2, name: 'Route 2', buses: 38, avgRidership: '12,500', efficiency: '88%', satisfaction: '4.1/5' },
  { id: 3, name: 'Route 3', buses: 52, avgRidership: '18,000', efficiency: '95%', satisfaction: '4.5/5' },
  { id: 4, name: 'Route 4', buses: 41, avgRidership: '13,800', efficiency: '85%', satisfaction: '3.9/5' },
  { id: 5, name: 'Route 5', buses: 49, avgRidership: '16,500', efficiency: '91%', satisfaction: '4.2/5' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function EnhancedAnalyticsPage() {
  return (
    <div className="mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">DTC Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((item, index) => (
          <Card key={index} className="hover:shadow-xl shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.value}</div>
              <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {item.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Route Efficiency vs Ridership</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Comparing efficiency scores with average daily ridership</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={routeEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="efficiency" fill="#8884d8" name="Efficiency (%)" />
                <Bar yAxisId="right" dataKey="ridership" fill="#82ca9d" name="Avg. Daily Ridership" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Ridership Trend and Forecast</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Monthly passengers with next month forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ridershipTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="passengers" stroke="#8884d8" name="Actual Passengers" />
                <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Fuel Efficiency Distribution</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Percentage of buses in each efficiency category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fuelEfficiencyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {fuelEfficiencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Route Performance Overview</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Key metrics for top-performing routes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 dark:text-gray-100">Route</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Buses</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Avg. Ridership</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Efficiency</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Satisfaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routeDetailsData.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{route.name}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{route.buses}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{route.avgRidership}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{route.efficiency}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{route.satisfaction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Route Map Overview</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Interactive map of all active bus routes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <MapView />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

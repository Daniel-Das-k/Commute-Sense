import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const driverStats = {
    totalDrivers: 250,
    activeDrivers: 180,
    onShift: 120,
    offShift: 60,
    linkedSchedules: 150,
    unlinkedSchedules: 30,
}

const shiftDistribution = [
    { name: 'Morning', value: 40 },
    { name: 'Afternoon', value: 30 },
    { name: 'Evening', value: 20 },
    { name: 'Night', value: 10 },
]

const weeklyDriverActivity = [
    { day: 'Mon', active: 160, inactive: 20 },
    { day: 'Tue', active: 170, inactive: 10 },
    { day: 'Wed', active: 180, inactive: 0 },
    { day: 'Thu', active: 175, inactive: 5 },
    { day: 'Fri', active: 190, inactive: 10 },
    { day: 'Sat', active: 140, inactive: 40 },
    { day: 'Sun', active: 130, inactive: 50 },
]

const monthlyPerformance = [
    { month: 'Jan', onTime: 95, lateArrivals: 5 },
    { month: 'Feb', onTime: 93, lateArrivals: 7 },
    { month: 'Mar', onTime: 97, lateArrivals: 3 },
    { month: 'Apr', onTime: 94, lateArrivals: 6 },
    { month: 'May', onTime: 96, lateArrivals: 4 },
    { month: 'Jun', onTime: 98, lateArrivals: 2 },
]

const schedulingEfficiency = [
    { month: 'Jan', linked: 80, unlinked: 20 },
    { month: 'Feb', linked: 85, unlinked: 15 },
    { month: 'Mar', linked: 90, unlinked: 10 },
    { month: 'Apr', linked: 88, unlinked: 12 },
    { month: 'May', linked: 92, unlinked: 8 },
    { month: 'Jun', linked: 95, unlinked: 5 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function DriverDashboard() {
    const [timeRange, setTimeRange] = useState("7days")

    return (
        <div className="mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Driver Dashboard</h1>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                        <SelectItem value="90days">Last 90 Days</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{driverStats.totalDrivers}</div>
                        <p className="text-xs text-muted-foreground">
                            {driverStats.activeDrivers} active, {driverStats.totalDrivers - driverStats.activeDrivers} inactive
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Shifts</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{driverStats.onShift}</div>
                        <p className="text-xs text-muted-foreground">
                            {driverStats.offShift} off shift
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Linked Schedules</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{driverStats.linkedSchedules}</div>
                        <p className="text-xs text-muted-foreground">
                            {driverStats.unlinkedSchedules} unlinked schedules
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. On-Time Performance</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">95.5%</div>
                        <p className="text-xs text-muted-foreground">
                            +2.5% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="activity" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="activity">Driver Activity</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                </TabsList>
                <TabsContent value="activity" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Weekly Driver Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={weeklyDriverActivity}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="active" fill="#8884d8" name="Active Drivers" />
                                        <Bar dataKey="inactive" fill="#82ca9d" name="Inactive Drivers" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Shift Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={shiftDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {shiftDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="performance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="onTime" stroke="#8884d8" name="On-Time Arrivals" />
                                    <Line type="monotone" dataKey="lateArrivals" stroke="#82ca9d" name="Late Arrivals" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="scheduling" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scheduling Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={schedulingEfficiency}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="linked" fill="#8884d8" name="Linked Schedules" />
                                    <Bar dataKey="unlinked" fill="#82ca9d" name="Unlinked Schedules" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
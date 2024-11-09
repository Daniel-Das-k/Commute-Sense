import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardOverview from '@/components/global/OverviewCard';
import { BsBusFront, BsFillFuelPumpDieselFill, BsSpeedometer2 } from 'react-icons/bs';
import { TbBusStop, TbRoute } from 'react-icons/tb';
import { FaTruck, FaUserFriends } from "react-icons/fa";
import Status from '@/components/global/ActiveStatus';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from '@/components/global/Loader';
import { getBus } from '@/store/reducer/BusReducer';
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import MapBus from '@/components/map/MapBus';

const mockBus = {
    make: 'Volvo',
    model: 'B11R',
    fuelType: 'Diesel',
    status: true,
    seat: 45,
    tracker: {
        fuelLevel: 60,
        engineTemp: '90°C',
        coolantTemp: '80°C',
        transmissionTemp: '85°C',
        co2emission: '0.18 g/km',
        engineStatus: true,
        engineRpm: 1500,
        torque: '450 Nm',
        batteryLevel: '75%',
        batteryVoltage: '12.6 V',
    },
    fuelEfficiency: 8.5, // km/L
    totalDistance: 150000, // km
    nextMaintenance: '2023-12-15',
    maintenanceHistory: [
        { date: '2023-06-01', type: 'Oil Change', cost: 150 },
        { date: '2023-03-15', type: 'Brake Service', cost: 300 },
        { date: '2022-12-20', type: 'Tire Rotation', cost: 100 },
    ],
    routePerformance: {
        onTimePercentage: 92,
        averageDelay: 5, // minutes
        mostDelayedStop: 'West Square',
    },
    passengerAnalytics: {
        averageOccupancy: 75, // percentage
        peakHours: ['08:00', '17:30'],
        totalPassengersToday: 450,
    },
    fuelEfficiencyData: [
        { date: '2023-01', efficiency: 8.2 },
        { date: '2023-02', efficiency: 8.3 },
        { date: '2023-03', efficiency: 8.5 },
        { date: '2023-04', efficiency: 8.4 },
        { date: '2023-05', efficiency: 8.6 },
        { date: '2023-06', efficiency: 8.5 },
    ],
    routePerformanceData: [
        { date: '2023-01', onTime: 90, delay: 6 },
        { date: '2023-02', onTime: 91, delay: 5 },
        { date: '2023-03', onTime: 89, delay: 7 },
        { date: '2023-04', onTime: 92, delay: 5 },
        { date: '2023-05', onTime: 93, delay: 4 },
        { date: '2023-06', onTime: 92, delay: 5 },
    ],
    passengerOccupancyData: [
        { time: '06:00', occupancy: 30 },
        { time: '09:00', occupancy: 80 },
        { time: '12:00', occupancy: 60 },
        { time: '15:00', occupancy: 70 },
        { time: '18:00', occupancy: 90 },
        { time: '21:00', occupancy: 40 },
    ],
};

const EnhancedBusDashboard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const bus = mockBus;

    useEffect(() => {
        dispatch(getBus(id));
    }, [id, dispatch]);

    if (!bus) {
        return <Loader />;
    }

    return (
        <div className="w-full h-full pb-5 space-y-8">
            {/* Map Section */}
            <div className="space-y-5">
                <div className="h-full w-full relative">
                    <MapBus />
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <CardOverview title="Bus" description="Bus Make" value={bus.make} Icon={<BsBusFront />} />
                    <CardOverview title="Name" description="Bus Model" value={bus.model} Icon={<BsBusFront />} />
                    <CardOverview title="Fuel" description="Fuel Type" value={bus.fuelType} Icon={<BsFillFuelPumpDieselFill />} />
                    <CardOverview title="Status" description="Current Status" value={<Status active={bus.status} size={9} />} Icon={<TbBusStop size={20} />} />
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CardOverview title="Tracker ID" description="Bus Tracker ID" value="TRK123456" Icon={<BsBusFront />} />
                    <CardOverview title="Fuel Level" description="Fuel Level (%)" value={`${bus.tracker.fuelLevel}%`} />
                    <CardOverview title="Seats" description="Total Seats" value={bus.seat} />
                </div>
            </div>

            {/* Vehicle Stats Section */}
            <div className="pt-6 space-y-6">
                <h2 className="text-3xl font-bold border-b-2">Vehicle Stats</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <CardOverview title="HorsePower" description="HorsePower" value="230 HP" Icon={<FaTruck size={20} color="grey" />} />
                    <CardOverview title="Engine Capacity" description="Engine Capacity (L)" value="6.7 L" />
                    <CardOverview title="Engine Age" description="Lifespan of Engine" value="5 Years" />
                    <CardOverview title="Emission Standard" description="Compliance" value="BS VI" />
                </div>

                <h3 className="text-xl font-semibold">Vehicle Raw Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <CardOverview title="Engine Temp" description="Engine Temperature" value={bus.tracker.engineTemp} />
                    <CardOverview title="Coolant Temp" description="Coolant Temperature" value={bus.tracker.coolantTemp} />
                    <CardOverview title="Transmission Temp" description="Transmission Temperature" value={bus.tracker.transmissionTemp} />
                    <CardOverview title="Emission" description="Carbon Emission" value={bus.tracker.co2emission} />
                </div>

                {/* Advanced Engine Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <CardOverview title="Engine Status" description="Current Engine Status" value={bus.tracker.engineStatus ? 'ON' : 'OFF'} Icon={<FaTruck size={20} color="grey" />} />
                    <CardOverview title="Engine RPM" description="RPM" value={bus.tracker.engineRpm} />
                    <CardOverview title="Torque" description="Torque (Nm)" value={bus.tracker.torque} />
                    <CardOverview title="Battery Level" description="Battery Level" value={bus.tracker.batteryLevel} />
                    <CardOverview title="Voltage" description="Battery Voltage" value={bus.tracker.batteryVoltage} />
                </div>
            </div>

            {/* Fuel Efficiency Section */}
            <div className="pt-6 space-y-4">
                <h2 className="text-3xl font-bold border-b-2">Fuel Efficiency</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Fuel Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{bus.fuelEfficiency} km/L</div>
                            <Progress value={bus.fuelEfficiency * 10} className="mt-2" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Fuel Efficiency Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={bus.fuelEfficiencyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="efficiency" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Maintenance Section */}
            <div className="pt-6 space-y-4">
                <h2 className="text-3xl font-bold border-b-2">Maintenance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Next Maintenance</CardTitle>
                            <CardDescription>Upcoming Maintenance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{bus.nextMaintenance}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance History</CardTitle>
                            <CardDescription>Recent Maintenance Records</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Cost ($)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bus.maintenanceHistory.map((entry, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{entry.date}</TableCell>
                                            <TableCell>{entry.type}</TableCell>
                                            <TableCell>{entry.cost}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Route Performance Section */}
            <div className="pt-6 space-y-4">
                <h2 className="text-3xl font-bold border-b-2">Route Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>On-Time Percentage</CardTitle>
                            <CardDescription>Overall Performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{bus.routePerformance.onTimePercentage}%</div>
                            <Progress value={bus.routePerformance.onTimePercentage} className="mt-2" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Delay</CardTitle>
                            <CardDescription>Delays per Route</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{bus.routePerformance.averageDelay} minutes</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Most Delayed Stop</CardTitle>
                            <CardDescription>Top Delay Spot</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{bus.routePerformance.mostDelayedStop}</div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Route Performance Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={bus.routePerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="onTime" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="delay" stroke="#ff7300" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Passenger Analytics Section (Placeholder) */}
            <div className="pt-6 space-y-4">
                <h2 className="text-3xl font-bold border-b-2">Passenger Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Occupancy</CardTitle>
                            <CardDescription>Seat Utilization</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{bus.passengerAnalytics.averageOccupancy}%</div>
                            <Progress value={bus.passengerAnalytics.averageOccupancy} className="mt-2" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Peak Hours</CardTitle>
                            <CardDescription>Passenger Rush Times</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{bus.passengerAnalytics.peakHours.join(' & ')}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Passengers Today</CardTitle>
                            <CardDescription>Real-Time Stats</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{bus.passengerAnalytics.totalPassengersToday}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EnhancedBusDashboard;

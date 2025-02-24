import React, { useEffect } from 'react';
import Header from '@/components/global/Header';
import Sidebar from '@/components/global/sidebar/index';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllBus } from '@/store/reducer/BusReducer';
import { getAllStops } from '@/store/reducer/StopReducer';

import Driver from './driver/Index'
import Dashboard from './Dashboard';
import Bus from './bus/Index'
import RouteScreen from './route/Index'
import Stop from './stop/Index'
import { getAllDriver } from '@/store/reducer/DriverStore';
import { getAllRoute } from '@/store/reducer/RouteReducer';
import BusSchedulingDashboard from './sheduling/Sheduling';
import AnalyticsPage from './analytics/Analytics';
import { Train } from 'lucide-react';
import Chatbot from './Chatbot';
import Scheduling from './Schedule';


const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getAllBus())
       dispatch(getAllDriver())
       dispatch(getAllStops())
       dispatch(getAllRoute())
    }, [])

    return (
        <div className='flex flex-row'>
            <Sidebar />
            <div className='flex flex-col w-full h-full'>
                <Header />
                <div className='mx-4'>
                    <Routes>
                        <Route element={<Dashboard />} path='/' />
                        <Route element={<Bus />} path='/bus/*' />
                        <Route element={<Chatbot />} path='/chatbot/*' />
                        <Route element={<Scheduling />} path='/scheduling/*' />
                        <Route element={<Stop/>} path="/stop/*"/>
                        {/* <Route element={<Notification />} path='/notification/*' /> */}
                        <Route element={<Driver/>} path="/driver/*"/>
                        <Route element={<BusSchedulingDashboard/>} path="/sheduling/*"/>
                        <Route element={<AnalyticsPage/>} path="/analytics/*"/>
                        <Route element={<RouteScreen/>} path='/route/*'/>
                    </Routes>
                </div>
            </div>
        </div >
    )
}

export default Main
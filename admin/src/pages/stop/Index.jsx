import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import StopHeader from '../../components/global/headers/StopHeader'
import Create from './Create'
import AllStops from './AllStop'

const Index = () => {
  return (
    <div className='w-full h-full mt-4'>
        <StopHeader/>
         <div>
         <Routes>
            <Route element={<Dashboard/>} path='/'/>
            <Route element={<Create/>} path='/create'/>
            <Route element={<AllStops/>} path='/all'/>
        </Routes>
         </div>
    </div>
  )
}

export default Index
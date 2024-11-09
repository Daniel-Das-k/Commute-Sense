import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import AllBus from './AllBus'
import New from './New'
import BusHeader from '@/components/global/BusHeader'
import Bus from './Bus'

const Index = () => {
  return (
    <div className='w-full h-full mt-4'>
         <BusHeader/>
         <div>
         <Routes>
            <Route element={<Dashboard/>} path='/'/>
            <Route element={<AllBus/>} path='/all'/>
            <Route element={<New/>} path='/create'/>
            <Route element={<Bus/>} path='/:id'/>
        </Routes>
         </div>
    </div>
  )
}

export default Index
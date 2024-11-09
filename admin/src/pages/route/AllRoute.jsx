import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, BusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AllRoute = () => {
  const navigate = useNavigate()
  const routes = useSelector((state) => state.Route.routes)

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>All Routes</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {routes.map((route) => (
          <Card key={route.id} className='overflow-hidden cursor-pointer' onClick={() => {
            navigate(`/route/${route.id}`)
          }}>
            <CardHeader className='bg-primary text-primary-foreground'>
              <CardTitle className='flex justify-between items-center'>
                <span>{route.routeName}</span>
                <Badge variant="secondary">{route.routeSet}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='mt-4'>
              <div className='flex items-center mb-2'>
                <BusIcon className='mr-2 h-5 w-5 text-muted-foreground' />
                <span className='font-medium'>Route Number: {route.routeNumber}</span>
              </div>
              <div className='mt-4'>
                <h3 className='font-semibold mb-2'>Stops:</h3>
                <ul className='space-y-2'>
                  {route.stops.map((stop, index) => {
                    return (
                      <li key={stop} className='flex items-center'>
                        <MapPinIcon className='mr-2 h-4 w-4 text-muted-foreground' />
                        <span>Stop {index + 1}: {stop.name}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              {route.stops_distance_time && route.stops_distance_time.length > 0 && (
                <div className='mt-4'>
                  <p className='text-sm text-muted-foreground'>
                    Total Distance: {route.stops_distance_time[0].distance} meters
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Estimated Duration: {Math.floor(route.stops_distance_time[0].duration / 60)} minutes
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AllRoute
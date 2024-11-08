import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from '../ui/use-toast'
import { createRoute } from '@/store/reducer/RouteReducer'
import { Button } from '../ui/button'
import Loader from '../global/Loader'
import MapStop from '../map/MapStopPicker'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

const RouteForm = () => {
    const {loading} = useSelector((state) => state.Route)
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [selectedStop, setSelectedStop] = useState([])

    const FormSchema = z.object({
        routeName: z.string().min(2, {
          message: "Route name must be at least 2 characters.",
        }),
        routeNumber: z.number(),
        routeSet: z.string().min(1, {
          message: "Route set must be at least 1 characters."
        })
      })
    
      const form = useForm(
        {
          resolver: zodResolver(FormSchema),
          defaultValues: {
           routeName: '',
           routeNumber: 0,
           routeSet: 'a'
          }
        }
      )

      const onSubmit = async (data) => {
        if (selectedStop.stops && selectedStop.stops.length >= 2) {
          const body = {
            ...data,
            stops: selectedStop.stops.map((stop) => stop.id),
            stops_polyline: selectedStop.poly_decode,
            stops_distance_time: selectedStop.distanceAndDuration
          }
       
          dispatch(createRoute(body)).then((state) => {
            if (!state.error) {
              toast({
                title: "Successfully Created",
                description: "Created a new route",
                variant: 'default'
              })
            } else {
              toast({
                title: "error",
                description: "could not create a route.please try again later",
                variant: 'destructive'
              })
            }
            form.reset()
            setSelectedStop(null)
          })
        } else {
          toast({
            title: "Stops Required",
            description: "please select two or more stops",
            variant: 'destructive'
          })
        }
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
        <FormField
          control={form.control}
          name="routeName"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Route Name</FormLabel>
              <FormControl>
                <Input placeholder="Route Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="RouteNumber"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Route Number</FormLabel>
              <FormControl>
                <Input placeholder="Number" {...field} type='string' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="RouteSet"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Route Set</FormLabel>
              <FormControl>
                <Input placeholder="Route Set" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-4'>
          <h3 className='text-xl font-bold'>Stops</h3>
          <MapStop setSelectedStop={setSelectedStop} selectedStop={selectedStop} />
        </div>
        {
          loading ? <Loader /> : <Button type="submit" className='w-3/6'>Create</Button>
        }
      </form>
    </Form>
  )
}

export default RouteForm
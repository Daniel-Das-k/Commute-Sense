import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Combobox } from "../global/ComboBox"
import { createBus } from '@/store/reducer/BusReducer'
// import MapStop from '@/components/Maps/MapStopPicker'
import { useToast } from "@/components/ui/use-toast"
import Loader from '../global/Loader'

const BusForm = ({ update }) => {
  const dispatch = useDispatch()
    const loading = useSelector((state) => state.Bus.loading)

    const drivers = []
  const { toast } = useToast()

  const FormSchema = z.object({
    make: z.string().min(2, {
      message: "Bus make must be at least 2 characters.",
    }),
    model: z.string().min(2, {
      message: "Bus model must be at least 2 characters.",
    }),
    registerNumber:  z.string().min(3, {
      message: "Bus Registered Number must be at least 2 characters.",
    }),
    seats: z.number().default(0),
    status: z.boolean().default(false).optional(),
    ac: z.boolean().default(false).optional(),
    trackerId: z.string(),
    driver: z.string()
  })

  const form = useForm(
    {
      resolver: zodResolver(FormSchema),
      defaultValues: {
        make: '',
        model: '',
        registerNumber: '',
        seats: 0,
        status: false,
        ac: false,
        driver: null,
        trackerId: ''
      }
    }
  )

  const driversFiltered = drivers.filter((driver) => !driver.busId)
  const driversModified = driversFiltered.map((drivers) => ({ label: drivers.name, value: drivers.id }))

  const onSubmit = async (data) => {
      const body = {
        ...data,
      }
      
      dispatch(createBus(body)).then((state) => {
        if (!state.error) {
          toast({
            title: "Successfully Created",
            description: "Created a new bus",
            variant: 'default'
          })
        } else {
          toast({
            title: "error",
            description: "Could not create a bus, please try again later.",
            variant: 'destructive'
          })
        }
        form.reset()
      })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Bus Make</FormLabel>
              <FormControl>
                <Input placeholder="Bus Make" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Bus Model</FormLabel>
              <FormControl>
                <Input placeholder="Bus Model" {...field} type='string' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registerNumber"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Bus Register Number</FormLabel>
              <FormControl>
                <Input placeholder="Bus Registered Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className='space-y-4'>
          <h3 className='text-xl font-bold'>Stops</h3>
          <MapStop setSelectedStop={setSelectedStop} selectedStop={selectedStop} />
        </div> */}
        <FormField
          control={form.control}
          name="seats"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Total seats</FormLabel>
              <FormControl>
                <Input placeholder="Total number of seats" onChange={event => field.onChange(event.target.valueAsNumber)} value={field.value} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ac"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>AC Bus</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="airplane-mode">AC</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="airplane-mode">Active</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-4'>
          <FormDescription>Enter the GPS ID associated with the iot module</FormDescription>
          <FormField
            control={form.control}
            name="trackerId"
            render={({ field }) => (
              <FormItem className='w-3/6'>
                <FormLabel>Tracker ID</FormLabel>
                <FormControl>
                  <Input placeholder="Tracker ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription>Driver can also be added later</FormDescription>
        {drivers && (
          <FormField
            control={form.control}
            name="driver"
            render={({ field }) => (
              <FormItem className="space-x-4">
                <FormLabel>Drivers</FormLabel>
                <FormControl>
                  <Combobox list={driversModified} title='drivers' onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {
          loading ? <Loader /> : <Button type="submit" className='w-3/6'>Create</Button>
        }
      </form>
    </Form>
  )
}

export default BusForm
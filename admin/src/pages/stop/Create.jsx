import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import MapMarker from '../../components/map/MapAddress';
import { useToast } from "@/components/ui/use-toast";
import { createStop } from '@/store/reducer/StopReducer';
import { useDispatch } from 'react-redux';

const Create = () => {
  const { toast } = useToast();
  const dispatch = useDispatch(); 
  const [coords, setCoord] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState({ address: '', placeId: '' });

  const FormSchema = z.object({
    name: z.string().min(2, 'Character count should be greater than 2'),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data) => {
    const { lat, lng } = coords;
    const body = {
      address: address.address,
      location: {
        type: 'Point',
        coordinate: [lng, lat],
      },
      name: data.name,
    };

    if (address.address.length > 3) {
      dispatch(createStop(body))
        .then((state) => {
          if (!state.error) {
            toast({
              title: "Successfully Created",
              description: "Created a new Stop",
              variant: 'default',
            });
            form.reset();
            setAddress({ address: '', placeId: '' }); // Reset address
            setCoord({ lat: 0, lng: 0 }); // Reset coordinates
          } else {
            throw new Error('Failed to create stop');
          }
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: `An error occurred: ${error.message}`,
            variant: 'destructive',
          });
        });
    }
  };

  return (
    <div className='flex flex-col gap-y-4 mb-10'>
      <h1 className='text-3xl font-bold'>New Stops</h1>
      <div className='h-[600px] w-full'>
        <MapMarker setAddress={setAddress} getCoord={setCoord} />
      </div>
      <div className='flex flex-row space-x-6'>
        <p>{coords.lat}</p>
        <p>{coords.lng}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-2/6">
          <div>
            <FormLabel>Stop address</FormLabel>
            <Textarea 
              placeholder="Address" 
              onChange={(e) => setAddress({ ...address, address: e.target.value })} 
              value={address.address} 
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stop Name</FormLabel>
                <FormControl>
                  <Input placeholder="Stop name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};

export default Create;

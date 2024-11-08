import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createDriver } from '@/store/reducer/DriverStore';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';

const Create = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  // const { loading } = useSelector((state) => state.Driver);
  const [image, setImage] = useState(null);

  const FormSchema = z.object({
    name: z.string().min(3, 'Required minimum of 3 characters'),
    phoneNumber: z.number(),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      phoneNumber: 0,
    },
  });

  const onSubmit = (data) => {
    if (data && image) {
      const body = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        image,
      };

      dispatch(createDriver(body)).then((state) => {
        if (!state.error) {
          toast({
            title: 'Successfully Created',
            description: 'Created a new Driver',
            variant: 'default',
          });
          form.reset();
          setImage(null);
        }
      });
    }
  };

  const onFileChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="font-bold text-2xl">Create Driver</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-3/6">
                <FormLabel>Driver Name</FormLabel>
                <FormControl>
                  <Input placeholder="Driver name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-3/6">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Driver number"
                    {...field}
                    onChange={(event) => field.onChange(event.target.valueAsNumber)}
                    value={field.value}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-1/6">
            <FormLabel>Image</FormLabel>
            <Input placeholder="Image" onChange={onFileChange} type="file" />
          </div>
          <Button type="submit" className="w-3/6">Create</Button>
        </form>
      </Form>
    </div>
  );
};

export default Create;

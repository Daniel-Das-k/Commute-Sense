import React from 'react'
import AlertDialog from '@/components/global/AlertDialogue'
import { deleteBus } from '@/store/reducer/BusReducer'
import store from '@/store/store'
import {Link} from 'react-router-dom'
import { deleteStop } from '../store/reducer/StopReducer'; 
import { deleteDriver } from '@/store/reducer/DriverStore';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export const busColumns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "make",
    header: 'Vehicle Make'
  },
  {
    accessorKey: "model",
    header: 'Vehicle Model'
  },
  {
    accessorKey: "registerNumber",
    header: "Vehicle Register Number",
  },
    {
      accessorKey: "seats",
      header: "Total Seats",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const id = row.getValue('id');
        return (
          <div className='flex space-x-4 items-center'>
            <Link to={`/bus/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>View</Link>
            <Link to={`/bus/update/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>Update</Link>
            <AlertDialog content='The following will be permanently deleted' onClick={async () => {
              store.dispatch(deleteBus(id))
            }}>
              Delete
            </AlertDialog>
          </div>
        )
      }
    }
  ]

export const stopColumn = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Stop',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'busId',
    header: 'No of buses',
    cell: ({ row }) => {
      const busId = row.getValue('busId');

      return <p>{busId.length}</p>;
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const id = row.getValue('id');

      return (
        <div className='flex space-x-4'>
          <AlertDialog
            content='The following will be permanently deleted'
            onClick={async () => {
              store.dispatch(deleteStop(id));
            }}
          >
            Delete
          </AlertDialog>
        </div>
      );
    },
  },
];


export const driverColumns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const img = row.getValue('image');

      return (
        <Avatar>
          <AvatarImage src={img.url} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )
    }
  },

  {
    accessorKey: "name",
    header: "Name",

  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "busId",
    header: "Bus ID",
  },
  {
    accessorKey: 'bus',
    header: "Bus",
    cell: ({ row }) => {
      const busId = row.getValue('busId')
      const { buses } = store.getState().Bus
      const bus = buses.find((bus) => bus.id === busId)
      if (bus) {
        return (
          <div>
            <p>{bus?.busNumber} / {bus?.busSet}</p>
            <p>{bus?.busName}</p>
          </div>
        )
      } else {
        return (
          <div>
            <p>no bus</p>
          </div>

        )
      }
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const id = row.getValue('id');

      return (
        <div className='flex space-x-4'>
          <AlertDialog content='The following will be permanently deleted' onClick={async () => {
            store.dispatch(deleteDriver(id))
          }}>
            Delete
          </AlertDialog>
        </div>
      )
    }
  }
]
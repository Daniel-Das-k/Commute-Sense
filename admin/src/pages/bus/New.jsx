import BusForm from '@/components/form/BusForm'
import React from 'react'

const New = () => {
  return <div className='pb-6 space-y-2'>
    <h3 className='text-4xl font-semibold pb-4 border-b-2 border-muted'>Create Bus</h3>
    <BusForm/>
  </div>
}

export default New
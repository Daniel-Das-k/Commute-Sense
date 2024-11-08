import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavigationLink from "../NavigationLink";

const BusHeader = () => {
  return (
    <div className="w-full flex justify-center mb-4">
   <Tabs defaultValue="account" className="w-[300px]">
  <TabsList>
    <TabsTrigger value="dashboard">
        <NavigationLink href={'/stop'}>
            Overview
        </NavigationLink>
    </TabsTrigger>
    <TabsTrigger value="all">
    <NavigationLink href={'/stop/all'}>
            All
        </NavigationLink>
    </TabsTrigger>
    <TabsTrigger value="create">
    <NavigationLink href={'/stop/create'}>
            Create
        </NavigationLink>
    </TabsTrigger>
  </TabsList>
</Tabs>
</div>
  )
}

export default BusHeader
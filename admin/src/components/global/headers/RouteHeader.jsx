import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavigationLink from "../NavigationLink";

const RouteHeader = () => {
  return (
    <div className="w-full flex justify-center mb-4">
   <Tabs defaultValue="account" className="w-[300px]">
  <TabsList>
  <TabsTrigger value="overview">
    <NavigationLink href={'/route'}>
            Overview
        </NavigationLink>
    </TabsTrigger>
    <TabsTrigger value="all">
    <NavigationLink href={'/route/all'}>
            All
        </NavigationLink>
    </TabsTrigger>
    
    <TabsTrigger value="create">
    <NavigationLink href={'/route/create'}>
            Create
        </NavigationLink>
    </TabsTrigger>
  </TabsList>
</Tabs>
</div>
  )
}

export default RouteHeader
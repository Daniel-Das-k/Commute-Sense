import { Link } from "react-router-dom"
import {
  BusIcon,
  Home,
  LineChart,
  Package,
  Package2,
  StopCircle,
  ShoppingCart,
  Users,
} from "lucide-react"
import NavigationLink from "../NavigationLink"
import { FaDirections } from "react-icons/fa"

function Sidebar() {

  return (
    <div className="flex min-h-screen w-[290px] relative">
      <div className="fixed inset-y-0 left-0 w-[240px] z-10 border-r bg-muted/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavigationLink href="" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">UNFAZED</span>
            </NavigationLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavigationLink
                isActiveClass='bg-muted'
                href="/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </NavigationLink>
              <NavigationLink
                isActiveClass='bg-muted'
                href="/bus"
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                <BusIcon className="h-4 w-4" />
                Bus
              </NavigationLink>
              <NavigationLink
                isActiveClass='bg-muted'
                href="/route"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <FaDirections className="h-4 w-4" />
                Routes
              </NavigationLink>
              <NavigationLink
                isActiveClass='bg-muted'
                href="/stop"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <StopCircle className="h-4 w-4" />
                Stops
              </NavigationLink>
              <NavigationLink
                isActiveClass='bg-muted'
                href="/driver"
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Drivers
              </NavigationLink>
              <NavigationLink
                isActiveClass='bg-muted'
                href="/sheduling"
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Sheduling
              </NavigationLink>
              {/* <NavigationLink
                isActiveClass='bg-muted'
                href="/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </NavigationLink> */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Sidebar
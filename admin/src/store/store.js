import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducer/UserReducer'
import BusReducer from './reducer/BusReducer'
import StopReducer from './reducer/StopReducer'
import DriverStore from './reducer/DriverStore'
import RouteReducer from './reducer/RouteReducer'

export default configureStore({
    reducer: {
        User: UserReducer,
        Bus: BusReducer,
        Stop: StopReducer,
        Driver: DriverStore,
        Route: RouteReducer
    }
})
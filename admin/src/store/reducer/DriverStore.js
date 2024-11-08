import api from '@/api/axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createDriver = createAsyncThunk('driver/createDriver', async (body,thunkAPI) => {
    try {
        const res = await api.post('/driver', body)
        const data = await res.data;
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err})
    }
})

export const getAllDriver =  createAsyncThunk('driver/getAllDriver', async (thunkAPI) => {
    try {
        const res = await api.get('/driver')
        const data = await res.data;
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err})
    }
})

export const deleteDriver = createAsyncThunk('driver/deleteDriver',  async (id,thunkAPI) => {
    try {
         await api.delete(`/driver/${id}`);
        return id;
    } catch (err) {
        if (err)
        return thunkAPI.rejectWithValue({ error: err });
      }
})


const initialState= {
    drivers: [],
    loading: false,
    error: null
  }
  

const driverReducer = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        setDrivers: (state, action) => {
            state.drivers = action.payload
        },
        updateDriver: (state, action) => { 
            const idx = state.drivers.findIndex((driver) => driver.id === action.payload.id)
           state.drivers[idx] = action.payload
        }
    },
    extraReducers: (builder) => {   
        builder.addCase(createDriver.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(createDriver.fulfilled, (state, action) => {
            state.drivers.push(action.payload)
            state.loading = false
        })
        builder.addCase(createDriver.rejected, (state, action) => {
            // state.error = action.payload.error
            state.loading = false
        })
        builder.addCase(deleteDriver.fulfilled, (state, action) => {
            
            state.drivers = state.drivers.filter(
                (driver) => driver.id !== action.payload
              );
           } )
           builder.addCase(getAllDriver.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(getAllDriver.fulfilled, (state, action) => {
            state.drivers= action.payload
            state.loading = false
        })
        builder.addCase(getAllDriver.rejected, (state, action) => {
            // state.error = action.payload.error
            state.loading = false
        })
    }
})

export const {setDrivers, updateDriver} = driverReducer.actions
export default driverReducer.reducer
import api from '@/api/axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createBus = createAsyncThunk('bus/createBus', async (body, thunkAPI) => {
    try {
        const res = await api.post("/bus", body);
        const data = await res.data;
        return data;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})

export const getAllBus = createAsyncThunk('bus/getAllBus', async(thunkAPI) => {
    try {
        const res = await api.get('/bus')
        const data = await res.data
        return data
    }catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });

    }
})

export const getBus = createAsyncThunk('bus/getBus', async(id, thunkAPI) => {
    try {
        const res = await api.get(`/bus/${id}`)
        const data = await res.data
        return data
    }catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})

export const deleteBus = createAsyncThunk('bus/deleteBus', async (id, thunkAPI) => {
    try {
        await api.delete(`/bus/${id}`);
        return id;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})


const initialState= {
    buses: [],
    bus: null,
    loading: false,
    error: null
}


const busReducer = createSlice({
    name: 'bus',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createBus.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(createBus.fulfilled, (state, action) => {
            state.buses.push(action.payload)
            state.loading = false
        })
        builder.addCase(createBus.rejected, (state, action) => {
            state.error = action.payload.error
            state.loading = false
        })
        builder.addCase(deleteBus.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteBus.fulfilled, (state, action) => {
            state.buses = state.buses.filter(
                (bus) => bus.id !== action.payload
            );
            state.loading = false
        })
        builder.addCase(deleteBus.rejected, (state, action) => {
            state.error = action.payload.error
            state.loading = false
        })
        builder.addCase(getAllBus.fulfilled, (state, action) => {
            state.buses = action.payload
            state.loading = false
        })
        builder.addCase(getAllBus.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllBus.rejected, (state, action) => {
            state.error = action.payload.error
            state.loading = false
        })
        builder.addCase(getBus.fulfilled, (state, action) => {
            state.bus = action.payload
            state.loading = false
        })
        builder.addCase(getBus.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getBus.rejected, (state, action) => {
            state.error = action.payload.error
            state.loading = false
        })
    }
})

export default busReducer.reducer
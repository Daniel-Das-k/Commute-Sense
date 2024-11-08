import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@/api/axios'

export const createStop = createAsyncThunk('stop/createStop', async (body, thunkAPI) => {
    try {
        const res = await api.post("/stop", body);
        const data = await res.data;
        return data;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})

export const getAllStops = createAsyncThunk('stop/getAllStop', async(thunkAPI) => {
    try {
        const res = await api.get("/stop");
        const data = await res.data;
        return data;
    }catch(err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})


export const deleteStop = createAsyncThunk('stop/deleteStop', async (id, thunkAPI) => {
    try {
        await api.delete(`/stop/${id}`);
        return id;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})

const initialState = {
    stops: [],
    loading: false
}

const stopReducer = createSlice({
    name: 'stop',
    initialState,
    reducers: {
        setStops: (state, action) => {
            state.stops = action.payload
        },
        updateStop: (state, action) => {
            const idx = state.stops.findIndex((stop) => stop.id === action.payload.id)
            state.stops[idx] = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteStop.fulfilled, (state, action) => {
            state.stops = state.stops.filter((stop) => stop.id !== action.payload)
        })
        builder.addCase(deleteStop.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(deleteStop.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(createStop.fulfilled, (state, action) => {
            state.loading = false
            state.stops.push(action.payload)
        })
        builder.addCase(createStop.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(createStop.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getAllStops.fulfilled, (state, action) => {
            state.loading = false
            state.stops = action.payload
        })
        builder.addCase(getAllStops.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(getAllStops.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { setStops, updateStop } = stopReducer.actions

export default stopReducer.reducer
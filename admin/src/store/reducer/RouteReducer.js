import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@/api/axios'

export const createRoute = createAsyncThunk('route/createRoute', async (body, thunkAPI) => {
    try {
        const res = await api.post("/route", body);
        const data = await res.data;
        return data;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})

export const getAllRoute =  createAsyncThunk('route/getAllRoute', async (thunkAPI) => {
    try {
        const res = await api.get("/route");
        const data = await res.data;
        return data;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})


export const deleteRoute = createAsyncThunk('route/deleteRoute', async (id, thunkAPI) => {
    try {
        await api.delete(`/stop/${id}`);
        return id;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})

const initialState = {
    route: null,
    routes: [],
    loading: false
}

const stopReducer = createSlice({
    name: 'stop',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(deleteRoute.fulfilled, (state, action) => {
            state.routes = state.stops.filter((stop) => stop.id !== action.payload)
        })
        builder.addCase(deleteRoute.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(deleteRoute.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(createRoute.fulfilled, (state, action) => {
            state.loading = false
            state.routes.push(action.payload)
        })
        builder.addCase(createRoute.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(createRoute.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getAllRoute.fulfilled, (state, action) => {
            state.loading = false
            state.routes = action.payload
        })
        builder.addCase(getAllRoute.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(getAllRoute.rejected, (state, action) => {
            state.loading = false
        })
        // builder.addCase(deleteRoute.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.stops = action.payload
        // })
        // builder.addCase(deleteRoute.pending, (state,action) => {
        //     state.loading = true
        // })
        // builder.addCase(deleteRoute.rejected, (state, action) => {
        //     state.loading = false
        // })
    }
})

export const { setStops, updateStop } = stopReducer.actions

export default stopReducer.reducer
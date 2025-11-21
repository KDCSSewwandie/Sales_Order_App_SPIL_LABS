// clientsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchClients = createAsyncThunk('clients/fetch', async () => {
    const res = await api.get('/clients');
    return res.data;
});

const clientsSlice = createSlice({
    name: 'clients',
    initialState: { items: [], status: 'idle' },
    extraReducers: (builder) => {
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'succeeded';
        });
    }
});

export default clientsSlice.reducer;

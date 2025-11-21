// itemsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchItems = createAsyncThunk('items/fetch', async () => {
    const res = await api.get('/items');
    return res.data;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: { items: [], status: 'idle' },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'succeeded';
        });
    }
});

export default itemsSlice.reducer;

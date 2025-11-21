// ordersSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
    const res = await api.get('/orders');
    return res.data;
});

export const createOrder = createAsyncThunk('orders/create', async (payload) => {
    const res = await api.post('/orders', payload);
    return res.data;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: { list: [], status: 'idle' },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.list.push(action.payload);
        });
    }
});

export default ordersSlice.reducer;

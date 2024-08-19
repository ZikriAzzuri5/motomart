import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ORDERS_URL = "http://localhost:3000/api/orders";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order) => {
    const response = await axios.post(ORDERS_URL, order);
    return response.data;
  }
);

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(ORDERS_URL);

  return response.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const responce = await axios.post(
      "http://localhost:4000/api/shop/order/create",
      orderData
    );
    return responce.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: shoppingOrderSlice,
  initialState,
  reducer: {},
  extraReducers: (builder) => {

    builder.addCase(createNewOrder.pending, (state)=>{
        state.isLoading = true
    }).addCase(createNewOrder.fulfilled, (state, action)=>{
    state.isLoading = false
    state.approvalURL = action.payload.approvalURL
    state.orderId = action.payload.orderId
  }).addCase(createNewOrder.rejected, (state, action)=>
    state.isLoading = false,
    state.approvalURL = null,
    state.orderId = null
)},
});

export default shoppingOrderSlice.reducer;

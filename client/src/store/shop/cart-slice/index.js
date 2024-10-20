import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:4000/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response?.data;
  }
);
export const fetchCartItem = createAsyncThunk(
  "/cart/fetchCartItem",
  async ({ userId }) => {
    const response = await axios.get(
      `http://localhost:4000/api/shop/cart/add/get/${userId}`,
      {
        userId,
      }
    );
    return response?.data;
  }
);
export const updateCartItemQty = createAsyncThunk(
  "/cart/updateCartItemQty",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:4000/api/shop/cart/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response?.data;
  }
);
export const deleteCartItem = createAsyncThunk(
  "/cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:4000/api/shop/cart/${userId}/${productId}`
    );
    return response?.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    }).addCase(addToCart.fulfilled, (state)=>{
        state.isLoading = false,
        state.cartItems = action.payload.data
    }).addCase(addToCart.rejected, (state)=>{
        state.isLoading = false,
        state.cartItems = []
    }).addCase(fetchCartItem.pending, (state) => {
        state.isLoading = true;
      }).addCase(fetchCartItem.fulfilled, (state)=>{
          state.isLoading = false,
          state.cartItems = action.payload.data
      }).addCase(fetchCartItem.rejected, (state)=>{
          state.isLoading = false,
          state.cartItems = []
      }).addCase(updateCartItemQty.pending, (state) => {
        state.isLoading = true;
      }).addCase(updateCartItemQty.fulfilled, (state)=>{
          state.isLoading = false,
          state.cartItems = action.payload.data
      }).addCase(updateCartItemQty.rejected, (state)=>{
          state.isLoading = false,
          state.cartItems = []
      }).addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      }).addCase(deleteCartItem.fulfilled, (state)=>{
          state.isLoading = false,
          state.cartItems = action.payload.data
      }).addCase(deleteCartItem.rejected, (state)=>{
          state.isLoading = false,
          state.cartItems = []
      })
  },
});

export default shoppingCartSlice.reducer;

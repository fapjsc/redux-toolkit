import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCartData(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      const existsItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if (!existsItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existsItem.quantity++;
        existsItem.totalPrice = existsItem.totalPrice + newItem.price;
      }
    },

    removeItemFromCart(state, action) {
      const removeItemId = action.payload;
      const existsItem = state.items.find(item => item.id === removeItemId);
      state.totalQuantity--;
      if (existsItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== removeItemId);
      } else {
        existsItem.quantity--;
        existsItem.totalPrice = existsItem.totalPrice - existsItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

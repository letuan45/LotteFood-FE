import { createSlice } from "@reduxjs/toolkit";

const innitialCart = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: innitialCart,
  reducers: {
    //Cart replacement
    replaceCart(state, action) {
      state.items = action.payload;
    },

    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },

    //Add to cart an item, if item already exists, plus more quantity
    //action.payload is an object
    addToCart(state, action) {
      const cartItems = state.items;
      const cartItemFounded = cartItems
        .filter((item) => item.id === action.payload.id)
        .pop();
      if (cartItemFounded) {
        cartItemFounded.quantity += action.payload.quantity;
      } else {
        cartItems.unshift(action.payload);
      }

      //Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
    },

    removeEntireItem(state, action) {
      const cartItems = state.items;
      state.items = cartItems.filter((item) => item.id !== action.payload.id);

      //Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    setNewQuantity(state, action) {
      const cartItems = state.items;
      const cartItemFounded = cartItems
        .filter((item) => item.id === action.payload.id)
        .pop();
      if (cartItemFounded) {
        cartItemFounded.quantity = action.payload.quantity;
      }
      //Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
    },
  },
});

export const {
  replaceCart,
  clearCart,
  addToCart,
  removeEntireItem,
  setNewQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

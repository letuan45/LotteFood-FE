import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import userSlice from "../features/common/userSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import cartSlice from "../features/common/cartSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  auth: userSlice,
  cart: cartSlice
};

export default configureStore({
  reducer: combinedReducer,
});

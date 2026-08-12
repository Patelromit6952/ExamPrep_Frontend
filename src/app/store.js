import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import subscriptionReducer from "../features/subscription/subscriptionSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer
  }
});

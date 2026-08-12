import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subscriptionService } from "../../services/subscriptionService.js";

export const fetchMySubscription = createAsyncThunk(
  "subscription/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      return await subscriptionService.mySubscription();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  current: null, // active subscription object, or null if none
  status: "idle",
  checked: false
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    resetSubscription: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySubscription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMySubscription.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
        state.checked = true;
      })
      .addCase(fetchMySubscription.rejected, (state) => {
        state.status = "failed";
        state.checked = true;
      });
  }
});

export const { resetSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import api from "../../services/api.js";

// // // Each thunk hits the backend and lets the slice reducers manage loading/error state.
// // export const registerUser = createAsyncThunk(
// //   "auth/register",
// //   async ({ name, email, password }, { rejectWithValue }) => {
// //     try {
// //       const res = await api.post("/auth/register", { name, email, password });
// //       return res.data.data.user;
// //     } catch (err) {
// //       return rejectWithValue(err.message);
// //     }
// //   }
// // );

// // export const loginUser = createAsyncThunk(
// //   "auth/login",
// //   async ({ email, password }, { rejectWithValue }) => {
// //     try {
// //       const res = await api.post("/auth/login", { email, password });
// //       return res.data.data.user;
// //     } catch (err) {
// //       return rejectWithValue(err.message);
// //     }
// //   }
// // );

// // export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
// //   try {
// //     await api.post("/auth/logout");
// //     return true;
// //   } catch (err) {
// //     return rejectWithValue(err.message);
// //   }
// // });

// // // Called once on app load to check for an existing session cookie.
// // export const fetchCurrentUser = createAsyncThunk(
// //   "auth/fetchCurrentUser",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const res = await api.get("/auth/me");
// //       return res.data.data.user;
// //     } catch (err) {
// //       return rejectWithValue(err.message);
// //     }
// //   }
// // );

// // const initialState = {
// //   user: null,
// //   status: "idle", // idle | loading | succeeded | failed
// //   initialCheckDone: false,
// //   error: null,
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     clearAuthError: (state) => {
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Register
// //       .addCase(registerUser.pending, (state) => {
// //         state.status = "loading";
// //         state.error = null;
// //       })
// //       .addCase(registerUser.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.user = action.payload;
// //       })
// //       .addCase(registerUser.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       })
// //       // Login
// //       .addCase(loginUser.pending, (state) => {
// //         state.status = "loading";
// //         state.error = null;
// //       })
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.user = action.payload;
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       })
// //       // Logout
// //       .addCase(logoutUser.fulfilled, (state) => {
// //         state.user = null;
// //         state.status = "idle";
// //       })
// //       // Fetch current user (session bootstrap)
// //       .addCase(fetchCurrentUser.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.user = action.payload;
// //         state.initialCheckDone = true;
// //       })
// //       .addCase(fetchCurrentUser.rejected, (state) => {
// //         state.status = "idle";
// //         state.user = null;
// //         state.initialCheckDone = true;
// //       });
// //   },
// // });

// // export const { clearAuthError } = authSlice.actions;
// // export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../services/api.js";

// // Each thunk hits the backend and lets the slice reducers manage loading/error state.
// // Errors are normalized to { message, errors } so components can branch on
// // specific error codes (e.g. "email-not-verified") as well as show the message.
// const asRejection = (err) => ({
//   message: err.message,
//   errors: err.errors || []
// });

// // Does NOT log the user in - the backend emails an OTP that must be
// // verified first. Returns { email } so the UI knows where to send them.
// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async ({ name, email, password }, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/auth/register", { name, email, password });
//       return res.data.data; // { email }
//     } catch (err) {
//       return rejectWithValue(asRejection(err));
//     }
//   }
// );

// // Verifying the OTP logs the user in immediately (unless another session is
// // already active elsewhere, in which case loggedIn: false is returned).
// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async ({ email, otp }, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/auth/verify-otp", { email, otp });
//       return res.data.data; // { user, loggedIn }
//     } catch (err) {
//       return rejectWithValue(asRejection(err));
//     }
//   }
// );

// export const resendOtp = createAsyncThunk(
//   "auth/resendOtp",
//   async (email, { rejectWithValue }) => {
//     try {
//       await api.post("/auth/resend-otp", { email });
//       return true;
//     } catch (err) {
//       return rejectWithValue(asRejection(err));
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       return res.data.data.user;
//     } catch (err) {
//       return rejectWithValue(asRejection(err));
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await api.post("/auth/logout");
//       return true;
//     } catch (err) {
//       return rejectWithValue(asRejection(err));
//     }
//   }
// );

// // Called once on app load to check for an existing session cookie.
// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/auth/me");
//       return res.data.data.user;
//     } catch (err) {
//       return rejectWithValue(asRejection(err));
//     }
//   }
// );

// const initialState = {
//   user: null,
//   status: "idle", // idle | loading | succeeded | failed
//   initialCheckDone: false,
//   error: null
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearAuthError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register (no login yet - OTP verification required)
//       .addCase(registerUser.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.status = "succeeded";
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Verify OTP (logs in if no other active session)
//       .addCase(verifyOtp.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(verifyOtp.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         if (action.payload.loggedIn) {
//           state.user = action.payload.user;
//         }
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.status = "idle";
//       })
//       // Fetch current user (session bootstrap)
//       .addCase(fetchCurrentUser.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.user = action.payload;
//         state.initialCheckDone = true;
//       })
//       .addCase(fetchCurrentUser.rejected, (state) => {
//         state.status = "idle";
//         state.user = null;
//         state.initialCheckDone = true;
//       });
//   }
// });

// export const { clearAuthError } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";
import { tokenStorage } from "../../utils/tokenStorage.js";

// Each thunk hits the backend and lets the slice reducers manage loading/error state.
// Errors are normalized to { message, errors } so components can branch on
// specific error codes (e.g. "email-not-verified") as well as show the message.
const asRejection = (err) => ({
  message: err.message,
  errors: err.errors || []
});

// Does NOT log the user in - the backend emails an OTP that must be
// verified first. Returns { email } so the UI knows where to send them.
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      return res.data.data; // { email }
    } catch (err) {
      return rejectWithValue(asRejection(err));
    }
  }
);

// Verifying the OTP logs the user in immediately (unless another session is
// already active elsewhere, in which case loggedIn: false is returned).
// The backend also sets an httpOnly cookie, but we additionally persist the
// returned token so the Bearer-header path works (needed for Electron).
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      const data = res.data.data; // { user, loggedIn, token }
      if (data.loggedIn && data.token) {
        tokenStorage.set(data.token);
      }
      return data;
    } catch (err) {
      return rejectWithValue(asRejection(err));
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      await api.post("/auth/resend-otp", { email });
      return true;
    } catch (err) {
      return rejectWithValue(asRejection(err));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { user, token } = res.data.data;
      tokenStorage.set(token);
      return user;
    } catch (err) {
      return rejectWithValue(asRejection(err));
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await api.post("/auth/logout");
  } catch {
    // Even if the network call fails (offline, etc.), still clear the
    // local session below - the user's intent to log out wins either way.
  } finally {
    tokenStorage.clear();
  }
  return true;
});

// Called once on app load to check for an existing session (cookie or
// stored Bearer token, whichever the api interceptor attaches).
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data.data.user;
    } catch (err) {
      tokenStorage.clear();
      return rejectWithValue(asRejection(err));
    }
  }
);

const initialState = {
  user: null,
  status: "idle", // idle | loading | succeeded | failed
  initialCheckDone: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register (no login yet - OTP verification required)
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Verify OTP (logs in if no other active session)
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.loggedIn) {
          state.user = action.payload.user;
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      })
      // Fetch current user (session bootstrap)
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.initialCheckDone = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "idle";
        state.user = null;
        state.initialCheckDone = true;
      });
  }
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosConfig from "../services/axiosConfig";
import { 
  registerService, 
  // getLoginStatusService,
  // getUserService, 
  sendVerificationEmailService, 
  verifyUserService, 
  loginService,
  // logoutService,
  loginWithGoogleService,
} from "../services/authServices";

const initialState = {
    isLoggedIn: false,
    currentUser: null,
    isGuest: true,
    users: [],
    twoFactor: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
      try {
          return await registerService(userData);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
);

// Get Login status
// export const getLoginStatus = createAsyncThunk(
//   "auth/getLoginStatus",
//   async (_, thunkAPI) => {
//       try {
//           return await getLoginStatusService();
//       } catch (error) {
//           const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
//           return thunkAPI.rejectWithValue(message);
//       }
//   }
// );

  // Get Current User
// export const getUser = createAsyncThunk(
//   "auth/getUser",
//   async (userId, thunkAPI) => {
//     try {
//       return await getUserService(userId);
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//       }
//   }
// );

 // Send verification email
export const sendVerificationEmail = createAsyncThunk(
    "auth/sendVerificationEmail",
    async (_, thunkAPI) => {
      try {
        return await sendVerificationEmailService();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
);

// Verify user
export const verifyUser = createAsyncThunk(
    "auth/verifyUser",
    async (verificationToken, thunkAPI) => {
      try {
        return await verifyUserService(verificationToken);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
);

// Login User
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
      try {
          return await loginService(userData);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
);

// Logout User
// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, thunkAPI) => {
//       try {
//           return await logoutService();
//       } catch (error) {
//           const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
//           return thunkAPI.rejectWithValue(message);
//       }
//   }
// );

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (userToken, thunkAPI) => {
      try {
          return await loginWithGoogleService(userToken);
      } catch (error) {
          const msg = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(msg);
      }
  }
);



// Send Login Code
// export const sendLoginCode = createAsyncThunk(
//     "auth/sendLoginCode",
//     async (email, thunkAPI) => {
//         try {
//             return await sendLoginCodeService(email);
//         } catch (error) {
//             const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// Login with access code
// export const loginWithCode = createAsyncThunk(
//     "auth/loginWithCode",
//     async ({ code, email }, thunkAPI) => {
//         try {
//             return await loginWithCodeService(code, email);
//         } catch (error) {
//             const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

let interceptor;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        RESET: state => {
            state.twoFactor = false;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
        logout: state => {
          Cookies.remove("user");
          axiosConfig.interceptors.request.eject(interceptor);
          return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            // Send Verification Email
            .addCase(sendVerificationEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendVerificationEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(sendVerificationEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.message = action.payload;
                console.log('action.payload', action.payload)
            })
            // Verify user
            .addCase(verifyUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentUser = {
                    ...state.currentUser, 
                    isVerified: payload.isVerified
                };
                state.isLoggedIn = true;
                state.message = payload.message;
            })
            .addCase(verifyUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = true;
                state.message = payload.message;
                console.log(payload.message);
            })
            // Login User
            // .addCase(login.pending, (state) => {
            //   state.isLoading = true;
            // })
            // .addCase(login.fulfilled, (state, { payload }) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.isLoggedIn = true;
            //     state.currentUser = payload;
            //     console.log('payload', payload);
            //     Cookies.set("user", JSON.stringify(payload), { expires: 30 });
            //     interceptor = axiosConfig.interceptors.request.use(
            //       config => {
            //         config.headers["Authorization"] = `Bearer ${token}`;
            //         return config;
            //       },
            //       error => Promise.reject(error)
            //     );
            // })
            // .addCase(login.rejected, (state, { payload }) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = payload;
            //     state.currentUser = null;
            //     if (payload.includes('New browser')) {
            //         state.twoFactor = true;
            //     }
            // })
            // Send login code
            // .addCase(sendLoginCode.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(sendLoginCode.fulfilled, (state, { payload }) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.message = payload;
            //     // toast.isSuccess(payload);
            // })
            // .addCase(sendLoginCode.rejected, (state, { payload }) => {
            //     state.isLoading = false;
            //     state.error = true;
            //     state.message = payload;
            //     // toast.error(payload);
            // })
            // login with code
            // .addCase(loginWithCode.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(loginWithCode.fulfilled, (state, { payload }) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.isLoggedIn = true;
            //     state.twoFactor = false;
            //     state.message = payload;
            //     // toast.isSuccess(payload);
            // })
            // .addCase(loginWithCode.rejected, (state, { payload }) => {
            //     state.isLoading = false;
            //     state.error = true;
            //     state.message = payload;
            //     state.currentUser = null;
            //     // toast.error(payload);
            // })
    }
});

export const { RESET, logout } = authSlice.actions;

export const selectCurrentUser = state => state.auth.currentUser;

export default authSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";
//import axiosConfig from "../services/axiosConfig";
import { verifyUserService, sendVerificationEmailService } from "../services/authServices";

const initialState = {
    loggedIn: false,
    currentUser: null,
    users: [],
    twoFactor: false,
    error: false,
    success: false,
    loading: false,
    msg: "",
};

 // Send verification email
export const sendVerificationEmail = createAsyncThunk(
    "auth/sendVerificationEmail",
    async (_, thunkAPI) => {
      try {
        return await sendVerificationEmailService();
      } catch (error) {
        const msg =
          (error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.msg ||
          error.toString();
        return thunkAPI.rejectWithValue(msg);
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
        const msg =
          (error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.msg ||
          error.toString();
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
//             const msg = (error.response && error.response.data && error.response.data.msg ) || error.msg || error.toString();
//             return thunkAPI.rejectWithValue(msg);
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
//             const msg = (error.response && error.response.data && error.response.data.msg ) || error.msg || error.toString();
//             return thunkAPI.rejectWithValue(msg);
//         }
//     }
// );

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        RESET(state) {
            state.twoFactor = false;
            state.error = false;
            state.success = false;
            state.loading = false;
            state.msg = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Send Verification Email
            .addCase(sendVerificationEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendVerificationEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.msg = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(sendVerificationEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = action.payload;
                console.log('action.payload', action.payload)
            })
            // Verify user
            .addCase(verifyUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.currentUser = {
                    ...state.currentUser, 
                    isVerified: payload.isVerified
                };
                state.loggedIn = true;
                state.msg = payload.msg;
            })
            .addCase(verifyUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.msg = payload.msg;
                console.log(payload.msg);
            })
            // Send login code
            // .addCase(sendLoginCode.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(sendLoginCode.fulfilled, (state, { payload }) => {
            //     state.loading = false;
            //     state.success = true;
            //     state.msg = payload;
            //     // toast.success(payload);
            // })
            // .addCase(sendLoginCode.rejected, (state, { payload }) => {
            //     state.loading = false;
            //     state.error = true;
            //     state.msg = payload;
            //     // toast.error(payload);
            // })
            // login with code
            // .addCase(loginWithCode.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(loginWithCode.fulfilled, (state, { payload }) => {
            //     state.loading = false;
            //     state.success = true;
            //     state.loggedIn = true;
            //     state.twoFactor = false;
            //     state.msg = payload;
            //     // toast.success(payload);
            // })
            // .addCase(loginWithCode.rejected, (state, { payload }) => {
            //     state.loading = false;
            //     state.error = true;
            //     state.msg = payload;
            //     state.currentUser = null;
            //     // toast.error(payload);
            // })
    }
});

export const { RESET } = authSlice.actions;

export default authSlice.reducer;
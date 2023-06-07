import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosConfig from "../services/axiosConfig";
import { loginWithGoogleService, verifyUserService } from "../services/authServices";


const initialState = {
	id: "",
	name: "",
	profileImage: "",
	token: "",
	isGuest: "",
};

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

export const verifyUser = createAsyncThunk(
    "auth/verifyUser",
    async (verificationToken, thunkAPI) => {
      try {
        return await verifyUserService(verificationToken);
      } catch (error) {
        const msg =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(msg);
      }
    }
  );

let interceptor;

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			const { id, name, profileImage, isVerified, token, isGuest } = action.payload;
			Cookies.set("user", JSON.stringify(action.payload), { expires: 30 });
			interceptor = axiosConfig.interceptors.request.use(
				config => {
					config.headers["Authorization"] = `Bearer ${token}`;
					return config;
				},
				error => Promise.reject(error)
			);
			return { id, name, profileImage, isVerified, token, isGuest: !!isGuest };
		},
		logout: state => {
			Cookies.remove("user");
			console.log('state', state)
			console.log('axiosConfig', axiosConfig);
			axiosConfig.interceptors.request.eject(interceptor);
			return initialState;
		},
		update: (state, action) => {
			const { payload } = action;
			Object.keys(payload).map(key => (state[key] = payload[key]));
			Cookies.set("user", JSON.stringify(state));
		},
	},
	extraReducers: {
		[loginWithGoogle.fulfilled]: (state, action) => {
			const { id, name, profileImage, role, isVerified, token, isGuest } = action.payload;
			Cookies.set("user", JSON.stringify(action.payload), { expires: 30 });
			interceptor = axiosConfig.interceptors.request.use(
				config => {
					config.headers["Authorization"] = `Bearer ${token}`;
					return config;
				},
				error => Promise.reject(error)
			);
			return { id, name, profileImage, role, isVerified, token, isGuest: !!isGuest };
		},
		[verifyUser.fulfilled]: (state, action) => {
			const { payload: isVerified } = action;
			console.log('action.payload', action.payload);
			state.currentUser = {
				...state.currentUser, 
				isVerified: isVerified
			};
		},
		
		// Verify user
		// .addCase(verifyUser.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(verifyUser.fulfilled, (state, { payload }) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.currentUser = {
		// 		...state.currentUser, 
		// 		isVerified: payload.isVerified
		// 	};
		// 	state.isLoggedIn = true;
		// 	state.message = payload.message;
		// 	toast.success(payload.message);
		// })
		// .addCase(verifyUser.rejected, (state, { payload }) => {
		// 	state.isLoading = false;
		// 	state.isError = true;
		// 	state.message = payload.message;
		// 	console.log(payload.message);
		// })
            
	}
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;

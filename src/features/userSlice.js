import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { changePasswordService, sendVerificationEmailService } from "../services/authServices";
import axiosConfig from "../services/axiosConfig";
import { showModal } from "./modalSlice";

const initialState = {
	id: "",
	name: "",
	profileImage: "",
	role: "",
	isVerified: "",
	token: "",
	isGuest: "",
};

export const sendVerificationEmail = createAsyncThunk("auth/sendVerificationEmail", async (props, thunkAPI) => {
	const { customFetch, userId } = props;
	const { rejectWithValue } = thunkAPI;
	const data = await customFetch(sendVerificationEmailService, { userId });
	if (!data) return rejectWithValue();
});

// Change password 
export const changePassword = createAsyncThunk("auth/changePassword", async (userData, thunkAPI) => {
        try {
            return await changePasswordService(userData);
        } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            return thunkAPI.rejectWithValue(message);
        }
});

// export const verifyUser = createAsyncThunk("auth/verifyUser", async (props, thunkAPI) => {
// 	const { customFetch, verificationToken } = props;
// 	const { rejectWithValue } = thunkAPI;
// 	const data = await customFetch(sendVerificationEmailService, verificationToken);
// 	if (!data) return rejectWithValue();
// 	console.log('data', data);
// 	return data;
// });

let interceptor;

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			const { id, name, profileImage, role, isVerified, token, isGuest } = action.payload;
			console.log('action.payload', action.payload);
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
		loginWithGoogle: (state, action) => {
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
		verifyUser: (state, action) => {
			const { isVerified } = action.payload;
			state.isVerified = isVerified;
			Cookies.set("user", JSON.stringify(state));
			console.log('action.payload', action.payload);
		},
		logout: state => {
			Cookies.remove("user");
			axiosConfig.interceptors.request.eject(interceptor);
			return initialState;
		},
		update: (state, action) => {
			const { payload } = action;
			Object.keys(payload).map(key => (state[key] = payload[key]));
			Cookies.set("user", JSON.stringify(state));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendVerificationEmail.fulfilled, (state, action) => {
				console.log('action.payload', action.payload);
				//state.emailSent = action.payload;
			})
	},
});

export const { login, loginWithGoogle, verifyUser, logout, update } = userSlice.actions;

export default userSlice.reducer;

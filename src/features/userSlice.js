import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginWithGoogleService, sendVerificationEmailService } from "../services/authServices";
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

let interceptor;

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async (props, thunkAPI) => {
	const { rejectWithValue, dispatch } = thunkAPI;
	const { customFetch, userToken } = props;
	const data = await customFetch(loginWithGoogleService, userToken);
	console.log('data', data);
	//if (!data) return rejectWithValue();
	dispatch(userSlice.actions.login(data));
});

// export const sendVerificationEmail = createAsyncThunk("auth/sendVerificationEmail", async (data, thunkAPI) => {
// 	const { rejectWithValue, dispatch } = thunkAPI;
// 	const data = await customFetch(sendVerificationEmailService);
// 	console.log('data', data)
// 	if (!data) return rejectWithValue();
// 	dispatch(showModal({ msg: "Please check your email for a verification link."}));
	
// });

export const sendVerificationEmail = createAsyncThunk("auth/sendVerificationEmail", async (userEmail, thunkAPI) => {
      
	try {
        return await sendVerificationEmailService(userEmail);
      } catch (error) {
        const msg =
          (error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.msg ||
          error.toString();
        return thunkAPI.rejectWithValue(msg);
      }
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			const { id, name, profileImage, role, isVerified, token, isGuest } = action.payload;
			Cookies.set("user", JSON.stringify(action.payload), { expires: 30 });
			interceptor = axiosConfig.interceptors.request.use(
				config => {
					config.headers["Authorization"] = `Bearer ${token}`;
					return config;
				},
				error => Promise.reject(error)
			);

			console.log('action.payload', action.payload)
			return { id, name, profileImage, role, isVerified, token, isGuest: !!isGuest };
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
				dispatch(showModal({ msg: action.payload }));
			})
	}
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;

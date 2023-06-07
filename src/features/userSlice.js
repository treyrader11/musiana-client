import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyUserService } from "../services/authServices";


const initialState = {
	id: "",
	name: "",
	profileImage: "",
	token: "",
	isGuest: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		update: (state, action) => {
			const { payload } = action;
			Object.keys(payload).map(key => (state[key] = payload[key]));
			//Cookies.set("user", JSON.stringify(state));
		},
	}
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;

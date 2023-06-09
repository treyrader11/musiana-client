import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendAutomatedEmailService } from "../services/emailServices";

const initialState = {
    sendingEmail: false,
    emailSent: false,
    msg: "",
};

export const sendAutomatedEmail = createAsyncThunk("email/sendAutomatedEmail", async (props, thunkAPI) => {
      try {
        return await sendAutomatedEmailService(emailData);
      } catch (error) {
        const msg =
          (error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(msg);
      }

    // const { customFetch, emailData } = props;
    // const { rejectWithValue, dispatch } = thunkAPI;
	  // const data = await customFetch(fetchPostsService);

});

const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        RESET(state) {
            state.sendingEmail = false;
            state.emailSent = false;
            state.msg = "";
        },
    },
    // extraReducers: {
    //     [sendVerificationEmail.fulfilled]: (state, action) => {
	// 		const { payload } = action;
	// 		console.log('action.payload', payload);
	// 	},
    // }
    extraReducers: builder => {
        builder
        .addCase(sendAutomatedEmail.pending, (state) => {
            state.sendingEmail = true;
        })
        .addCase(sendAutomatedEmail.fulfilled, (state, action) => {
            state.sendingEmail = false;
            state.emailSent = true;
            state.msg = action.payload;
            // console.log('changePassword payload:', action.payload);
        })
        .addCase(sendAutomatedEmail.rejected, (state, action) => {
            state.sendingEmail = false;
            state.emailSent = false;
            state.msg = action.payload;
        })
        // Send Verification Email
        // .addCase(sendVerificationEmail.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        //     // state.isLoading = false;
        //     // state.isSuccess = true;
        //     state.emailSent = true;
        //     state.msg = action.payload;
        //     console.log('action.payload', action.payload)
        // })
        // .addCase(sendVerificationEmail.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.msg = action.payload;
        //     console.log('action.payload', action.payload)
        // })
    }
});

export const { RESET } = emailSlice.actions;

export default emailSlice.reducer;
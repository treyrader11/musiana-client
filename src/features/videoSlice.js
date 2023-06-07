import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addVideoService,
    fetchVideoService,
    fetchVideosService,
    updateVideoService,
    updateVideoDetailsService,
    deleteVideoService,
} from "../services/videoServices";

const initialState = {
  video: null,
  videos: [],
  videoDetails: {},
  loading: false,
  uploading: false,
  progress: 0,
  syncing: false,
  error: false,
  success: false,
  wizardOpen: false,
  message: "",
};

export const addVideo = createAsyncThunk(
  "video/addVideo",
  async (videoData, thunkAPI) => {
      try {
          return await addVideoService(videoData);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
);

export const getVideo = createAsyncThunk(
  "video/getVideo",
  async (videoId, thunkAPI) => {
      try {
          return await fetchVideoService(videoId);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
);


// Update Video
export const updateVideo = createAsyncThunk(
  "video/updateVideo",
  async (_, thunkAPI) => {
      try {
          return await updateVideoService();
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
);

// Update Video
export const updateVideoDetails = createAsyncThunk(
  "video/updateVideoDetails",
  async (videoId, videoData, thunkAPI) => {
      try {
          return await updateVideoDetailsService(videoId, videoData);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
);

// Delete Video
export const deleteVideo = createAsyncThunk(
  "video/deleteVideo",
  async (videoId, thunkAPI) => {
      try {
          return await deleteVideoService(videoId);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
);

export const getVideos = createAsyncThunk(
  "videos/getVideos",
  async (type, thunkAPI) => {
        try {
            return await fetchVideosService(type);
        } catch (err) {
            const msg = (err.response && err.response.data && err.response.data.message ) || err.message || err.toString();
            return thunkAPI.rejectWithValue(msg);
        }
  }
);

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        like: (state, action) => {
        if (!state.video.likes.includes(action.payload)) {
            state.video.likes.push(action.payload);
            state.video.dislikes.splice(
                state.video.dislikes.findIndex(
                    (userId) => userId === action.payload
                ),
                1
            );
        }
        },
        dislike: (state, action) => {
        if (!state.video.dislikes.includes(action.payload)) {
                state.video.dislikes.push(action.payload);
                state.video.likes.splice(
                    state.video.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
        openWizard: (state, action) => {
            state.wizardOpen = action.payload;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
            // console.log('progress', action.payload);
        },
        setUploading: (state, action) => {
            state.uploading = action.payload;
        },
        setVideoDetails: (state, action) => {
            state.videoDetails = {
                ...state.videoDetails,
                ...action.payload
            }
        },
        RESET(state) {
            state.error = false;
            state.success = false;
            state.loading = false;
            state.message = "";
            state.video = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideos.pending, (state) => {
                state.loading = true;
                state.success = false;
                console.log('pending', state);
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.videos = action.payload;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload;
                console.log('getVideos rejected:', action.payload);
            })  
    }
});

export const { 
    setProgress, 
    setUploading, 
    setVideoDetails, 
    openWizard, 
    RESET } = videoSlice.actions;

export default videoSlice.reducer;
import axiosConfig from "./axiosConfig";

// Add video 
const addVideoService = async (videoData) => {
   const response = await axiosConfig.post("/videos", videoData);
   return response.data;
};

// Get Video 
const fetchVideoService = async (videoId) => {
    const response = await axiosConfig.get(`/videos/find/${videoId}`);
    return response.data;
};

 // Get Videos by dynamic type
 const fetchVideosService = async (type) => {
    const response = await axiosConfig.get(`/videos/${type}`);
    // console.log('getVideos response:', response.data);
    return response.data;
};

 // Update Video
const updateVideoService = async (id) => {
    const response = await axiosConfig.put(`/videos/${id}`);
    return response.data;
};

// Update Video
const updateVideoDetailsService = async (videoData, videoId) => {
    const response = await axiosConfig.put(`/videos/details/${videoId}`, videoData);
    return response.data;
};

// Delete Video
const deleteVideoService = async (id) => {
   const response = await axiosConfig.delete(`/videos/${id}`);
   return response.data.message;
};

const deleteVideosService = async (ids) => {
    const response = await axiosConfig.delete(`videos/${ids}`);
    return response.data.message;
};

export {
    addVideoService,
    fetchVideoService,
    fetchVideosService,
    updateVideoService,
    updateVideoDetailsService,
    deleteVideoService,
    deleteVideosService,
};
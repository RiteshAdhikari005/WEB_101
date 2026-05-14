import api from "@/lib/api-config";

export const videoService = {
  getAllVideos: async ({ pageParam = null }) => {
    const params = new URLSearchParams({ limit: "10" });
    if (pageParam) params.append("cursor", pageParam);
    const response = await api.get(`/videos?${params.toString()}`);
    return response.data;
  },

  getFollowingVideos: async ({ pageParam = null }) => {
    const params = new URLSearchParams({ limit: "10" });
    if (pageParam) params.append("cursor", pageParam);
    const response = await api.get(`/videos/following?${params.toString()}`);
    return response.data;
  },

  likeVideo: async (videoId) => {
    const response = await api.post(`/videos/${videoId}/like`);
    return response.data;
  },

  unlikeVideo: async (videoId) => {
    const response = await api.delete(`/videos/${videoId}/like`);
    return response.data;
  },

  getComments: async (videoId) => {
    const response = await api.get(`/videos/${videoId}/comments`);
    return response.data;
  },

  addComment: async (videoId, text) => {
    const response = await api.post(`/videos/${videoId}/comments`, { text });
    return response.data;
  },

  uploadVideo: async (formData) => {
    const response = await api.post("/videos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteVideo: async (videoId) => {
    const response = await api.delete(`/videos/${videoId}`);
    return response.data;
  },
};
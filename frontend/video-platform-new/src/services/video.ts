import type { VideoUploadUrlRequest, VideoUploadUrlResponse } from "@/types";
import type { Video } from "@/types";
import api from "@/lib/axios";
import axios from "axios";

export const getVideoUploadUrl = async (
  data: VideoUploadUrlRequest
): Promise<VideoUploadUrlResponse> => {
  const response = await api.post("/videos/upload-url", data);
  return response.data;
};

export const getVideoList = async (): Promise<Video[]> => {
  const response = await api.get("/videos");
  return response.data;
};

export const generateShareUrl = async (
  videoId: string,
  domain?: string
): Promise<{ token: string; url: string }> => {
  const response = await api.post(`/videos/${videoId}/share`, { domain });
  return response.data;
};

export const createPlayerSession = async (
  videoId: string,
  token: string
): Promise<{ playbackUrl: string; expiresIn: number }> => {
  const response = await api.post("/player/session", { videoId, token });
  return response.data;
};

export const getVideoPresignedUrl = async (
  videoId: string,
  quality: string
): Promise<{ url: string }> => {
  const response = await api.post(
    "/videos/presigned-url",
    { videoId, quality },
    { withCredentials: true }
  );
  return response.data;
};

export const uploadOnObjectStore = (
  uploadUrl: string,
  uploadData: File,
  onProgress: (p: number) => void
): Promise<void> => {
  return axios.put(uploadUrl, uploadData, {
    onUploadProgress: (e) => {
      onProgress(Math.round((e.loaded * 100) / e.total!));
    },
  });
};

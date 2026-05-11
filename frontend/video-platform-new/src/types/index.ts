import type { VIDEO_STATUS } from "@/lib/constants";

export interface Video {
  id: string;
  videoId: string;
  userId?: string;
  title: string;
  description?: string;
  filename: string;
  originalUrl: string;
  processedUrls: {
    [resolution: string]: string;
  };
  thumbnailUrl?: string;
  duration?: number;
  fileSize: number;
  status: VideoStatus;
  uploadedAt: Date;
  processedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type VideoStatus = typeof VIDEO_STATUS[keyof typeof VIDEO_STATUS];

export interface VideoUploadUrlRequest {
  fileName: string;
  contentType: string;
}

export interface VideoUploadUrlResponse {
  uploadUrl: string;
  key: string;
}

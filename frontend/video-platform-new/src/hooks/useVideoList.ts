import { create } from "zustand";
import { getVideoList } from "@/services/video";
import type { Video } from "@/types";
import { VIDEO_STATUS } from "@/lib/constants";

type VideoStoreState = {
  videos: Video[];
  loading: boolean;
  isInitialLoading: boolean;
  error: string | null;
  selectedEmbedVideo: Video | null;
  refresh: () => void;
  addVideo: (videoId: string) => void;
  loadVideos: (isRefresh?: boolean) => Promise<void>;
  setEmbedVideo: (video: Video | null) => void;
};

export const useVideoStore = create<VideoStoreState>((set, get) => ({
  videos: [],
  loading: false,
  isInitialLoading: true,
  error: null,
  selectedEmbedVideo: null,

  loadVideos: async (isRefresh = false) => {
    const { isInitialLoading, videos: currentVideos } = get();
    try {
      if (!isRefresh) {
        set({ loading: true });
      }

      const data = await getVideoList();

      if (isRefresh && currentVideos.length > 0) {
        const videoMap = new Map(currentVideos.map((v) => [v.id, v]));
        const mergedVideos = data.map((newVideo) => {
          const existingVideo = videoMap.get(newVideo.id);
          if (
            existingVideo &&
            existingVideo.status === newVideo.status &&
            existingVideo.title === newVideo.title &&
            JSON.stringify(existingVideo.processedUrls) ===
              JSON.stringify(newVideo.processedUrls)
          ) {
            return existingVideo;
          }
          return newVideo;
        });
        set({ videos: mergedVideos, error: null });
      } else {
        set({ videos: data, error: null });
      }

      if (isInitialLoading) {
        set({ isInitialLoading: false });
      }
    } catch (e: any) {
      set({ error: e?.message || "Failed to fetch videos" });
    } finally {
      set({ loading: false });
    }
  },

  refresh: () => {
    get().loadVideos(true);
  },

  addVideo: (videoId: string) =>
    set((state) => ({
      videos: [
        ...state.videos,
        {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          videoId,
          status: VIDEO_STATUS.PROCESSING,
          uploadedAt: new Date(),
          processedUrls: {},
          originalUrl: "",
          filename: "",
          fileSize: 0,
        },
      ],
    })),

  setEmbedVideo: (video: Video | null) => set({ selectedEmbedVideo: video }),
}));

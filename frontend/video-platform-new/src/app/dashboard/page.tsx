"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { UploadModal } from "@/components/video/UploadModal";
import VideoListContainer from "@/components/video/VideoListContainer";
import { VideoPlayerModal } from "@/components/video/VideoPlayerModal";
import { ShareModal } from "@/components/video/ShareModal";
import { useVideoPlayerStore } from "@/hooks/useVideoPlayer";
import { useVideoStore } from "@/hooks/useVideoList";

export default function DashboardPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const addVideo = useVideoStore((state) => state.addVideo);
  const selectedEmbedVideo = useVideoStore((state) => state.selectedEmbedVideo);
  const setEmbedVideo = useVideoStore((state) => state.setEmbedVideo);
  const selectedVideo = useVideoPlayerStore((state) => state.selectedVideo);
  const selectVideo = useVideoPlayerStore((state) => state.selectVideo);

  const handleUploadComplete = (videoId: string) => {
    setIsUploadOpen(false);
    addVideo(videoId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />

      <div className="lg:pl-64 pt-16">
        <main className="p-6 lg:p-8 max-w-screen-2xl mx-auto">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Videos</h1>
                <p className="text-gray-600">Manage and share your videos</p>
              </div>
              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => setIsUploadOpen(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Video
              </button>
            </div>

            <VideoListContainer />

            <UploadModal
              isOpen={isUploadOpen}
              onClose={() => setIsUploadOpen(false)}
              onUploadComplete={handleUploadComplete}
            />

            <VideoPlayerModal
              isOpen={!!selectedVideo}
              onClose={() => selectVideo(null)}
              video={selectedVideo}
            />

            <ShareModal
              isOpen={!!selectedEmbedVideo}
              onClose={() => setEmbedVideo(null)}
              video={selectedEmbedVideo}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

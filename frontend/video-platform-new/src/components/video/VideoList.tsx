"use client";

import React, { useState, useEffect } from "react";
import type { Video } from "@/types";
import VideoCard from "./VideoCard";

interface VideoListProps {
  videos: Video[];
  loading: boolean;
  onVideoSelect: (videoId: string) => void;
  onEmbedClick: (videoId: string) => void;
}

const VIDEOS_PER_PAGE = 12;

const VideoList: React.FC<VideoListProps> = ({
  videos,
  loading,
  onVideoSelect,
  onEmbedClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);

  useEffect(() => {
    const endIndex = currentPage * VIDEOS_PER_PAGE;
    setDisplayedVideos(videos.slice(0, endIndex));
  }, [videos, currentPage]);

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const hasMoreVideos = currentPage < totalPages;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600" />
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading your videos</h3>
          <p className="text-gray-600">Please wait while we fetch your video library...</p>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
            <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No videos yet</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Start building your video library by uploading your first video.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {displayedVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onSelect={() => onVideoSelect(video.id)}
            onEmbedClick={() => onEmbedClick(video.id)}
          />
        ))}
      </div>

      {hasMoreVideos && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Load More Videos
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {videos.length - displayedVideos.length} remaining
            </span>
          </button>
        </div>
      )}

      {videos.length > 0 && (
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-50 text-sm text-gray-600 rounded-full border">
            Showing {displayedVideos.length} of {videos.length} videos
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoList;

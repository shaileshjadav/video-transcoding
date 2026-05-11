"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import type { Video } from "@/types";
import { usePresignedVideoUrl } from "@/hooks/usePresignedVideoUrl";
import { VideoPlayer } from "./VideoPlayer";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

interface QualityOption {
  label: string;
  value: string;
  url?: string;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  video,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<string>("720p");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { url, loading } = usePresignedVideoUrl(video?.videoId, selectedQuality);

  const getQualityOptions = (): QualityOption[] => {
    if (!video?.processedUrls) return [];
    const options: QualityOption[] = Object.entries(video.processedUrls).map(
      ([resolution, url]) => ({ label: resolution, value: resolution, url })
    );
    const qualityOrder = ["1080p", "720p", "480p", "360p", "240p"];
    options.sort((a, b) => {
      const aIdx = qualityOrder.indexOf(a.value);
      const bIdx = qualityOrder.indexOf(b.value);
      return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
    });
    if (options.length === 0) {
      options.push({ label: "Original", value: "original", url: video?.originalUrl });
    }
    return options;
  };

  const qualityOptions = getQualityOptions();

  useEffect(() => {
    if (qualityOptions.length > 0 && !qualityOptions.find((q) => q.value === selectedQuality)) {
      setSelectedQuality(qualityOptions[0].value);
    }
  }, [video]);

  const handleClose = () => {
    setError(null);
    onClose();
  };

  if (!isOpen || !video) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/90" onClick={handleClose} />
        <div className="relative bg-black rounded-lg p-8 text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-lg">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/90" onClick={handleClose} />
        <div className="relative bg-black rounded-lg p-8 max-w-md text-white text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Playback Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button onClick={handleClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/90 transition-opacity" onClick={handleClose} />
      <div ref={containerRef} className="relative w-full max-w-6xl mx-4 bg-black rounded-lg overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-lg font-semibold truncate">
                {video.title || `Video ${video.id}`}
              </h3>
              {video.description && (
                <p className="text-sm text-gray-300 truncate">{video.description}</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-300 hover:bg-white/10 rounded-lg p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="aspect-video">
          {url && (
            <VideoPlayer
              src={url}
              poster={video.thumbnailUrl}
              autoPlay={false}
              controls={true}
              className="w-full h-full"
              onError={setError}
              showQualitySelector={true}
              availableQualities={qualityOptions.map((q) => ({
                label: q.label,
                value: q.value,
                url: q.url || "",
              }))}
              onQualityChange={setSelectedQuality}
              selectedQuality={selectedQuality}
            />
          )}
        </div>
      </div>
    </div>
  );
};

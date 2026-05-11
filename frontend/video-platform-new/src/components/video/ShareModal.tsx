"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Clipboard, Check, Share } from "lucide-react";
import type { Video } from "@/types";
import { generateShareUrl } from "@/services/video";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, video }) => {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchShareUrl = useCallback(async () => {
    if (!video) return;
    try {
      setLoading(true);
      setError(null);
      const response = await generateShareUrl(video.videoId);
      setShareUrl(response.url);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to generate share link");
    } finally {
      setLoading(false);
    }
  }, [video]);

  useEffect(() => {
    if (isOpen && video) fetchShareUrl();
  }, [isOpen, video, fetchShareUrl]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

        <div className="relative inline-block align-middle bg-white rounded-2xl text-left overflow-hidden shadow-2xl w-full max-w-4xl mx-4">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Share className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Share Video</h3>
                  <p className="text-sm text-gray-600">{video.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="bg-white px-8 py-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                <span className="ml-3 text-gray-600">Generating share link...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchShareUrl}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">Share Link</h4>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Clipboard className="w-4 h-4" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Share this link with anyone to give them access to the video
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Secure Access</p>
                      <p className="text-xs text-blue-700 mt-1">
                        This link includes secure token-based authentication and will expire in 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-8 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

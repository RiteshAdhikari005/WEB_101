"use client";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import { videoService } from "@/services/videoService";

export default function VideoFeed({ type = "all" }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data =
          type === "following"
            ? await videoService.getFollowingVideos()
            : await videoService.getAllVideos();
        setVideos(data);
      } catch (err) {
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [type]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading videos...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );

  if (videos.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-64 text-gray-500">
        <p className="text-xl mb-2">No videos yet</p>
        {type === "following" ? (
          <p>Follow some users to see their videos here!</p>
        ) : (
          <p>Be the first to upload a video!</p>
        )}
      </div>
    );

  return (
    <div className="max-w-xl mx-auto">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

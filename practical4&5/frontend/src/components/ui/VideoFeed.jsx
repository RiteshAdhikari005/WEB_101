"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import VideoCard from "./VideoCard";
import { videoService } from "@/services/videoService";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function VideoFeed({ type = "all" }) {
  const fetchFn =
    type === "following"
      ? videoService.getFollowingVideos
      : videoService.getAllVideos;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["videos", type],
    queryFn: fetchFn,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersectionObserver(handleIntersect);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading videos...</div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Failed to load videos</div>
      </div>
    );

  const videos = data.pages.flatMap((page) => page.videos);

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

      {/* Sentinel — triggers next page load when scrolled into view */}
      <div ref={sentinelRef} className="h-10 w-full" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="text-gray-500">Loading more...</div>
        </div>
      )}

      {!hasNextPage && videos.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="text-gray-400">No more videos</div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { videoService } from "@/services/videoService";
import toast from "react-hot-toast";

export default function VideoCard({ video }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(video.likes?.length || 0);
  const [liked, setLiked] = useState(
    video.likes?.some((l) => l.userId === user?.id) || false,
  );
  const [comments, setComments] = useState(video.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = async () => {
    if (!user) return toast.error("Please log in to like videos");
    try {
      if (liked) {
        await videoService.unlikeVideo(video.id);
        setLikes((l) => l - 1);
        setLiked(false);
      } else {
        await videoService.likeVideo(video.id);
        setLikes((l) => l + 1);
        setLiked(true);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to comment");
    if (!commentText.trim()) return;
    try {
      const newComment = await videoService.addComment(video.id, commentText);
      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
    } catch (err) {
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-600">
          {video.user?.username?.[0]?.toUpperCase()}
        </div>
        <Link
          href={`/profile/${video.user?.id}`}
          className="font-semibold hover:underline"
        >
          @{video.user?.username}
        </Link>
      </div>

      <p className="text-gray-700 mb-3">{video.caption}</p>

      <video
        src={`http://localhost:8000/uploads/${video.videoUrl}`}
        controls
        className="w-full rounded-lg max-h-96 bg-black"
      />

      <div className="flex gap-4 mt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 ${liked ? "text-pink-500" : "text-gray-500"} hover:text-pink-500`}
        >
          ❤️ {likes}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
        >
          💬 {comments.length}
        </button>
      </div>

      {showComments && (
        <div className="mt-3 border-t pt-3">
          {user && (
            <form onSubmit={handleComment} className="flex gap-2 mb-3">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600"
              >
                Post
              </button>
            </form>
          )}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-2 text-sm">
                <span className="font-semibold">@{c.user?.username}</span>
                <span className="text-gray-600">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import VideoCard from "@/components/ui/VideoCard";
import { useAuth } from "@/contexts/authContext";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getUserProfile(userId);
        setProfile(data);
        if (user) {
          const following = await userService.getFollowing();
          setIsFollowing(following.some((f) => f.id === parseInt(userId)));
        }
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, user]);

  const handleFollow = async () => {
    if (!user) return toast.error("Please log in first");
    try {
      if (isFollowing) {
        await userService.unfollowUser(userId);
        setIsFollowing(false);
        toast.success("Unfollowed");
      } else {
        await userService.followUser(userId);
        setIsFollowing(true);
        toast.success("Following!");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (loading)
    return (
      <MainLayout>
        <div className="text-gray-500">Loading profile...</div>
      </MainLayout>
    );

  if (!profile)
    return (
      <MainLayout>
        <div className="text-red-500">User not found</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-600 text-3xl">
            {profile.username?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">@{profile.username}</h1>
            {profile.bio && <p className="text-gray-500 mt-1">{profile.bio}</p>}
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>
                <strong>{profile._count?.followers || 0}</strong> followers
              </span>
              <span>
                <strong>{profile._count?.following || 0}</strong> following
              </span>
              <span>
                <strong>{profile.videos?.length || 0}</strong> videos
              </span>
            </div>
          </div>
          {user && user.id !== parseInt(userId) && (
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-full font-semibold ${
                isFollowing
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <h2 className="text-xl font-bold mb-4">Videos</h2>
        {profile.videos?.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No videos yet</div>
        ) : (
          profile.videos?.map((video) => (
            <VideoCard key={video.id} video={{ ...video, user: profile }} />
          ))
        )}
      </div>
    </MainLayout>
  );
}

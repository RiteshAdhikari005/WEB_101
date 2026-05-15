"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/authContext";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";

export default function ExploreUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers = await userService.getAllUsers();
        setUsers(allUsers);
        if (user) {
          const followingList = await userService.getFollowing();
          setFollowing(followingList.map((f) => f.id));
        }
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleFollow = async (userId) => {
    if (!user) return toast.error("Please log in first");
    try {
      if (following.includes(userId)) {
        await userService.unfollowUser(userId);
        setFollowing((prev) => prev.filter((id) => id !== userId));
        toast.success("Unfollowed");
      } else {
        await userService.followUser(userId);
        setFollowing((prev) => [...prev, userId]);
        toast.success("Following!");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Explore Users</h1>
      {loading ? (
        <div className="text-gray-500">Loading users...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 max-w-xl">
          {users
            .filter((u) => u.id !== user?.id)
            .map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between"
              >
                <Link
                  href={`/profile/${u.id}`}
                  className="flex items-center gap-3 hover:opacity-80"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-600 text-lg">
                    {u.username?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">@{u.username}</p>
                    {u.bio && <p className="text-sm text-gray-500">{u.bio}</p>}
                  </div>
                </Link>
                {user && (
                  <button
                    onClick={() => handleFollow(u.id)}
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      following.includes(u.id)
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                  >
                    {following.includes(u.id) ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </MainLayout>
  );
}

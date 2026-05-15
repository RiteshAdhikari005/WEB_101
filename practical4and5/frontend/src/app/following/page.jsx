"use client";
import MainLayout from "@/components/layout/MainLayout";
import VideoFeed from "@/components/ui/VideoFeed";
import { useAuth } from "@/contexts/authContext";

export default function FollowingPage() {
  const { user } = useAuth();

  if (!user)
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="text-xl mb-2">Please log in</p>
          <p>You need to be logged in to see your following feed.</p>
        </div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Following</h1>
      <VideoFeed type="following" />
    </MainLayout>
  );
}

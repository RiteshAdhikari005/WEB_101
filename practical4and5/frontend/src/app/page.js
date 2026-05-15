import MainLayout from "@/components/layout/MainLayout";
import VideoFeed from "@/components/ui/VideoFeed";

export default function Home() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">For You</h1>
      <VideoFeed type="all" />
    </MainLayout>
  );
}

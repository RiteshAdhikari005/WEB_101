"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/authContext";
import { videoService } from "@/services/videoService";
import toast from "react-hot-toast";

export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user)
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="text-xl mb-2">Please log in</p>
          <p>You need to be logged in to upload videos.</p>
        </div>
      </MainLayout>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return toast.error("Please select a video file");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("video", videoFile);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      await videoService.uploadVideo(formData);
      toast.success("Video uploaded successfully!");
      router.push("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video File
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="w-full border rounded-lg px-4 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50 font-semibold"
            >
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

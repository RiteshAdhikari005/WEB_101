"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import AuthModal from "@/components/auth/AuthModal";
import toast from "react-hot-toast";

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r fixed h-full flex flex-col p-6 gap-4">
        <Link href="/" className="text-2xl font-bold text-pink-500">
          🎵 TikTok
        </Link>

        <nav className="flex flex-col gap-2 mt-4">
          <Link
            href="/"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
          >
            🏠 For You
          </Link>
          {user && (
            <Link
              href="/following"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            >
              👥 Following
            </Link>
          )}
          <Link
            href="/explore-users"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
          >
            🔍 Explore Users
          </Link>
          {user && (
            <>
              <Link
                href="/upload"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                ➕ Upload
              </Link>
              <Link
                href={`/profile/${user.id}`}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                👤 Profile
              </Link>
            </>
          )}
        </nav>

        <div className="mt-auto">
          {user ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">@{user.username}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-sm"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
            >
              Log In
            </button>
          )}
        </div>
      </aside>

      <main className="ml-64 flex-1 p-6">{children}</main>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

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
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black fixed h-full flex flex-col p-6 gap-4">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          TikTok
        </Link>

        <nav className="flex flex-col gap-1 mt-6">
          <Link
            href="/"
            className="text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            For You
          </Link>

          {user && (
            <Link
              href="/following"
              className="text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Following
            </Link>
          )}

          <Link
            href="/explore-users"
            className="text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            Explore Users
          </Link>

          {user && (
            <>
              <Link
                href="/upload"
                className="text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Upload
              </Link>
              <Link
                href={`/profile/${user.id}`}
                className="text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Profile
              </Link>
            </>
          )}
        </nav>

        <div className="mt-auto">
          {user ? (
            <div className="flex flex-col gap-3">
              <p className="text-gray-400 text-sm">@{user.username}</p>
              <button
                onClick={handleLogout}
                className="w-full border border-white text-white py-2 rounded-lg text-sm hover:bg-white hover:text-black transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Log In
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
        {children}
      </main>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

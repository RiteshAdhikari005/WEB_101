import { AuthProvider } from "@/contexts/authContext";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "TikTok Clone",
  description: "A TikTok-like app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
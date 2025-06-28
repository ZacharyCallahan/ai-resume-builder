import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Resume Builder",
  description: "Create professional resumes with AI assistance. Generate, customize, and download your perfect resume in minutes.",
  keywords: ["resume builder", "AI resume", "professional resume", "resume generator"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-2 py-1 rounded text-xs">
            DEV MODE
          </div>
        )}
      </body>
    </html>
  );
}

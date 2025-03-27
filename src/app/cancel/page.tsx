"use client";

import React, { useEffect } from "react"; // <-- Add this import
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push("/pricing");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-red-700">😢 Oops! Something Went Wrong!</h1>
      <p className="text-lg text-gray-700 mt-3">
        Your signup or payment was canceled. No worries, you can try again!
      </p>
      <p className="text-gray-600 mt-2">Redirecting you home in 5 seconds...</p>
      <a href="/" className="mt-6 px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition">
        Go Back 🏡
      </a>
    </div>
  );
}

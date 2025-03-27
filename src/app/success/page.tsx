"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Success - KwikBuy",
  description: "Your signup or payment was successful!",
};

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-green-700">🎉 Success! Welcome to KwikBuy!</h1>
      <p className="text-lg text-gray-700 mt-3">
        Your signup or payment was successful. Get ready to shop smarter! 🛒
      </p>
      <p className="text-gray-600 mt-2">Redirecting you home in 5 seconds...</p>
      <a href="/" className="mt-6 px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition">
        Go to Home 🏡
      </a>
    </div>
  );
}

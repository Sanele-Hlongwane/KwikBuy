// components/LoadingCircleDots.tsx
"use client";

export default function LoadingDots() {
  return (
    <div className="flex space-x-2 items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className="w-4 h-4 bg-green-600 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

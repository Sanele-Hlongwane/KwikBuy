'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // <-- For client side redirect in Next 13+
import { FiFacebook, FiTwitter, FiInstagram, FiSun, FiMoon } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useUser } from "@clerk/nextjs";

type DbUser = {
  id: number;
  clerkUserId: string;
  stripeCustomerId: string | null;
  email: string;
  name: string | null;
  imageUrl: string | null;
  currentPlan: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const Footer = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetch('/api/user/sync')
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setDbUser(data.user);
            console.log("🔥 User data fetched:", data.user.email);

            // Redirect if stripeCustomerId is null or empty
            if (!data.user.stripeCustomerId) {
              console.log("🚨 No Stripe Customer ID found, redirecting to pricing...");
              router.push('/pricing');
            }
          } else {
            console.warn("😶‍🌫️ No user data found in API response");
          }
        })
        .catch(err => {
          console.error("💥 Failed to fetch user data:", err);
        });
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-300 p-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
          KwikBuy 🛒
        </div>

        <div className="flex flex-wrap gap-6 text-base">
          <Link href="/about" className="hover:text-blue-600">About Us</Link>
          <Link href="/shop" className="hover:text-blue-600">Shop</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          <Link href="/faq" className="hover:text-blue-600">FAQs</Link>
        </div>

        <div className="flex items-center gap-4 text-xl">
          <a href="#" target="_blank" className="hover:text-blue-600"><FiFacebook /></a>
          <a href="#" target="_blank" className="hover:text-blue-600"><FiTwitter /></a>
          <a href="#" target="_blank" className="hover:text-blue-600"><FiInstagram /></a>
        </div>

        <Button
          variant="outline"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center gap-2"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>

      <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-400">
        {dbUser ? (
          <>
            Welcome back, <span className="font-semibold">{dbUser.name || dbUser.email}</span>! 🎉
          </>
        ) : isSignedIn ? (
          <>Loading your magic... ✨</>
        ) : (
          <>You&apos;re not signed in — but you still look fly! 😎</>
        )}
      </div>

      <div className="text-center text-sm mt-8 text-gray-600 dark:text-gray-400">
        © 2025 KwikBuy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

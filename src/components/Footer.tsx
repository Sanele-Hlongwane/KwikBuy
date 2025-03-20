'use client';

import React from "react";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiSun, FiMoon } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-300 p-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo or Brand */}
        <div className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
          KwikBuy 🛒
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 text-base">
          <Link href="/about" className="hover:text-blue-600">About Us</Link>
          <Link href="/shop" className="hover:text-blue-600">Shop</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          <Link href="/faq" className="hover:text-blue-600">FAQs</Link>
        </div>

        {/* Social Media */}
        <div className="flex items-center gap-4 text-xl">
          <a href="#" target="_blank" className="hover:text-blue-600"><FiFacebook /></a>
          <a href="#" target="_blank" className="hover:text-blue-600"><FiTwitter /></a>
          <a href="#" target="_blank" className="hover:text-blue-600"><FiInstagram /></a>
        </div>

        {/* Theme Switcher */}
        <Button
          variant="outline"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center gap-2"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm mt-8 text-gray-600 dark:text-gray-400">
        © 2025 KwikBuy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Pacifico } from 'next/font/google';
import { FiLogIn, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-wrap justify-between items-center p-6 bg-white dark:bg-black shadow-md">
      {/* Logo */}
      <h1 className={`text-4xl ${pacifico.className} text-yellow-600 dark:text-yellow-400`}>
        KwikBuy 🛒
      </h1>

      {/* Theme Switcher */}
      <button
        className="p-2 text-xl dark:text-white"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </button>

      {/* Navbar */}
      <div className={`flex items-center space-x-6 ${isMenuOpen ? 'block' : 'hidden'} sm:flex`}>
        <nav className="flex flex-col sm:flex-row sm:space-x-6">
          <Link href="/">
            <Button className="flex items-center space-x-2 dark:hover:bg-gray-400">
              <span>Home</span>
            </Button>
          </Link>

          <Link href="/about">
            <Button className="flex items-center space-x-2 dark:hover:bg-gray-400">
              <span>About</span>
            </Button>
          </Link>

          <Link href="/contact">
            <Button className="flex items-center space-x-2 dark:hover:bg-gray-400">
              <span>Contact</span>
            </Button>
          </Link>

          <Link href="/pricing">
            <Button className="flex items-center space-x-2 dark:hover:bg-gray-400">
              <span>Pricing</span>
            </Button>
          </Link>

          {/* Signed Out Section */}
          <SignedOut>
            <Link href="/sign-in">
              <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg dark:hover:bg-gray-400 hover:bg-blue-700">
                <FiLogIn />
                <span>Sign In/Up</span>
              </Button>
            </Link>
          </SignedOut>

          {/* Signed In Section */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="sm:hidden p-2 text-xl dark:text-white"
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>
    </header>
  );
};

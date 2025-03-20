'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you've added this component from shadcn
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes"; // This is for theme switching
import { Pacifico } from 'next/font/google';
import { FiHome, FiInfo, FiPhone, FiDollarSign, FiLogIn, FiUserPlus, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi"; // Importing icons

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});

export const Header = () => {
  const { theme, setTheme } = useTheme();  // To handle theme switching
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown menu

  return (
    <header className="flex flex-wrap justify-between items-center p-6 bg-white dark:bg-black shadow-md">
      {/* Logo */}
      <h1 className={`text-4xl ${pacifico.className} text-yellow-600 dark:text-yellow-400`}>
        KwikBuy 🛒
      </h1>

      {/* Theme Switcher Button using react-icons */}
      <button
        className="p-2 text-xl dark:text-white"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </button>

      {/* Navbar */}
      <div className={`flex items-center space-x-6 ${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
        <nav className="flex flex-col sm:flex-row sm:space-x-6">
          <Link href="/">
            <Button className="flex items-center space-x-2  dark:hover:bg-gray-400">
              <span>Home</span>
            </Button>
          </Link>
          
          <Link href="/about">
            <Button className="flex items-center space-x-2  dark:hover:bg-gray-400">
              <span>About</span>
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button className="flex items-center space-x-2  dark:hover:bg-gray-400">
              <span>Contact</span>
            </Button>
          </Link>
          
          <Link href="/pricing">
            <Button className="flex items-center space-x-2  dark:hover:bg-gray-400">
              <span>Pricing</span>
            </Button>
          </Link>

          {/* Dropdown for signed-out users */}
          <SignedOut>
            <div className="relative">
            <Link href="/sign-in">
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg  dark:hover:bg-gray-400 hover:bg-blue-700 dark:hover:bg-blue-700"
              >
                <FiLogIn />
                Sign In/Up
              </Button>
              </Link>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-700 shadow-lg rounded-lg flex flex-col space-y-2">
                  <Link href="/sign-in">
                    <a className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 flex items-center space-x-2">
                      <FiLogIn />
                      <span>Sign In</span>
                    </a>
                  </Link>
                  <Link href="/sign-up">
                    <a className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 flex items-center space-x-2">
                      <FiUserPlus />
                      <span>Sign Up</span>
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </SignedOut>

          {/* User Menu for signed-in users */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>

      {/* Mobile Menu Toggle Button using react-icons */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="sm:hidden p-2 text-xl dark:text-white"
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>
    </header>
  );
};

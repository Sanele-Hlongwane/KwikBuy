'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Pacifico } from 'next/font/google';
import { FiLogIn, FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800">
      
       {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2 text-3xl ${pacifico.className} bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent font-bold transition-transform duration-300 hover:scale-105 drop-shadow-md`}
        >
          <FiShoppingCart
            className="text-4xl text-gray-900 dark:text-gray-200 transition-colors duration-300 group-hover:text-yellow-400"
          />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-600 dark:from-yellow-400 dark:via-orange-400 dark:to-pink-500 animate-gradient bg-[length:200%_200%] bg-left hover:bg-right">
            KwikBuy
          </span>
        </Link>


      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center space-x-4 font-medium text-gray-700 dark:text-gray-200">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        <NavLink href="/pricing">Pricing</NavLink>

        <SignedOut>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition rounded-full px-4 py-2 text-sm shadow-md">
            <Link href="/sign-in" className="flex items-center gap-2">
              <FiLogIn className="text-lg" />
              Sign In
            </Link>
          </Button>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden p-2 text-2xl text-gray-800 dark:text-gray-100"
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 p-6 flex flex-col space-y-4 sm:hidden shadow-lg"
          >
            <NavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink href="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
            <NavLink href="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</NavLink>

            <SignedOut>
              <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-4 py-2 text-sm shadow-md">
                <Link href="/sign-in" className="flex items-center gap-2">
                  <FiLogIn className="text-lg" />
                  Sign In
                </Link>
              </Button>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="relative px-3 py-2 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800 text-base"
  >
    {children}
  </Link>
);

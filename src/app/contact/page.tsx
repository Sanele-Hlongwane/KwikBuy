'use client';

import React from 'react';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-yellow-400 mb-4">Get In Touch With Us! 📞💬</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Whether you have a question or just wanna say "Howzit!", we're here for you!
        </p>
      </header>

      {/* Contact Info */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <FiMail className="text-blue-600 dark:text-yellow-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email Us</h3>
          <p className="text-gray-700 dark:text-gray-300">support@kwikbuy.co.za</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <FiPhone className="text-blue-600 dark:text-yellow-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Call Us</h3>
          <p className="text-gray-700 dark:text-gray-300">+27 87 123 4567</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <FiMapPin className="text-blue-600 dark:text-yellow-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-700 dark:text-gray-300">Sandton, Johannesburg, South Africa 🇿🇦</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 dark:bg-slate-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Drop Us A Message 💌</h2>
        <form className="grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-lg border dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-lg border dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="p-4 rounded-lg border dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 w-fit">
            <FiSend /> Send Message
          </Button>
        </form>
      </section>

      {/* Call-to-Action */}
      <section className="text-center py-8 mt-16 bg-blue-50 dark:bg-slate-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-yellow-400">Still thinking? 🤔</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">No stress, browse our store and shop till you drop! 🛒</p>
        <Link href="/shop">
          <Button className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500">
            Visit Store
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default ContactPage;

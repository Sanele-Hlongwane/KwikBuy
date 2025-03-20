// src/app/pricing/page.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiCheckCircle } from 'react-icons/fi';

const Pricing = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      {/* Page Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-yellow-400">💸 KwikBuy Pricing Plans</h1>
        <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">
          Premium vibes, simple prices. No hidden costs, just vibes 😉
        </p>
      </header>

      {/* Pricing Tiers */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Free Plan */}
        <Card className="shadow-xl border border-gray-200 dark:border-slate-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Starter Plan 🎉</CardTitle>
            <p className="text-4xl font-bold text-blue-600 dark:text-yellow-400">FREE</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 mt-6 text-gray-600 dark:text-gray-300">
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Access all products</li>
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Standard Delivery</li>
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Customer Support</li>
            </ul>
            <Button className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-700">Get Started</Button>
          </CardContent>
        </Card>

        {/* Premium Buyer */}
        <Card className="bg-gradient-to-br from-gray-700 to-gray-500 dark:from-gray-900 dark:to-gray-800 text-white shadow-2xl scale-105">
          <CardHeader>
            <CardTitle className="text-2xl">Premium Buyer 🚀</CardTitle>
            <p className="text-4xl font-bold">R49<span className="text-lg">/month</span></p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 mt-6">
              <li><FiCheckCircle className="inline mr-2 text-green-300" /> FREE Express Delivery</li>
              <li><FiCheckCircle className="inline mr-2 text-green-300" /> Early Access to Deals</li>
              <li><FiCheckCircle className="inline mr-2 text-green-300" /> 24/7 Premium Support</li>
            </ul>
            <Button className="mt-8 w-full bg-white text-blue-700 hover:bg-gray-200">Upgrade Now</Button>
          </CardContent>
        </Card>

        {/* Seller Plan */}
        <Card className="shadow-xl border border-gray-200 dark:border-slate-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Seller Pro 💼</CardTitle>
            <p className="text-4xl font-bold text-blue-600 dark:text-yellow-400">R199<span className="text-lg">/month</span></p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 mt-6 text-gray-600 dark:text-gray-300">
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Unlimited Listings</li>
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Featured Ads</li>
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Dedicated Account Manager</li>
            </ul>
            <Button className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-700">Become a Seller</Button>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center mt-20 bg-gray-100 dark:bg-slate-900 p-10 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Ready to Level Up? 🎯</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Pick your plan and start flexing with KwikBuy today 😎✨
        </p>
        <Link href="/sign-up">
          <Button className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-4 text-lg rounded-xl">
            Join KwikBuy Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Pricing;

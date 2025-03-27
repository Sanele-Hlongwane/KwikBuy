"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiCheckCircle } from 'react-icons/fi';
import { useUser, useClerk } from '@clerk/nextjs';
import { getStripe } from '@/lib/stripe';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const monthlyPricing = { premium: 49, seller: 199 };
  const yearlyPricing = {
    premium: 49 * 12 * 0.8, // 20% discount for yearly plan
    seller: 199 * 12 * 0.8,  // 20% discount for yearly plan
  };

  const handleCheckout = async (priceId: number) => {
    if (!user) {
      openSignIn();
      return;
    }

    try {
      // Send the priceId to your API route to create a Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { id } = await response.json(); // The session id from the Stripe API

      // Redirect to Stripe Checkout
      const stripe = await getStripe();  // Get the Stripe instance

      if (stripe) {
        stripe.redirectToCheckout({ sessionId: id });
      } else {
        console.error('Stripe.js failed to load');
        alert('Something went wrong, please try again!');
      }
    } catch (error) {
      console.error('Error during checkout session creation:', error);
      alert('Something went wrong, please try again!');
    }
  };


  const togglePricing = () => setIsYearly(!isYearly);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-yellow-400">💸 KwikBuy Pricing Plans</h1>
        <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">Premium vibes, simple prices. No hidden costs, just vibes 😉</p>
        <Button onClick={togglePricing} className="mt-4 text-blue-600 hover:text-blue-700">
          {isYearly ? 'Switch to Monthly' : 'Switch to Yearly'}
        </Button>
      </header>

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
            <Button
              onClick={() => handleCheckout(0)}  // Send 0 for the free plan
              className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Premium Buyer */}
        <Card className="bg-gradient-to-br from-gray-700 to-gray-500 dark:from-gray-900 dark:to-gray-800 text-white shadow-2xl scale-105">
          <CardHeader>
            <CardTitle className="text-2xl">Premium Buyer 🚀</CardTitle>
            <p className="text-4xl font-bold">
              R{isYearly ? yearlyPricing.premium.toFixed(2) : monthlyPricing.premium}
              <span className="text-lg">/{isYearly ? 'year' : 'month'}</span>
            </p>
            {isYearly && <p className="text-sm text-green-400">Save 20% with yearly plan!</p>}
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 mt-6">
              <li><FiCheckCircle className="inline mr-2 text-green-300" /> FREE Express Delivery</li>
              <li><FiCheckCircle className="inline mr-2 text-green-300" /> Early Access to Deals</li>
              <li><FiCheckCircle className="inline mr-2 text-green-300" /> 24/7 Premium Support</li>
            </ul>
            <Button
              onClick={() => handleCheckout(isYearly ? yearlyPricing.premium * 100 : monthlyPricing.premium * 100)}  // Price in cents
              className="mt-8 w-full bg-white text-blue-700 hover:bg-gray-200"
            >
              Upgrade Now
            </Button>
          </CardContent>
        </Card>

        {/* Seller Pro */}
        <Card className="shadow-xl border border-gray-200 dark:border-slate-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Seller Pro 💼</CardTitle>
            <p className="text-4xl font-bold text-blue-600 dark:text-yellow-400">
              R{isYearly ? yearlyPricing.seller.toFixed(2) : monthlyPricing.seller}
              <span className="text-lg">/{isYearly ? 'year' : 'month'}</span>
            </p>
            {isYearly && <p className="text-sm text-green-400">Save 20% with yearly plan!</p>}
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 mt-6 text-gray-600 dark:text-gray-300">
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Unlimited Listings</li>
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Featured Ads</li>
              <li><FiCheckCircle className="inline mr-2 text-green-500" /> Dedicated Account Manager</li>
            </ul>
            <Button
              onClick={() => handleCheckout(isYearly ? yearlyPricing.seller * 100 : monthlyPricing.seller * 100)}  // Price in cents
              className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Become a Seller
            </Button>
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

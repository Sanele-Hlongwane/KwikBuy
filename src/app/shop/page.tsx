// src/app/shop/page.tsx
'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { FiMapPin } from 'react-icons/fi';

const ShopPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-yellow-400">🛍️ Welcome to KwikBuy Shop</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Your Mzansi marketplace — Local deals, quick buys 😉</p>
      </header>

      {/* Suggested Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-yellow-400">🔥 Suggested for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example Product */}
          <Card className="hover:scale-105 transition-transform cursor-pointer">
            <CardContent className="p-4">
              <img src="/images/laptop.jpg" alt="Laptop" className="rounded-xl mb-4" />
              <h3 className="font-bold text-lg">MacBook Pro 2022</h3>
              <p className="text-gray-600">R24,999</p>
            </CardContent>
          </Card>

          {/* Repeat Product Cards */}
          {/* ... */}
        </div>
      </section>

      {/* Recently Posted */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-yellow-400 flex items-center gap-2">
          <FiMapPin /> Recently Posted in Your Area
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:scale-105 transition-transform cursor-pointer">
            <CardContent className="p-4">
              <img src="/images/fridge.jpg" alt="Fridge" className="rounded-xl mb-4" />
              <h3 className="font-bold text-lg">LG Double Door Fridge</h3>
              <p className="text-gray-600">R6,500</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-yellow-400">🗂️ Browse by Category</h2>

        {/* Electronics */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">📱 Electronics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-4">
                <img src="/images/phone.jpg" alt="Phone" className="rounded-xl mb-4" />
                <h4 className="font-bold">iPhone 14 Pro</h4>
                <p className="text-gray-600">R18,000</p>
              </CardContent>
            </Card>
            {/* More Electronics */}
          </div>
        </div>

        {/* Furniture */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">🪑 Furniture</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-4">
                <img src="/images/couch.jpg" alt="Couch" className="rounded-xl mb-4" />
                <h4 className="font-bold">Leather Couch Set</h4>
                <p className="text-gray-600">R7,200</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fashion */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">👗 Fashion</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-4">
                <img src="/images/sneakers.jpg" alt="Sneakers" className="rounded-xl mb-4" />
                <h4 className="font-bold">Nike Air Force 1</h4>
                <p className="text-gray-600">R1,500</p>
              </CardContent>
            </Card>
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center mt-16 bg-gray-100 dark:bg-slate-900 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Post your own product 🚀</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Got something to sell? List it now and make that moola! 💰</p>
        <Link href="/post-product">
          <Button className="bg-blue-700 text-white hover:bg-blue-800">Post Product</Button>
        </Link>
      </section>
    </div>
  );
};

export default ShopPage;

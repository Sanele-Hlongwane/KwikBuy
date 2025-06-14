'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { FiShoppingCart, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*').limit(6);
      if (error) console.error('Error fetching products:', error);
      else setProducts(data as Product[]);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-orange-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4 md:px-10 py-20">

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to KwikBuy
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Your ultimate Mzansi marketplace. Discover local gems, shop smart, and support local 🇿🇦🔥.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild className="px-6 py-3 text-lg rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-orange-500 hover:to-pink-500 transition">
            <Link href="/shop">
              <FiShoppingCart className="mr-2" /> Start Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" className="px-6 py-3 text-lg rounded-xl border-yellow-400 dark:border-yellow-500 hover:bg-yellow-100 dark:hover:bg-gray-800 transition">
            <Link href="/about">
              Learn More <FiArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{product.description}</p>
                  <p className="text-lg font-bold text-yellow-500">R {product.price}</p>
                  <Button asChild className="w-full mt-2 bg-yellow-400 hover:bg-orange-500 text-white rounded-lg">
                    <Link href={`/product/${product.id}`}>View Product</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

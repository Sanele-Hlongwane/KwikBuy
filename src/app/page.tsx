// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiTruck, FiShoppingCart, FiDollarSign } from "react-icons/fi";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Home from "@/components/Home";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12">
      <SignedIn>
        <Home/>
      </SignedIn>

      <SignedOut>
        <section className="text-center py-20">
          <h1 className="text-5xl font-extrabold text-blue-700 dark:text-yellow-400 animate__animated animate__fadeInUp">
            Welcome to KwikBuy 🛒
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Mzansi&apos;s #1 E-commerce platform — where shopping meets speed 😎💨
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <Link href="/shop">
              <Button className="bg-blue-700 text-white hover:bg-blue-800">Start Shopping</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline">View Pricing</Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <Card className="shadow-lg">
            <CardHeader>
              <FiTruck size={40} className="text-blue-600" />
              <CardTitle className="mt-4 text-2xl">Fast Delivery</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300">
              We deliver across Mzansi faster than your gogo&apos;s gossip 😅🚚💨
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <FiShoppingCart size={40} className="text-blue-600" />
              <CardTitle className="mt-4 text-2xl">Top Brands</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300">
              From Kasi to Sandton — we got the brands you love 🔥
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <FiDollarSign size={40} className="text-blue-600" />
              <CardTitle className="mt-4 text-2xl">Affordable Deals</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300">
              Shop smart, save big — because your wallet deserves a break too 😂💸
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="mt-24 bg-gray-100 dark:bg-slate-900 p-10 rounded-2xl text-center shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Join thousands of happy shoppers 🚀</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Sign up now and experience the KwikBuy difference — Fast. Easy. Local. 💪
          </p>
          <Link href="/sign-up">
            <Button className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-4 text-lg rounded-xl">
              Create Your Account
            </Button>
          </Link>
        </section>
      </SignedOut>
    </main>
  );
}

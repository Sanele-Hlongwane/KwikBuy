import React from "react";
import Link from "next/link";
import { FiShoppingCart, FiUserCheck, FiHeadphones } from "react-icons/fi";
import { Button } from "@/components/ui/button"; // Assuming you&apos;re using the Button component

const About = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-yellow-400 mb-4">
          About KwikBuy 🛒
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Your Premium Shopping Experience Awaits
        </p>
      </header>

      {/* Intro Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 p-12 text-white rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold mb-6">Welcome to KwikBuy!</h2>
        <p className="text-lg">
          KwikBuy is a premium online shopping platform designed to deliver the most seamless and luxurious shopping experience. Whether it&apos;s the latest gadgets, stylish fashion, or unique home decor, KwikBuy has it all, with unbeatable speed and quality.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          At KwikBuy, our mission is to revolutionize the online shopping experience. We aim to connect shoppers with the best products and sellers worldwide, ensuring the most efficient, secure, and enjoyable shopping experience.
        </p>
      </section>

      {/* Why Choose KwikBuy? Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Why Choose KwikBuy?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <FiShoppingCart className="text-4xl text-blue-600 dark:text-yellow-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Fast Shipping</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Get your orders delivered quickly with our fast and reliable shipping services, ensuring convenience and satisfaction.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <FiUserCheck className="text-4xl text-blue-600 dark:text-yellow-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Secure Payments</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Shop with confidence, knowing that your transactions are secure with our cutting-edge payment systems.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <FiHeadphones className="text-4xl text-blue-600 dark:text-yellow-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">24/7 Support</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our dedicated support team is here for you, anytime you need assistance with your orders or inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 dark:bg-slate-700 py-12 mb-12 rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
          What Our Customers Say
        </h2>
        <div className="flex justify-center space-x-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              &quot;KwikBuy has completely changed the way I shop online. The shipping is fast, and the customer support is top-notch!&quot;
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Sarah M.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loyal Customer</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              &quot;I found everything I needed on KwikBuy! Excellent variety and seamless experience. Highly recommend!&quot;
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">John D.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Happy Shopper</p>
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="bg-blue-600 text-white text-center py-12 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-semibold mb-4">Ready to Start Shopping?</h2>
        <p className="text-lg mb-6">
          Join thousands of happy customers and start shopping with KwikBuy today. Enjoy fast delivery, secure payments, and an unbeatable selection of products!
        </p>
        <Link href="/sign-up">
          <Button className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Contact Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Have any questions or feedback? We&apos;d love to hear from you! Reach out to our team and we&apos;ll get back to you as soon as possible.
        </p>
        <Link href="/contact">
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Contact Us
          </Button>
        </Link>
      </section>
      
    </div>
  );
};

export default About;

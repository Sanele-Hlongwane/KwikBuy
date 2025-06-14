'use client';

import { useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiCheckCircle } from 'react-icons/fi';

type PlanType = {
  key: 'starter' | 'premium' | 'seller';
  name: string;
  price: number;
  priceMonthly?: number;
  priceYearly?: number;
  features: string[];
  emoji: string;
};

const monthlyPricing = { premium: 49, seller: 199 };
const yearlyPricing = { premium: 49 * 12 * 0.8, seller: 199 * 12 * 0.8 };

const plans: PlanType[] = [
  {
    key: "starter",
    name: "Starter Plan",
    price: 0,
    features: ["Access all products", "Standard Delivery", "Customer Support"],
    emoji: "🎉",
  },
  {
    key: "premium",
    name: "Premium Buyer",
    price: monthlyPricing.premium,
    priceMonthly: monthlyPricing.premium,
    priceYearly: yearlyPricing.premium,
    features: ["FREE Express Delivery", "Early Access to Deals", "24/7 Premium Support"],
    emoji: "🚀",
  },
  {
    key: "seller",
    name: "Seller Pro",
    price: monthlyPricing.seller,
    priceMonthly: monthlyPricing.seller,
    priceYearly: yearlyPricing.seller,
    features: ["Unlimited Listings", "Featured Ads", "Dedicated Account Manager"],
    emoji: "💼",
  },
];

// 👑 Stripe URLs properly mapped, like a king’s royal map 📜
const stripeUrls = {
  premium: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PREM_MONTHLY!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_PREM_YEARLY!,
  },
  seller: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_VIP!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_YEARLY_VIP!,
  }
};

export default function PricingPage() {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isYearly, setIsYearly] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSubscription = async () => {
      try {
        const res = await fetch('/api/get-customer-subscription');
        const data = await res.json();
        if (res.ok) {
          setCurrentPlan(data.currentPlan);
        } else {
          toast.error(data.message || "Could not get your current subscription.");
        }
      } catch (err) {
        toast.error("Could not fetch subscription details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const handleCheckout = (plan: PlanType) => {
    if (!user) return openSignIn();

    if (plan.price === 0) {
      toast.info("This plan doesn’t require payment 🥳");
      return;
    }

    const url = stripeUrls[plan.key as 'premium' | 'seller']?.[isYearly ? 'yearly' : 'monthly'];

    if (!url) {
      toast.error("Invalid plan configuration 🤕");
      return;
    }

    const checkoutUrl = `${url}?prefilled_email=${encodeURIComponent(user.emailAddresses[0]?.emailAddress ?? '')}`;
    window.location.href = checkoutUrl;
  };

  const renderPlanCard = (plan: PlanType) => {
    const isCurrent = currentPlan === plan.key || (plan.key === "starter" && currentPlan === "free");
    const highlight = isCurrent;

    return (
      <Card
        key={plan.key}
        className={`transition-all border rounded-2xl shadow-xl p-4 ${
          highlight
            ? 'bg-gradient-to-tr from-gray-400 to-gray-600 text-white scale-105 dark:from-gray-700 dark:to-gray-900'
            : 'bg-white dark:bg-gray-800'
        }`}
      >
        <CardHeader>
          <CardTitle className="text-2xl">{plan.name} {plan.emoji}</CardTitle>
          {plan.price !== 0 && (
            <p className={`text-3xl font-bold ${highlight ? 'text-white' : 'text-blue-700 dark:text-yellow-300'}`}>
              R{(isYearly ? plan.priceYearly : plan.priceMonthly)?.toFixed(2)}
              <span className="text-lg ml-1">{isYearly ? "/year" : "/month"}</span>
            </p>
          )}
          {isYearly && plan.price !== 0 && (
            <p className="text-green-300 text-sm">Save 20% with yearly!</p>
          )}
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 my-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center">
                <FiCheckCircle className="mr-2 text-green-400" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            onClick={() => handleCheckout(plan)}
            disabled={isCurrent}
            className={`w-full ${
              isCurrent
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : highlight
                ? 'bg-white text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCurrent ? "Current Plan ✅" : "Choose Plan"}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-yellow-400 mb-2">💸 Choose Your KwikBuy Plan</h1>
        <p className="text-gray-600 dark:text-gray-300">Premium vibes, honest pricing. Get the best or stay free. 👑</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setIsYearly(!isYearly)}
        >
          {isYearly ? "Switch to Monthly" : "Switch to Yearly"}
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading your subscription... ⏳</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(renderPlanCard)}
        </div>
      )}
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  try {
    console.log("Fetching current user from Clerk...");
    // Fetch the current user from Clerk
    const user = await currentUser();
    console.log("User from Clerk:", user);

    if (!user || !user.id) {
      console.log("User not authenticated or no user ID found.");
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    // Get user email from Clerk
    const userEmail = user.emailAddresses[0]?.emailAddress;
    console.log("User email from Clerk:", userEmail);

    if (!userEmail) {
      console.log("Email not found in Clerk.");
      return NextResponse.json({ error: "Email not found in Clerk." }, { status: 400 });
    }

    // Retrieve the Stripe customer based on the user's email
    console.log("Fetching customer from Stripe...");
    const customers = await stripe.customers.list({
      email: userEmail,  // Searching customers by email
      limit: 1, // We only need the first match
    });

    console.log("Stripe customers found:", customers.data);

    let stripeCustomerId = "";
    let currentPlan = "";

    // Check if we found any customers
    if (customers.data.length > 0) {
      // Customer exists, retrieve the first customer (assuming only one customer per email)
      const customer = customers.data[0];
      stripeCustomerId = customer.id;
      console.log("Stripe customer found:", customer);

      // Get the latest subscription associated with this customer
      console.log("Fetching subscriptions from Stripe...");
      const subscriptions = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        status: "active",
        limit: 1,
      });

      console.log("Stripe subscriptions found:", subscriptions.data);

      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        currentPlan = subscription.items.data[0].plan.nickname || "Unknown Plan"; // Assuming the plan name is stored in 'nickname'
        console.log("Current plan from Stripe:", currentPlan);
      } else {
        console.log("No active subscriptions found for this customer.");
        return NextResponse.json({ error: "No active subscriptions found." }, { status: 400 });
      }
    } else {
      // If no customer found, create a new Stripe customer
      console.log("Creating new Stripe customer...");
      const newCustomer = await stripe.customers.create({
        email: userEmail,
        name: user.firstName || "Unknown",  // If no name, default to "Unknown"
      });

      stripeCustomerId = newCustomer.id;
      console.log("New Stripe customer created:", newCustomer);

      // Create a new subscription or handle other logic if needed
      const newSubscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{ price: process.env.STRIPE_BASIC_PLAN_ID as string }], // Assuming you have a basic plan ID in your Stripe
      });

      currentPlan = newSubscription.items.data[0].plan.nickname || "Basic Plan";
      console.log("New subscription created:", newSubscription);
    }

    // 🔍 Check if user exists in the database
    console.log("Checking if user exists in the database...");
    let existingUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!existingUser) {
      console.log("User not found in database. Creating new user...");
      // 🆕 Create user if not exists
      existingUser = await prisma.user.create({
        data: {
          clerkUserId: user.id,
          email: userEmail, // Using the email from Clerk
          name: user.firstName || "Unknown", // Default to "Unknown" if no name
          imageUrl: user.imageUrl || "", // Using the profile image URL from Clerk
          stripeCustomerId: stripeCustomerId,
          currentPlan: currentPlan,
          isActive: true, // Mark as active
        },
      });
      console.log("New user created in database:", existingUser);
    } else {
      console.log("User exists in database. Updating user...");
      // 🔄 Update existing user with Stripe details
      existingUser = await prisma.user.update({
        where: { clerkUserId: user.id },
        data: {
          stripeCustomerId: stripeCustomerId,
          currentPlan: currentPlan,
          isActive: true, // Mark as active
        },
      });
      console.log("User updated in database:", existingUser);
    }

    return NextResponse.json({ message: "Subscription updated", user: existingUser }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/subscription/success:", error);  // Log the error here
    return NextResponse.json({ error: "Internal Server Error", details: error.message || error }, { status: 500 });
  }
}

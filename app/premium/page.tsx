"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Check, Crown, ShoppingCart, Star } from "lucide-react";

export default function PremiumPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Crown className="w-4 h-4" />
            Premium Membership
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Unlock the Full Flavor of{" "}
            <span className="text-orange-500">RecipeBox</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Ad-free experience, meal planning, nutrition insights, and exclusive
            recipes — all in one premium plan.
          </p>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <Image
              src="/hero-dashboard.jpg"
              alt="RecipeBox Premium Dashboard"
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">
                Plan, Cook, Enjoy — Stress Free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-md mx-auto bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">RecipeBox Premium</h2>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-5xl font-bold mb-1">₹299</p>
              <p className="text-sm opacity-90">per month</p>
              <p className="text-xs mt-2 opacity-80">Cancel anytime</p>
            </div>

            <button className="w-full bg-white text-orange-600 font-bold py-4 rounded-full mt-8 hover:bg-yellow-50 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Start Premium Trial
            </button>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Ad-free browsing",
                "Weekly meal planner",
                "Auto grocery list",
                "Nutrition breakdown per recipe",
                "Save unlimited cookbooks",
                "Priority support",
                "Exclusive premium recipes",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-yellow-300" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Go Premium?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Meal Planner Pro",
                desc: "Drag & drop recipes into your weekly calendar. Auto-generate shopping lists.",
                img: "/meal-planner.jpg",
              },
              {
                title: "Nutrition Insights",
                desc: "Calories, macros, allergens — know exactly what you're eating.",
                img: "/nutrition-insights.jpg",
              },
              {
                title: "Unlimited Saves",
                desc: "No limits. Save every recipe you love in custom cookbooks.",
                img: "/unlimited-saves.jpg",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Level Up Your Cooking?
          </h2>
          <p className="text-xl mb-10">
            Join 50,000+ home chefs who cook smarter with Premium.
          </p>
          <button className="bg-white text-orange-600 font-bold text-lg px-10 py-4 rounded-full hover:bg-yellow-100 transition-colors inline-flex items-center gap-3">
            <Crown className="w-6 h-6" />
            Get Premium Now – 7 Days Free
          </button>
          <p className="mt-6 text-sm opacity-80">
            No card required • Instant access
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 RecipeBox. Made with love for food lovers.</p>
          <p className="text-xs mt-2">Premium images hosted locally</p>
        </div>
      </footer>
    </>
  );
}

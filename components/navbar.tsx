// components/navbar.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useRecipeStore } from "@/hooks/use-recipe-store";

export function Navbar() {
  const router = useRouter();
  const { currentUser, saveCurrentUser } = useRecipeStore();

  const handleLogout = () => {
    saveCurrentUser(null);
    router.push("/login");
  };

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="font-bold text-lg text-gray-900">RecipeBox</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-gray-700 hover:text-orange-600 transition">
              About
            </Link>

            {currentUser ? (
              <>
                <Link href="/recipes" className="text-sm text-gray-700 hover:text-orange-600 transition">
                  Browse
                </Link>
                <Link href="/upload" className="text-sm text-gray-700 hover:text-orange-600 transition">
                  Share
                </Link>
                <Link href="/saved" className="text-sm text-gray-700 hover:text-orange-600 transition">
                  Saved
                </Link>
                <Link href="/profile" className="text-sm text-gray-700 hover:text-orange-600 transition">
                  Profile
                </Link>
                <Link href="/premium" className="text-sm font-medium text-orange-600 hover:text-orange-700 transition">
                  Premium
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-700">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
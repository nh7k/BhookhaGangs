"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useRecipeStore } from "@/hooks/use-recipe-store"

export function Navbar() {
  const router = useRouter()
  const { currentUser, saveCurrentUser } = useRecipeStore()

  const handleLogout = () => {
    saveCurrentUser(null)
    router.push("/login")
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              R
            </div>
            <span className="font-bold text-lg">RecipeBox</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm hover:text-primary transition">
              About
            </Link>
            {currentUser ? (
              <>
                <Link href="/recipes" className="text-sm hover:text-primary transition">
                  Browse
                </Link>
                <Link href="/upload" className="text-sm hover:text-primary transition">
                  Share Recipe
                </Link>
                <Link href="/saved" className="text-sm hover:text-primary transition">
                  Saved
                </Link>
                <Link href="/profile" className="text-sm hover:text-primary transition">
                  Profile
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

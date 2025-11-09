"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import { useRecipeStore } from "@/hooks/use-recipe-store"

export default function Home() {
  const router = useRouter()
  const { currentUser } = useRecipeStore()

  const handleExplore = () => {
    if (currentUser) {
      router.push("/recipes")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 text-pretty">Share Your Culinary Creations</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover, share, and save recipes from food lovers around the world. Build your perfect cookbook.
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-16">
            <Button size="lg" onClick={handleExplore}>
              Explore Recipes
            </Button>
            {!currentUser && (
              <Link href="/signup">
                <Button size="lg" variant="outline">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          <img
            src="/beautiful-food-and-recipes.jpg"
            alt="Recipe inspiration"
            className="w-full rounded-lg shadow-lg mb-16"
          />
        </section>

        {/* Features Section */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Discover</CardTitle>
              <CardDescription>Browse thousands of recipes from our community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Explore a diverse collection of recipes across all cuisines and dietary preferences. Filter by
                difficulty, prep time, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Share</CardTitle>
              <CardDescription>Contribute your own recipes to the community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Upload your favorite recipes and share your culinary expertise. Engage with other food enthusiasts and
                build your following.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Save</CardTitle>
              <CardDescription>Build your personal collection of favorite recipes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Create your own cookbook by saving recipes you love. Organize and access them anytime you need
                inspiration.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        {!currentUser && (
          <section className="py-16 bg-card border border-border rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Recipe Community</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Start sharing and discovering recipes today. It's free and easy.
            </p>
            <Link href="/signup">
              <Button size="lg">Sign Up Now</Button>
            </Link>
          </section>
        )}
      </main>
    </div>
  )
}

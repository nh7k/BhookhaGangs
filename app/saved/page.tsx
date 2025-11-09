"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { RecipeCard } from "@/components/recipe-card"
import Link from "next/link"
import { BookmarkIcon } from "lucide-react"
import { useEffect } from "react"

export default function SavedPage() {
  const router = useRouter()
  const { currentUser, isLoaded, recipes, likeRecipe, saveRecipeToBookmark } = useRecipeStore()

  useEffect(() => {
    if (isLoaded && !currentUser) {
      router.push("/login")
    }
  }, [isLoaded, currentUser, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  const savedRecipes = recipes.filter((r) => r.savedBy.includes(currentUser.id))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookmarkIcon className="w-8 h-8" />
          My Cookbook
        </h1>
        <p className="text-muted-foreground mb-8">Your collection of saved recipes</p>

        {savedRecipes.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">Your cookbook is empty</p>
              <p className="text-sm text-muted-foreground mb-6">
                Save recipes as you explore to build your personal collection
              </p>
              <Link href="/recipes">
                <Button>Explore Recipes</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isLiked={recipe.likedBy.includes(currentUser.id)}
                isSaved={recipe.savedBy.includes(currentUser.id)}
                onLike={() => likeRecipe(recipe.id)}
                onSave={() => saveRecipeToBookmark(recipe.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

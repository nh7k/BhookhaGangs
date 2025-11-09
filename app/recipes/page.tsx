"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { RecipeCard } from "@/components/recipe-card"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { Search } from "lucide-react"

export default function RecipesPage() {
  const router = useRouter()
  const { recipes, currentUser, isLoaded, likeRecipe, saveRecipeToBookmark } = useRecipeStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all")
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "trending">("recent")

  const filtered = useMemo(() => {
    const result = recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDifficulty = difficulty === "all" || recipe.difficulty === difficulty
      return matchesSearch && matchesDifficulty
    })

    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.likes - a.likes)
    } else if (sortBy === "trending") {
      result.sort((a, b) => b.likes + b.comments.length - (a.likes + a.comments.length))
    }

    return result
  }, [recipes, searchQuery, difficulty, sortBy])

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Recipes</h1>
          <p className="text-muted-foreground">Discover amazing recipes from our community</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Search recipes</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, ingredient, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No recipes found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isLiked={currentUser ? recipe.likedBy.includes(currentUser.id) : false}
                isSaved={currentUser ? recipe.savedBy.includes(currentUser.id) : false}
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

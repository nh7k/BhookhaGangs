"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { Heart, BookmarkIcon, Clock, Users, ChefHat, MessageCircle, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { recipes, currentUser, likeRecipe, saveRecipeToBookmark, addComment, rateRecipe } = useRecipeStore()
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const recipe = recipes.find((r) => r.id === params.id)
  const author = recipe?.authorId

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Recipe not found</h1>
            <Button onClick={() => router.push("/recipes")} className="mt-4">
              Back to recipes
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const isLiked = currentUser ? recipe.likedBy.includes(currentUser.id) : false
  const isSaved = currentUser ? recipe.savedBy.includes(currentUser.id) : false
  const userRating = currentUser ? recipe.ratings.find((r) => r.userId === currentUser.id) : undefined
  const avgRating =
    recipe.ratings.length > 0
      ? (recipe.ratings.reduce((acc, r) => acc + r.rating, 0) / recipe.ratings.length).toFixed(1)
      : null

  const handleAddComment = () => {
    if (comment.trim() && currentUser) {
      addComment(recipe.id, comment)
      setComment("")
    }
  }

  const handleRateRecipe = (newRating: number) => {
    if (currentUser) {
      rateRecipe(recipe.id, newRating)
      setRating(newRating)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <div className="mb-8 h-96 rounded-lg overflow-hidden bg-muted">
          <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-full object-cover" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
            <Link href={`/user/${recipe.authorId}`}>
              <p className="text-lg text-primary hover:underline cursor-pointer">by {recipe.author}</p>
            </Link>
          </div>
          <div className="flex gap-2">
            {currentUser && (
              <>
                <Button variant={isLiked ? "default" : "outline"} size="icon" onClick={() => likeRecipe(recipe.id)}>
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button
                  variant={isSaved ? "default" : "outline"}
                  size="icon"
                  onClick={() => saveRecipeToBookmark(recipe.id)}
                >
                  <BookmarkIcon className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{recipe.prepTime + recipe.cookTime}</p>
                  <p className="text-sm text-muted-foreground">minutes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{recipe.servings}</p>
                  <p className="text-sm text-muted-foreground">servings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-2">
                    <ChefHat className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold capitalize">{recipe.difficulty[0]}</p>
                  <p className="text-sm text-muted-foreground">{recipe.difficulty}</p>
                </CardContent>
              </Card>
            </div>

            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="font-bold text-primary min-w-8">{index + 1}.</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Likes</span>
                  <span className="font-semibold">{recipe.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Comments</span>
                  <span className="font-semibold">{recipe.comments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saves</span>
                  <span className="font-semibold">{recipe.savedBy.length}</span>
                </div>
                {avgRating && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold flex items-center gap-1">
                      {avgRating}
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Rating */}
            {currentUser && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rate this recipe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRateRecipe(star)}
                        className="transition"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (hoverRating || userRating?.rating || 0)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Comments Section */}
        {currentUser && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              <div className="space-y-3 border-b pb-6">
                <label className="block text-sm font-medium">Add your comment</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddComment} disabled={!comment.trim()}>
                    Post
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {recipe.comments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
                ) : (
                  recipe.comments.map((cmt) => (
                    <div key={cmt.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between mb-2">
                        <p className="font-semibold">{cmt.userName}</p>
                        <p className="text-xs text-muted-foreground">{new Date(cmt.createdAt).toLocaleDateString()}</p>
                      </div>
                      <p className="text-sm">{cmt.text}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

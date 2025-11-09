"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { RecipeCard } from "@/components/recipe-card"
import { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser, isLoaded, recipes, saveCurrentUser, likeRecipe, saveRecipeToBookmark, deleteRecipe } = useRecipeStore()
  const [isEditing, setIsEditing] = useState(false)
  const [bioEdit, setBioEdit] = useState("")

  useEffect(() => {
    if (isLoaded && !currentUser) {
      router.push("/login")
    } else if (currentUser) {
      setBioEdit(currentUser.bio || "")
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

  const userRecipes = recipes.filter((r) => r.authorId === currentUser.id)
  const updateBio = () => {
    if (currentUser) {
      saveCurrentUser({ ...currentUser, bio: bioEdit })
      setIsEditing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-8">
            <div className="flex gap-6 items-start">
              <img
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={bioEdit}
                      onChange={(e) => setBioEdit(e.target.value)}
                      placeholder="Add a bio..."
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={updateBio}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-4">{bioEdit || "No bio yet. Tell us about yourself!"}</p>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{userRecipes.length}</p>
              <p className="text-sm text-muted-foreground mt-2">Recipes Shared</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{currentUser.followers.length}</p>
              <p className="text-sm text-muted-foreground mt-2">Followers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{currentUser.following.length}</p>
              <p className="text-sm text-muted-foreground mt-2">Following</p>
            </CardContent>
          </Card>
        </div>

        {/* My Recipes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            My Recipes
          </h2>
          {userRecipes.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't shared any recipes yet</p>
                <Link href="/upload">
                  <Button>Share Your First Recipe</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isLiked={recipe.likedBy.includes(currentUser.id)}
                  isSaved={recipe.savedBy.includes(currentUser.id)}
                  onLike={() => likeRecipe(recipe.id)}
                  onSave={() => saveRecipeToBookmark(recipe.id)}
                  onEdit={() => router.push(`/recipe/edit/${recipe.id}`)}
                  onDelete={() => deleteRecipe(recipe.id)}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recently Joined */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            Joined {new Date(currentUser.joinedAt).toLocaleDateString()}
          </p>
        </div>
      </main>
    </div>
  )
}

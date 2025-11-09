"use client"

import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { RecipeCard } from "@/components/recipe-card"
import { useState, useMemo } from "react"
import { BookOpen } from "lucide-react"

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { users, recipes, currentUser, saveUsers, saveCurrentUser, likeRecipe, saveRecipeToBookmark } = useRecipeStore()
  const [isFollowing, setIsFollowing] = useState(false)

  const profileUser = users.find((u) => u.id === params.id)
  const userRecipes = useMemo(() => recipes.filter((r) => r.authorId === params.id), [recipes, params.id])

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">User not found</h1>
            <Button onClick={() => router.push("/recipes")} className="mt-4">
              Back to recipes
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const isCurrentUser = currentUser?.id === profileUser.id
  const isUserFollowing = currentUser ? currentUser.following.includes(profileUser.id) : false

  const handleFollowToggle = () => {
    if (!currentUser) return

    const updatedCurrentUser = { ...currentUser }
    if (isUserFollowing) {
      updatedCurrentUser.following = updatedCurrentUser.following.filter((id) => id !== profileUser.id)
    } else {
      updatedCurrentUser.following = [...updatedCurrentUser.following, profileUser.id]
    }
    saveCurrentUser(updatedCurrentUser)

    const updatedProfileUser = { ...profileUser }
    if (isUserFollowing) {
      updatedProfileUser.followers = updatedProfileUser.followers.filter((id) => id !== currentUser.id)
    } else {
      updatedProfileUser.followers = [...updatedProfileUser.followers, currentUser.id]
    }

    const updatedUsers = users.map((u) => (u.id === profileUser.id ? updatedProfileUser : u))
    saveUsers(updatedUsers)
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
                src={profileUser.avatar || "/placeholder.svg"}
                alt={profileUser.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{profileUser.name}</h1>
                <p className="text-muted-foreground mb-4">{profileUser.bio || "No bio yet"}</p>
                {!isCurrentUser && currentUser && (
                  <Button onClick={handleFollowToggle} variant={isUserFollowing ? "outline" : "default"}>
                    {isUserFollowing ? "Following" : "Follow"}
                  </Button>
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
              <p className="text-3xl font-bold text-primary">{profileUser.followers.length}</p>
              <p className="text-sm text-muted-foreground mt-2">Followers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{profileUser.following.length}</p>
              <p className="text-sm text-muted-foreground mt-2">Following</p>
            </CardContent>
          </Card>
        </div>

        {/* Recipes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Recipes
          </h2>
          {userRecipes.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">{profileUser.name} hasn't shared any recipes yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isLiked={recipe.likedBy.includes(currentUser?.id || "")}
                  isSaved={recipe.savedBy.includes(currentUser?.id || "")}
                  onLike={() => likeRecipe(recipe.id)}
                  onSave={() => saveRecipeToBookmark(recipe.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

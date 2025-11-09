"use client"

import type { Recipe } from "@/hooks/use-recipe-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, BookmarkIcon, Clock, Users, MoreVertical, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface RecipeCardProps {
  recipe: Recipe
  isLiked: boolean
  isSaved: boolean
  onLike: () => void
  onSave: () => void
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
}

export function RecipeCard({ recipe, isLiked, isSaved, onLike, onSave, onEdit, onDelete, showActions = false }: RecipeCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const avgRating =
    recipe.ratings.length > 0
      ? (recipe.ratings.reduce((acc, r) => acc + r.rating, 0) / recipe.ratings.length).toFixed(1)
      : null

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition">
        <div className="relative h-48 bg-muted">
          <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white" onClick={onLike}>
              <Heart className={`w-4 h-4 ${isLiked ? "fill-destructive text-destructive" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white" onClick={onSave}>
              <BookmarkIcon className={`w-4 h-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
            </Button>
            {showActions && (onEdit || onDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && (
                    <DropdownMenuItem onClick={onEdit}>
                      <Edit className="w-4 h-4" />
                      <span>Edit Recipe</span>
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Recipe</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

      <CardHeader className="pb-3">
        <Link href={`/recipe/${recipe.id}`}>
          <CardTitle className="line-clamp-2 hover:text-primary cursor-pointer transition">{recipe.title}</CardTitle>
        </Link>
        <CardDescription className="text-xs">by {recipe.author}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{recipe.servings} servings</span>
          </div>
          <span className="px-2 py-1 rounded bg-muted text-xs font-medium capitalize">{recipe.difficulty}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm">
            <span className="font-semibold">{recipe.likes}</span>
            <span className="text-muted-foreground"> likes</span>
          </div>
          {avgRating && (
            <div className="text-sm">
              <span className="font-semibold">{avgRating}</span>
              <span className="text-muted-foreground">★</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>

    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{recipe.title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { uploadImageToCloudinary, validateImageFile } from "@/lib/cloudinary"
import { Upload, X } from "lucide-react"

export default function EditRecipePage() {
  const params = useParams()
  const router = useRouter()
  const { recipes, currentUser, isLoaded, updateRecipe } = useRecipeStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    servings: 4,
    prepTime: 15,
    cookTime: 30,
    difficulty: "medium" as const,
    image: "",
  })
  const [ingredients, setIngredients] = useState<string[]>([])
  const [instructions, setInstructions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState<string>("")

  const recipe = recipes.find((r) => r.id === params.id)

  useEffect(() => {
    if (isLoaded && !currentUser) {
      router.push("/login")
    }
  }, [isLoaded, currentUser, router])

  useEffect(() => {
    if (recipe) {
      if (recipe.authorId !== currentUser?.id) {
        router.push("/profile")
        return
      }
      setFormData({
        title: recipe.title,
        description: recipe.description,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        difficulty: recipe.difficulty,
        image: recipe.image || "",
      })
      setIngredients(recipe.ingredients)
      setInstructions(recipe.instructions)
      setImagePreview(recipe.image || "")
    }
  }, [recipe, currentUser, router])

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

  if (!currentUser || !recipe) {
    return null
  }

  if (recipe.authorId !== currentUser.id) {
    return null
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleIngredientsChange = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const handleInstructionsChange = (index: number, value: string) => {
    const newInstructions = [...instructions]
    newInstructions[index] = value
    setInstructions(newInstructions)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ""])
  }

  const addInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError("")

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setUploadError(validation.error || "Invalid image file")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setImageFile(file)

    // Upload to Cloudinary
    setIsUploadingImage(true)
    try {
      const result = await uploadImageToCloudinary(file)
      setFormData((prev) => ({ ...prev, image: result.secure_url }))
      setUploadError("")
    } catch (error) {
      setUploadError("Failed to upload image. Please try again.")
      setImagePreview(formData.image || "")
      setImageFile(null)
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview("")
    setImageFile(null)
    setFormData((prev) => ({ ...prev, image: "" }))
    setUploadError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    setUploadError("")

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setUploadError(validation.error || "Invalid image file")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setImageFile(file)

    // Upload to Cloudinary
    setIsUploadingImage(true)
    try {
      const result = await uploadImageToCloudinary(file)
      setFormData((prev) => ({ ...prev, image: result.secure_url }))
      setUploadError("")
    } catch (error) {
      setUploadError("Failed to upload image. Please try again.")
      setImagePreview(formData.image || "")
      setImageFile(null)
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const filteredIngredients = ingredients.filter((i) => i.trim())
    const filteredInstructions = instructions.filter((i) => i.trim())

    if (!formData.title || filteredIngredients.length === 0 || filteredInstructions.length === 0) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    updateRecipe(recipe.id, {
      title: formData.title,
      description: formData.description,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      servings: formData.servings,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      difficulty: formData.difficulty,
      image: formData.image || recipe.image || "/placeholder.svg",
    })

    router.push(`/recipe/${recipe.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Recipe</h1>
          <p className="text-muted-foreground">Update your recipe details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Image</CardTitle>
              <CardDescription>Upload a photo of your delicious recipe</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isUploadingImage}
                />
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg object-cover"
                    />
                    {!isUploadingImage && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveImage()
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="py-8">
                    {isUploadingImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="text-sm text-muted-foreground">Uploading image...</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm font-medium mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
              {uploadError && (
                <p className="text-sm text-destructive mt-2">{uploadError}</p>
              )}
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Recipe Title *</label>
                <Input
                  required
                  placeholder="e.g., Classic Margherita Pizza"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Describe your recipe..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Servings</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.servings}
                    onChange={(e) => handleInputChange("servings", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Prep Time (min)</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.prepTime}
                    onChange={(e) => handleInputChange("prepTime", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cook Time (min)</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.cookTime}
                    onChange={(e) => handleInputChange("cookTime", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange("difficulty", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    aria-label="Recipe difficulty level"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients *</CardTitle>
              <CardDescription>List all ingredients needed for your recipe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => handleIngredientsChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {ingredients.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addIngredient} className="w-full bg-transparent">
                + Add Ingredient
              </Button>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions *</CardTitle>
              <CardDescription>Step-by-step directions for making your recipe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <span className="font-bold text-primary min-w-8 pt-2">{index + 1}.</span>
                  <textarea
                    placeholder={`Step ${index + 1}`}
                    value={instruction}
                    onChange={(e) => handleInstructionsChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    rows={2}
                  />
                  {instructions.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeInstruction(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addInstruction} className="w-full bg-transparent">
                + Add Step
              </Button>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}


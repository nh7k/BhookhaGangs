"use client"

import { useState, useCallback, useEffect } from "react"

export interface Recipe {
  id: string
  title: string
  description: string
  author: string
  authorId: string
  ingredients: string[]
  instructions: string[]
  servings: number
  prepTime: number
  cookTime: number
  difficulty: "easy" | "medium" | "hard"
  image: string
  createdAt: string
  likes: number
  likedBy: string[]
  saved: boolean
  savedBy: string[]
  ratings: { userId: string; rating: number }[]
  comments: { id: string; userId: string; userName: string; text: string; createdAt: string }[]
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  bio: string
  avatar: string
  recipes: string[]
  savedRecipes: string[]
  followers: string[]
  following: string[]
  joinedAt: string
}

const RECIPES_KEY = "recipebox_recipes"
const USERS_KEY = "recipebox_users"
const CURRENT_USER_KEY = "recipebox_current_user"

const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Homemade Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella and basil",
    author: "Maria Rossi",
    authorId: "user1",
    ingredients: ["Flour", "Tomatoes", "Mozzarella", "Basil", "Olive Oil", "Salt"],
    instructions: ["Make dough", "Let rise", "Add toppings", "Bake at 450F for 15 min"],
    servings: 2,
    prepTime: 30,
    cookTime: 15,
    difficulty: "medium",
    image: "/margherita-pizza.png",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    likedBy: [],
    saved: false,
    savedBy: [],
    ratings: [],
    comments: [],
  },
  {
    id: "2",
    title: "Chocolate Chip Cookies",
    description: "Soft and chewy cookies loaded with chocolate chips",
    author: "Sarah Baker",
    authorId: "user2",
    ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Chocolate Chips", "Vanilla"],
    instructions: ["Cream butter and sugar", "Add eggs", "Mix in flour", "Fold in chips", "Bake at 375F for 10 min"],
    servings: 24,
    prepTime: 15,
    cookTime: 10,
    difficulty: "easy",
    image: "/chocolate-chip-cookies.png",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    likedBy: [],
    saved: false,
    savedBy: [],
    ratings: [],
    comments: [],
  },
  {
    id: "3",
    title: "Thai Green Curry",
    description: "Spicy and aromatic Thai curry with coconut milk",
    author: "Chef Anong",
    authorId: "user3",
    ingredients: ["Green Curry Paste", "Coconut Milk", "Chicken", "Bell Peppers", "Basil", "Fish Sauce"],
    instructions: ["Heat curry paste", "Add coconut milk", "Cook chicken", "Add vegetables", "Simmer 15 minutes"],
    servings: 4,
    prepTime: 20,
    cookTime: 20,
    difficulty: "hard",
    image: "/thai-green-curry.png",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 18,
    likedBy: [],
    saved: false,
    savedBy: [],
    ratings: [],
    comments: [],
  },
]

const mockUsers: User[] = [
  {
    id: "user1",
    email: "maria@example.com",
    password: "password123",
    name: "Maria Rossi",
    bio: "Italian food enthusiast and home chef",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    recipes: ["1"],
    savedRecipes: [],
    followers: [],
    following: [],
    joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "user2",
    email: "sarah@example.com",
    password: "password123",
    name: "Sarah Baker",
    bio: "Professional baker and dessert lover",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    recipes: ["2"],
    savedRecipes: [],
    followers: [],
    following: [],
    joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "user3",
    email: "anong@example.com",
    password: "password123",
    name: "Chef Anong",
    bio: "Thai cuisine expert and culinary teacher",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anong",
    recipes: ["3"],
    savedRecipes: [],
    followers: [],
    following: [],
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "user4",
    email: "feceba2677@wacold.com",
    password: "nitishkumar@123",
    name: "Nitish Kumar",
    bio: "Food enthusiast and recipe collector",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nitish",
    recipes: [],
    savedRecipes: [],
    followers: [],
    following: [],
    joinedAt: new Date().toISOString(),
  },
]

export function useRecipeStore() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(RECIPES_KEY)
    const storedUsers = localStorage.getItem(USERS_KEY)
    const storedCurrentUser = localStorage.getItem(CURRENT_USER_KEY)

    setRecipes(stored ? JSON.parse(stored) : mockRecipes)
    setUsers(storedUsers ? JSON.parse(storedUsers) : mockUsers)
    setCurrentUser(storedCurrentUser ? JSON.parse(storedCurrentUser) : null)
    setIsLoaded(true)
  }, [])

  const saveRecipes = useCallback((newRecipes: Recipe[]) => {
    setRecipes(newRecipes)
    localStorage.setItem(RECIPES_KEY, JSON.stringify(newRecipes))
  }, [])

  const saveUsers = useCallback((newUsers: User[]) => {
    setUsers(newUsers)
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsers))
  }, [])

  const saveCurrentUser = useCallback((user: User | null) => {
    setCurrentUser(user)
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }, [])

  const createRecipe = useCallback(
    (recipe: Omit<Recipe, "id" | "createdAt" | "likes" | "likedBy" | "saved" | "savedBy" | "ratings" | "comments">) => {
      const newRecipe: Recipe = {
        ...recipe,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        saved: false,
        savedBy: [],
        ratings: [],
        comments: [],
      }
      saveRecipes([...recipes, newRecipe])
      return newRecipe
    },
    [recipes, saveRecipes],
  )

  const updateRecipe = useCallback(
    (id: string, updates: Partial<Recipe>) => {
      const updated = recipes.map((r) => (r.id === id ? { ...r, ...updates } : r))
      saveRecipes(updated)
    },
    [recipes, saveRecipes],
  )

  const deleteRecipe = useCallback(
    (id: string) => {
      saveRecipes(recipes.filter((r) => r.id !== id))
    },
    [recipes, saveRecipes],
  )

  const likeRecipe = useCallback(
    (recipeId: string) => {
      if (!currentUser) return
      const recipe = recipes.find((r) => r.id === recipeId)
      if (!recipe) return

      const isLiked = recipe.likedBy.includes(currentUser.id)
      const updated = recipes.map((r) => {
        if (r.id === recipeId) {
          return {
            ...r,
            likes: isLiked ? r.likes - 1 : r.likes + 1,
            likedBy: isLiked ? r.likedBy.filter((id) => id !== currentUser.id) : [...r.likedBy, currentUser.id],
          }
        }
        return r
      })
      saveRecipes(updated)
    },
    [recipes, currentUser, saveRecipes],
  )

  const saveRecipeToBookmark = useCallback(
    (recipeId: string) => {
      if (!currentUser) return
      const recipe = recipes.find((r) => r.id === recipeId)
      if (!recipe) return

      const isSaved = recipe.savedBy.includes(currentUser.id)
      const updated = recipes.map((r) => {
        if (r.id === recipeId) {
          return {
            ...r,
            savedBy: isSaved ? r.savedBy.filter((id) => id !== currentUser.id) : [...r.savedBy, currentUser.id],
          }
        }
        return r
      })
      saveRecipes(updated)

      const updatedUser = {
        ...currentUser,
        savedRecipes: isSaved
          ? currentUser.savedRecipes.filter((id) => id !== recipeId)
          : [...currentUser.savedRecipes, recipeId],
      }
      saveCurrentUser(updatedUser)
    },
    [recipes, currentUser, saveRecipes, saveCurrentUser],
  )

  const addComment = useCallback(
    (recipeId: string, text: string) => {
      if (!currentUser) return
      const comment = {
        id: Math.random().toString(36).substr(2, 9),
        userId: currentUser.id,
        userName: currentUser.name,
        text,
        createdAt: new Date().toISOString(),
      }
      const updated = recipes.map((r) => (r.id === recipeId ? { ...r, comments: [...r.comments, comment] } : r))
      saveRecipes(updated)
    },
    [recipes, currentUser, saveRecipes],
  )

  const rateRecipe = useCallback(
    (recipeId: string, rating: number) => {
      if (!currentUser) return
      const updated = recipes.map((r) => {
        if (r.id === recipeId) {
          const existingRating = r.ratings.find((rat) => rat.userId === currentUser.id)
          if (existingRating) {
            existingRating.rating = rating
          } else {
            r.ratings.push({ userId: currentUser.id, rating })
          }
        }
        return r
      })
      saveRecipes(updated)
    },
    [recipes, currentUser, saveRecipes],
  )

  return {
    recipes,
    users,
    currentUser,
    isLoaded,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    likeRecipe,
    saveRecipeToBookmark,
    addComment,
    rateRecipe,
    saveRecipes,
    saveUsers,
    saveCurrentUser,
  }
}

"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Lightbulb, Heart, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About RecipeBox</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A community-driven platform where food enthusiasts connect, share, and discover amazing recipes from around
            the world.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <Card>
            <CardContent className="pt-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                RecipeBox exists to celebrate the joy of cooking and bring food lovers together. We believe that recipes
                are more than just ingredients and instructions—they're stories, traditions, and connections. Our
                mission is to create a welcoming space where anyone can share their culinary creations, discover new
                flavors, and build a community around the love of food.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-primary" />
                  <CardTitle>Community First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're built on the belief that our community members are our greatest asset. Every recipe, comment,
                  and interaction strengthens our collective food knowledge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <CardTitle>Creativity & Innovation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We celebrate culinary creativity in all its forms, whether it's traditional recipes or bold new
                  experiments. Innovation in the kitchen is what keeps cooking exciting.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-primary" />
                  <CardTitle>Inclusivity & Respect</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  RecipeBox welcomes everyone, regardless of cooking skill, cultural background, or dietary preferences.
                  We're a judgment-free zone where all recipes are valued.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-6 h-6 text-primary" />
                  <CardTitle>Global Connection</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Food transcends borders. Through RecipeBox, we connect people across the world and celebrate the
                  diverse culinary traditions that make our world rich.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">How RecipeBox Works</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Create an Account</h3>
                    <p className="text-muted-foreground">
                      Sign up to join our community and start sharing your favorite recipes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Explore & Discover</h3>
                    <p className="text-muted-foreground">
                      Browse recipes from our community, filter by difficulty and cuisine, and save your favorites.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Share Your Recipes</h3>
                    <p className="text-muted-foreground">
                      Upload your recipes with ingredients, instructions, and photos. Share your culinary creations with
                      thousands of food lovers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Connect & Engage</h3>
                    <p className="text-muted-foreground">
                      Like recipes, leave comments, rate dishes, and follow other food enthusiasts to stay inspired.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

🍽️ RecipeBox

A Collaborative & Fun Recipe Sharing Platform

Discover, share, and save delicious recipes in a warm and friendly community of food lovers!
Built with Next.js, React, and Tailwind CSS for a smooth, modern, and responsive experience.

✨ Key Features
🔐 User Authentication

Easy Login & Signup

Demo Mode → Use ANY email + password to enter 🚀

Persistent session using localStorage

🍲 Recipe Discovery

Beautiful recipe cards with images

Search recipes by name or ingredients

Filter by Easy / Medium / Hard

Sort by Trending / Popular / Latest

Smooth infinite browsing experience

🧑‍🍳 Recipe Sharing

Upload your own recipes

Add ingredients, steps, cooking time & servings

Supports detailed instructions + cuisine tagging

❤️ Social Interaction
Action	Description
⭐ Save Recipes	Add recipes to your personal cookbook
💬 Comments	Share feedback with other cooks
👍 Like	Show appreciation
🧑‍🤝‍🧑 Follow Users	Stay connected with food creators
🌈 User Experience

Mobile Responsive

Dark / Light mode

Warm, cozy UI with smooth animations

Helpful empty-state pages 🍞

🛠️ Installation
git clone <your_repo_link>
cd recipebox
npm install
npm run dev


Open 👉(https://bhookha-gangs.vercel.app/)

🔑 Demo Login
Field	Value (example)
Email	demo@example.com
Password	anything123

✨ Any email + password works! No real auth required.

📁 Project Structure
app/
│ layout.tsx
│ page.tsx
├─ login/
├─ signup/
├─ recipes/
├─ recipe/[id]/
├─ upload/
├─ profile/
├─ saved/
├─ user/[id]/
└─ about/

components/
│ navbar.tsx
│ recipe-card.tsx
│ theme-provider.tsx
└─ ui/

hooks/
│ use-auth.ts
│ use-recipe-store.ts
└ use-mobile.ts

public/
└ images/

🎨 Design System
Element	Choice
Colors	Warm peach 🍑, coral 🌺, and cream tones ☁️
UI	Built using Tailwind + shadcn/ui
Fonts	Clean, modern, food-friendly typography
⚙️ Environment Setup

Create .env.local:

NEXT_PUBLIC_APP_NAME=RecipeBox
NEXT_PUBLIC_APP_DESCRIPTION=Share and discover amazing recipes
NEXT_PUBLIC_API_URL=http://localhost:3000

🍽️ Main Pages
Route	Purpose
/	Home landing page
/login	Sign in (demo mode)
/signup	Register (demo mode)
/recipes	Browse + search recipes
/recipe/[id]	Full recipe details
/upload	Add your own recipe
/profile	Your dashboard & info
/saved	Your cookbook
/user/[id]	Public user profile
/about	About the platform
🧪 How to Try It Out

Sign up or login (demo mode)

Browse recipes 🍕

Upload your own ✍️

Save favorites ⭐

Comment & connect 💬

Follow creators 🧑‍🤝‍🧑

🚀 Deployment

Perfectly ready to deploy on Vercel

Push → Connect Repo → Deploy ✅

📦 Built With
Tech	Purpose
Next.js 16	App Framework
React 19	UI Library
Tailwind CSS	Styling
shadcn/ui	Components
TypeScript	Strong typing
🤝 Contributing

Fork it, improve it, remix it — have fun & experiment! 🎉

📄 License

Open source — Enjoy & build freely 💛

🍳 Happy Cooking & Sharing!

RecipeBox — Where flavor meets community.
🥘✨👩‍🍳👨‍🍳

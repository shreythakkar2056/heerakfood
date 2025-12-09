'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChefHat, 
  Clock, 
  Users, 
  Flame, 
  X, 
  ArrowRight,
  Utensils,
  CheckCircle2,
  Timer
} from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// --- Fonts ---
const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700', '800'] });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// --- Mock Data: Recipes ---
const RECIPES = [
  {
    id: 1,
    title: "Mumbai Style Bhel Puri",
    category: "Mamra",
    productUsed: "Kolhapuri Mamra",
    time: "15 min",
    servings: "2",
    calories: "180 kcal",
    difficulty: "Easy",
    imageColor: "from-yellow-100 to-orange-100",
    ingredients: [
      "2 cups Heerak Kolhapuri Mamra",
      "1/2 cup chopped onion & tomato",
      "2 tbsp tamarind chutney",
      "1 tbsp spicy green chutney",
      "Sev for garnishing",
      "Coriander leaves"
    ],
    steps: [
      "Roast the Mamra slightly to ensure crispiness.",
      "In a large bowl, mix onions, tomatoes, and boiled potatoes.",
      "Add the Mamra and both chutneys. Mix quickly to avoid sogginess.",
      "Garnish with nylon sev and fresh coriander.",
      "Serve immediately."
    ]
  },
  {
    id: 2,
    title: "Kanda Batata Poha",
    category: "Poha",
    productUsed: "Jada Poha (Thick)",
    time: "20 min",
    servings: "3",
    calories: "250 kcal",
    difficulty: "Medium",
    imageColor: "from-green-100 to-yellow-50",
    ingredients: [
      "2 cups Heerak Jada Poha",
      "1 large onion (chopped)",
      "1 potato (cubed & boiled)",
      "1 tsp mustard seeds & turmeric",
      "Curry leaves & green chilies",
      "Lemon juice"
    ],
    steps: [
      "Rinse Poha in a colander and let it soften for 5 mins.",
      "Heat oil, add mustard seeds, curry leaves, and chilies.",
      "Sauté onions until translucent, then add potatoes.",
      "Mix in the Poha, salt, and turmeric. Cover and steam for 2 mins.",
      "Finish with lemon juice and coriander."
    ]
  },
  {
    id: 3,
    title: "Traditional Gud Papdi",
    category: "Jaggery",
    productUsed: "Kolhapuri Jaggery",
    time: "30 min",
    servings: "6",
    calories: "320 kcal",
    difficulty: "Medium",
    imageColor: "from-orange-200 to-red-100",
    ingredients: [
      "1 cup Wheat Flour",
      "1/2 cup Ghee",
      "3/4 cup Heerak Jaggery (Grated)",
      "Cardamom powder",
      "Slivered almonds"
    ],
    steps: [
      "Heat ghee in a pan and roast wheat flour until golden brown.",
      "Turn off the flame (Crucial step).",
      "Add the grated Jaggery and mix vigorously until it melts.",
      "Pour mixture into a greased tray and flatten it.",
      "Sprinkle nuts and cut into diamond shapes while warm."
    ]
  },
  {
    id: 4,
    title: "Healthy Mamra Chivda",
    category: "Mamra",
    productUsed: "Basmati Mamra",
    time: "10 min",
    servings: "4",
    calories: "120 kcal",
    difficulty: "Easy",
    imageColor: "from-yellow-200 to-yellow-50",
    ingredients: [
      "4 cups Heerak Basmati Mamra",
      "1/2 cup Peanuts (roasted)",
      "Curry leaves",
      "Turmeric & Salt",
      "1 tsp Powdered Sugar"
    ],
    steps: [
      "Heat 1 tbsp oil, add mustard seeds and curry leaves.",
      "Add peanuts and roast until crunchy.",
      "Add turmeric and salt, then lower the flame.",
      "Add Mamra and toss gently until coated and crisp.",
      "Cool down and store in an airtight container."
    ]
  },
  {
    id: 5,
    title: "Jaggery Masala Tea",
    category: "Jaggery",
    productUsed: "Jaggery Powder",
    time: "10 min",
    servings: "2",
    calories: "60 kcal",
    difficulty: "Easy",
    imageColor: "from-orange-100 to-orange-50",
    ingredients: [
      "2 cups Water + Milk",
      "2 tsp Tea powder",
      "1 tbsp Heerak Jaggery Powder",
      "Ginger & Cardamom"
    ],
    steps: [
      "Boil water with ginger and tea powder.",
      "Add milk and bring to a boil.",
      "Turn off the heat and stir in the Jaggery Powder (prevents curdling).",
      "Strain and serve hot."
    ]
  },
  {
    id: 6,
    title: "Roasted Poha Chivda",
    category: "Poha",
    productUsed: "Patla Poha (Thin)",
    time: "25 min",
    servings: "5",
    calories: "150 kcal",
    difficulty: "Medium",
    imageColor: "from-gray-100 to-white",
    ingredients: [
      "3 cups Heerak Patla Poha",
      "Cashews & Raisins",
      "Green Chilies",
      "Sugar & Salt"
    ],
    steps: [
      "Dry roast the thin Poha in a wide pan until crisp. Keep aside.",
      "Heat oil, fry nuts, chilies, and curry leaves.",
      "Mix the tempering with the roasted Poha gently.",
      "Add powdered sugar and salt.",
      "Let it cool completely before storing."
    ]
  }
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-40 bg-[#FFFBEB]/90 backdrop-blur-md border-b border-orange-100 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <span className={`${serif.className} text-xl font-bold text-[#4A3B32]`}>Heerak Food</span>
      <a href="/" className="text-sm font-semibold text-gray-500 hover:text-orange-600">Back to Home</a>
    </div>
  </nav>
);

// --- Main Recipe Modal Component ---
const RecipeModal = ({ recipe, onClose }: { recipe: any; onClose: () => void }) => {
  if (!recipe) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent close on modal click
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white p-2 rounded-full backdrop-blur-md transition-colors">
          <X size={24} className="text-gray-600" />
        </button>

        {/* Left: Image & Quick Stats */}
        <div className={`md:w-2/5 bg-gradient-to-br ${recipe.imageColor} p-10 flex flex-col justify-between relative`}>
           {/* Pattern */}
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
           
           <div className="relative z-10">
             <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-4 inline-block">
               {recipe.category}
             </span>
             <h2 className={`${serif.className} text-3xl md:text-4xl font-bold text-[#4A3B32] mb-2`}>{recipe.title}</h2>
             <p className="text-[#4A3B32]/70 font-medium italic">Uses: {recipe.productUsed}</p>
           </div>

           <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
             <div className="bg-white/60 p-3 rounded-2xl backdrop-blur-sm">
               <Clock className="w-5 h-5 text-orange-600 mb-1" />
               <p className="text-xs text-gray-500 uppercase font-bold">Time</p>
               <p className="font-bold text-[#4A3B32]">{recipe.time}</p>
             </div>
             <div className="bg-white/60 p-3 rounded-2xl backdrop-blur-sm">
               <Flame className="w-5 h-5 text-red-500 mb-1" />
               <p className="text-xs text-gray-500 uppercase font-bold">Calories</p>
               <p className="font-bold text-[#4A3B32]">{recipe.calories}</p>
             </div>
             <div className="bg-white/60 p-3 rounded-2xl backdrop-blur-sm">
               <Users className="w-5 h-5 text-blue-500 mb-1" />
               <p className="text-xs text-gray-500 uppercase font-bold">Serves</p>
               <p className="font-bold text-[#4A3B32]">{recipe.servings}</p>
             </div>
             <div className="bg-white/60 p-3 rounded-2xl backdrop-blur-sm">
               <ChefHat className="w-5 h-5 text-green-600 mb-1" />
               <p className="text-xs text-gray-500 uppercase font-bold">Level</p>
               <p className="font-bold text-[#4A3B32]">{recipe.difficulty}</p>
             </div>
           </div>
        </div>

        {/* Right: Content */}
        <div className="md:w-3/5 p-8 md:p-10 bg-white">
          
          {/* Ingredients */}
          <div className="mb-8">
            <h3 className={`${serif.className} text-2xl font-bold text-[#4A3B32] mb-4 flex items-center gap-2`}>
              <span className="bg-orange-100 p-1.5 rounded-lg text-orange-600"><Utensils size={20} /></span> 
              Ingredients
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {recipe.ingredients.map((ing: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className={`${serif.className} text-2xl font-bold text-[#4A3B32] mb-4 flex items-center gap-2`}>
              <span className="bg-green-100 p-1.5 rounded-lg text-green-600"><Timer size={20} /></span> 
              Instructions
            </h3>
            <div className="space-y-4">
              {recipe.steps.map((step: string, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};


export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  // Filter Logic
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      const matchesCategory = activeCategory === "All" || recipe.category === activeCategory;
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            recipe.productUsed.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB]`}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-orange-100 shadow-sm mb-6">
            <ChefHat size={16} className="text-orange-500" />
            <span className="text-xs font-bold text-[#4A3B32] tracking-wide uppercase">Heerak Kitchen Secrets</span>
          </div>
          <h1 className={`${serif.className} text-4xl md:text-6xl font-extrabold text-[#4A3B32] mb-6 leading-tight`}>
            Recipes made with <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">Love & Crunch.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Discover delicious ways to use our premium Mamra, Poha, and Jaggery in your daily meals.
          </p>
        </motion.div>
      </section>

      {/* Filter & Search Bar */}
      <section className="px-6 sticky top-20 z-30 pointer-events-none mb-12">
        <div className="max-w-6xl mx-auto pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-100 p-2 md:p-3 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {["All", "Mamra", "Poha", "Jaggery"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                    ${activeCategory === cat 
                      ? 'bg-[#4A3B32] text-white shadow-md' 
                      : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Find a recipe (e.g. Bhel, Tea)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all placeholder:text-gray-400"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe) => (
              <motion.div
                layout
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedRecipe(recipe)}
                className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 flex flex-col h-full"
              >
                {/* Card Image Area */}
                <div className={`h-56 bg-gradient-to-br ${recipe.imageColor} relative flex items-center justify-center p-6`}>
                   {/* Decorative Icon */}
                   <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white/60 group-hover:scale-110 transition-transform duration-500">
                      <Utensils size={32} />
                   </div>
                   
                   {/* Product Tag */}
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#4A3B32] shadow-sm flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {recipe.category}
                   </div>
                   
                   {/* Time Tag */}
                   <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                      <Clock size={12} /> {recipe.time}
                   </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`${serif.className} text-xl font-bold text-[#4A3B32] mb-2 group-hover:text-orange-600 transition-colors`}>
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                    A delicious way to enjoy our {recipe.productUsed}.
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                     <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
                        <span className="flex items-center gap-1"><Flame size={14} className="text-orange-400" /> {recipe.calories}</span>
                        <span className="flex items-center gap-1"><Users size={14} className="text-blue-400" /> {recipe.servings} ppl</span>
                     </div>
                     <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#4A3B32] group-hover:text-white transition-colors">
                        <ArrowRight size={16} />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <ChefHat className="mx-auto h-16 w-16 mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-400">No recipes found</h3>
            <p className="text-gray-400">Try searching for "Poha" or "Sweet"</p>
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="bg-[#4A3B32] py-20 px-6 text-center rounded-t-[3rem]">
        <h2 className={`${serif.className} text-3xl font-bold text-white mb-6`}>
          Have a unique recipe?
        </h2>
        <p className="text-orange-100/70 max-w-lg mx-auto mb-8">
          Share your creation using Heerak Food products and get a chance to be featured on our website!
        </p>
        <button className="bg-white text-[#4A3B32] px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors">
          Submit Recipe
        </button>
      </section>

      {/* Render Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)} 
          />
        )}
      </AnimatePresence>

    </main>
  );
}
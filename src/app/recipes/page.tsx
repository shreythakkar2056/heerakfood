'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  Timer,
  Menu,
  MapPin,
  Phone
} from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// --- Fonts ---
const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700', '800'] });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// --- Mock Data: Recipes ---
// Added 'productImage' field to link recipes to your packaging
const RECIPES = [
  {
    id: 1,
    title: "Mumbai Style Bhel Puri",
    category: "Mamra",
    productUsed: "Kolhapuri Mamra",
    productImage: "/images/Heerak Kolhapuri Mamra.webp",
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
    productUsed: "Heerak Poha",
    productImage: "/images/Heerak Poha.webp",
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
    productImage: "/images/Jaggery.webp",
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
    productImage: "/images/Heerak Basmati Mamra.webp",
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
    productUsed: "Desi Jaggery",
    productImage: "/images/Organic Jaggery.webp",
    time: "10 min",
    servings: "2",
    calories: "60 kcal",
    difficulty: "Easy",
    imageColor: "from-orange-100 to-orange-50",
    ingredients: [
      "2 cups Water + Milk",
      "2 tsp Tea powder",
      "1 tbsp Heerak Jaggery",
      "Ginger & Cardamom"
    ],
    steps: [
      "Boil water with ginger and tea powder.",
      "Add milk and bring to a boil.",
      "Turn off the heat and stir in the Jaggery (prevents curdling).",
      "Strain and serve hot."
    ]
  },
  {
    id: 6,
    title: "Roasted Poha Chivda",
    category: "Poha",
    productUsed: "Nylon Poha",
    productImage: "/images/Heerak Naylon Poha 500g.webp",
    time: "25 min",
    servings: "5",
    calories: "150 kcal",
    difficulty: "Medium",
    imageColor: "from-gray-100 to-white",
    ingredients: [
      "3 cups Heerak Nylon Poha",
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

// --- Shared Components (Responsive) ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Our Products', href: '/products' },
    { name: 'Legacy', href: '/legacy' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Contact', href: '/contact' },
       { name: 'Feedback', href: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-4 left-0 right-0 z-50 px-3 md:px-8`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-orange-100 p-2 md:p-3 flex justify-between items-center relative z-50"
        >
          <Link href="/" className="flex items-center gap-2 pl-2 md:pl-4 group">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform p-0.5">
               <img src="/images/logo.webp" alt="Heerak Food Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`${serif.className} text-lg md:text-2xl font-bold text-gray-800 tracking-tight`}>
              Heerak Food
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className={`flex gap-6 ${sans.className} text-sm font-semibold text-gray-600`}>
              {links.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-orange-600 transition-colors relative group">
                  {link.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-500 origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
            <Link href="/contact">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-transform hover:scale-105 shadow-md shadow-orange-200 relative overflow-hidden group">
                <span className="relative z-10">Order Wholesale</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
              </button>
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-md mr-1">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#FFFBEB] pt-28 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {links.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className={`${serif.className} text-2xl font-bold text-[#4A3B32] hover:text-orange-600`}>
                  {link.name}
                </Link>
              ))}
              <hr className="border-orange-200 w-1/2 mx-auto" />
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl w-full">
                  Order Wholesale
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-[#4A3B32] text-orange-50 pt-24 pb-10 rounded-t-[3rem] md:rounded-t-[4rem] mt-10 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden p-1">
                    <img src="/images/logo.webp" alt="Heerak Food Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className={`${serif.className} text-3xl font-bold text-white`}>Heerak Food</h3>
            </div>
            <p className="text-orange-100/70 max-w-md leading-relaxed text-lg">
              Bringing the authentic taste of Gujarat to the world. We are committed to delivering the freshest puffed rice and snacks with zero compromise on quality.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-orange-100/70">
              {['Our Story', 'Products', 'Wholesale Inquiry', 'Contact Us','Feedback'].map((item, idx) => (
                 <li key={idx}><a href="#" className="hover:text-orange-400 transition-colors inline-block hover:translate-x-2 duration-300">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-orange-100/70 font-medium w-full">
              <li className="flex items-start gap-3"><MapPin className="text-orange-500 shrink-0" size={20} /> Ahmedabad, Gujarat</li>
              <li className="flex items-center gap-3 hover:text-orange-400 transition-colors"><Phone className="text-orange-500 shrink-0" size={20} /> <a href="tel:+919727724404">+91 97277 24404</a></li>
              <li className="flex items-center gap-3 hover:text-orange-400 transition-colors w-full">
                <ArrowRight className="text-orange-500 shrink-0" size={20} /> 
                <a href="mailto:heerakfood@gmail.com" className="break-all">heerakfood@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-orange-500/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-orange-100/50 text-center md:text-left">
          <p className="mb-2 md:mb-0">© 2026 Heerak Food. All rights reserved.</p>
          <p>
  Developed & Managed by{' '}
  <a 
    href="https://shreythakkar.dev" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="font-semibold hover:text-white transition-colors border-b border-orange-500/30 hover:border-orange-400 pb-0.5"
  >
    Shrey Thakkar
  </a>
</p>
        </div>
      </div>
    </footer>
);

// --- Main Recipe Modal Component ---
const RecipeModal = ({ recipe, onClose }: { recipe: any; onClose: () => void }) => {
  if (!recipe) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()} 
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white p-2 rounded-full backdrop-blur-md transition-colors">
          <X size={24} className="text-gray-600" />
        </button>

        {/* Left: Image & Quick Stats */}
        <div className={`md:w-2/5 bg-gradient-to-br ${recipe.imageColor} p-8 flex flex-col justify-between relative`}>
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
           
           <div className="relative z-10">
             <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-4 inline-block">
               {recipe.category}
             </span>
             <h2 className={`${serif.className} text-3xl md:text-4xl font-bold text-[#4A3B32] mb-2`}>{recipe.title}</h2>
             <p className="text-[#4A3B32]/70 font-medium italic">Uses: {recipe.productUsed}</p>
             
             {/* PRODUCT IMAGE IN MODAL */}
             <div className="mt-6 flex justify-center">
                <img src={recipe.productImage} alt={recipe.productUsed} className="w-32 h-32 object-contain drop-shadow-xl" />
             </div>
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
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB] overflow-x-hidden`}>
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
      <section className="px-6 sticky top-24 z-30 pointer-events-none mb-12">
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
                   
                   {/* Product Image Displayed in Card */}
                   <div className="relative z-10 w-full h-full flex items-center justify-center">
                      {/* White glow behind pack */}
                      <div className="absolute inset-0 bg-white/30 blur-2xl scale-75 rounded-full"></div>
                      <img 
                        src={recipe.productImage} 
                        alt={recipe.productUsed} 
                        className="h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" 
                      />
                   </div>
                   
                   {/* Product Tag */}
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#4A3B32] shadow-sm flex items-center gap-1 z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {recipe.category}
                   </div>
                   
                   {/* Time Tag */}
                   <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 z-20">
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
      {/* <section className="bg-[#4A3B32] py-20 px-6 text-center rounded-t-[3rem]">
        <h2 className={`${serif.className} text-3xl font-bold text-white mb-6`}>
          Have a unique recipe?
        </h2>
        <p className="text-orange-100/70 max-w-lg mx-auto mb-8">
          Share your creation using Heerak Food products and get a chance to be featured on our website!
        </p>
        <button className="bg-white text-[#4A3B32] px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors">
          Submit Recipe
        </button>
      </section> */}

      {/* Render Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)} 
          />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
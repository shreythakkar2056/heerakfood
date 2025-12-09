'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  ShoppingBag, 
  Star, 
  Leaf, 
  ArrowRight, 
  Phone,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// --- Fonts ---
const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700'] });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// --- Mock Data (Based on your description) ---
const CATEGORIES = ["All", "Mamra", "Poha", "Jaggery"];

const PRODUCTS = [
  // MAMRA (Puffed Rice)
  {
    id: 1,
    name: "Kolhapuri Mamra",
    category: "Mamra",
    weight: "500g / 1kg",
    desc: "Premium long-grain puffed rice, perfect for Bhel.",
    tag: "Best Seller",
    color: "bg-yellow-100",
    imageColor: "from-yellow-200 to-yellow-100",
    image: '/images/Heerak Kolhapuri Mamra.webp'
  },
  {
    id: 2,
    name: "Basmati Mamra",
    category: "Mamra",
    weight: "400g",
    desc: "Extra distinct grain size, aromatic and crunchy.",
    tag: "Premium",
    color: "bg-orange-50",
    imageColor: "from-orange-100 to-white",
    image: '/images/Heerak Basmati Mamra.webp'
  },
  {
    id: 3,
    name: "Diet Mamra (Kurmura)",
    category: "Mamra",
    weight: "200g",
    desc: "Salt-free, roasted perfection for health conscious.",
    tag: "Healthy",
    color: "bg-green-50",
    imageColor: "from-green-100 to-white",
    image: '/images/Heerak Sathi Mamra.webp'
  },
  {
    id: 4,
    name: "Masala Mamra",
    category: "Mamra",
    weight: "250g",
    desc: "Ready-to-eat spiced puffed rice snack.",
    tag: "Spicy",
    color: "bg-red-50",
    imageColor: "from-red-100 to-white",
    image: '/images/Heerak Bombe Bhel Mamra.webp'
  },

  // POHA (Flattened Rice)
  {
    id: 5,
    name: "Jada Poha (Thick)",
    category: "Poha",
    weight: "1kg",
    desc: "Ideal for making Batata Poha. Does not get mushy.",
    tag: "Kitchen Staple",
    color: "bg-white",
    imageColor: "from-gray-200 to-white",
    image: '/images/Heerak Poha.webp'
  },
  {
    id: 6,
    name: "Patla Poha (Thin)",
    category: "Poha",
    weight: "1kg",
    desc: "Paper-thin flakes for roasting and Chivda.",
    tag: "Crispy",
    color: "bg-white",
    imageColor: "from-gray-100 to-white",
    image: '/images/Heerak Gold Maize Poha.webp'
  },
  {
    id: 7,
    name: "Nylon Poha",
    category: "Poha",
    weight: "500g",
    desc: "Transparent, premium quality flakes.",
    tag: null,
    color: "bg-white",
    imageColor: "from-blue-50 to-white",
    image: '/images/Heerak Naylon Poha 500g.webp'
  },
  {
    id: 8,
    name: "Red Rice Poha",
    category: "Poha",
    weight: "500g",
    desc: "Fiber-rich, unpolished red rice flakes.",
    tag: "Healthy Choice",
    color: "bg-red-50",
    imageColor: "from-red-200 to-red-50",
    image: '/images/Heerak Rice Poha 500g.webp'
  },

  // JAGGERY (Gur)
  {
    id: 9,
    name: "Kolhapuri Jaggery Cube",
    category: "Jaggery",
    weight: "1kg Box",
    desc: "Chemical-free, natural sweetener cubes.",
    tag: "Organic",
    color: "bg-orange-50",
    imageColor: "from-orange-800 to-orange-600", // Dark brown for Gur
    image: '/images/Jaggery.webp'
  },
  {
    id: 10,
    name: "Desi Gur (Bucket)",
    category: "Jaggery",
    weight: "5kg / 10kg",
    desc: "Soft, dark traditional jaggery for bulk use.",
    tag: "Bulk Pack",
    color: "bg-orange-100",
    imageColor: "from-orange-900 to-orange-700",
    image: '/images/Organic Jaggery.webp'
  },
  {
    id: 11,
    name: "Jaggery Powder",
    category: "Jaggery",
    weight: "500g",
    desc: "Easy to use powder form for tea and coffee.",
    tag: "New",
    color: "bg-yellow-50",
    imageColor: "from-yellow-700 to-yellow-500",
    image: '/images/mamra bowl.png'
  },
];

// --- Components ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-[#FFFBEB]/90 backdrop-blur-md border-b border-orange-100 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs">HF</div>
        <span className={`${serif.className} text-xl font-bold text-[#4A3B32]`}>Heerak Food</span>
      </div>
      <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-600">
        <a href="/" className="hover:text-orange-600">Home</a>
        <a href="#" className="text-orange-600">Products</a>
        <a href="#" className="hover:text-orange-600">Contact</a>
      </div>
    </div>
  </nav>
);

const ProductCard = ({ product }: { product: any }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 flex flex-col h-full"
  >
    {/* Image Area (Simulated Packaging) */}
    <div className={`h-48 w-full bg-gradient-to-br ${product.imageColor} relative flex items-center justify-center overflow-hidden`}>
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
      
      {/* Product Tag */}
      {product.tag && (
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#4A3B32] shadow-sm">
          {product.tag}
        </span>
      )}
      
      {/* Veg Symbol (Standard Indian Food Requirement) */}
      <div className="absolute top-4 right-4 bg-white p-1 rounded border border-green-600 w-5 h-5 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
      </div>

      {/* Placeholder Icon */}
      {product.image ? (
        // render product image from public/images
        // keep sizing so it fits inside the h-48 container
        <img src={product.image} alt={product.name} className="w-28 h-28 object-contain" />
      ) : (
        <ShoppingBag className="text-white/40 w-20 h-20 transform group-hover:scale-110 transition-transform duration-500" />
      )}
      
      {/* Floating "View" Text on Hover */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold">Quick View</span>
      </div>
    </div>

    {/* Content Area */}
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md uppercase tracking-wide">
          {product.category}
        </span>
        <span className="text-xs font-medium text-gray-400">{product.weight}</span>
      </div>

      <h3 className={`${serif.className} text-xl font-bold text-[#4A3B32] mb-2 group-hover:text-orange-600 transition-colors`}>
        {product.name}
      </h3>
      
      <p className={`${sans.className} text-sm text-gray-500 mb-6 flex-grow leading-relaxed`}>
        {product.desc}
      </p>

      {/* Action Area */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
        <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Info size={16} /> Details
        </button>
        <button className="flex-1 bg-[#4A3B32] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-900/10">
          <Phone size={16} /> Inquire
        </button>
      </div>
    </div>
  </motion.div>
);

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB]`}>
      <Navbar />

      {/* Header Section */}
      <section className="pt-16 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-orange-600 font-bold tracking-wider text-sm uppercase mb-3 block">
            Our Pantry
          </span>
          <h1 className={`${serif.className} text-4xl md:text-5xl font-extrabold text-[#4A3B32] mb-6`}>
            Wholesome Grains & <br />
            <span className="italic text-orange-600">Pure Sweetness.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Explore our range of premium Mamra, export-quality Poha, and chemical-free Jaggery. Sourced responsibly, packed with care.
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 mb-12 sticky top-20 z-40 pointer-events-none">
        <div className="flex justify-center pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-orange-100 shadow-sm inline-flex gap-1 overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap
                  ${activeCategory === cat 
                    ? 'bg-[#4A3B32] text-white shadow-md' 
                    : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Filter className="mx-auto h-12 w-12 mb-4" />
            <p>No products found in this category.</p>
          </div>
        )}
      </section>

      {/* Wholesale Banner */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#4A3B32] to-[#2D231E] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className={`${serif.className} text-3xl font-bold text-white mb-2`}>
              Buying for your Store?
            </h2>
            <p className="text-orange-100/80 max-w-md">
              We offer competitive wholesale rates for Kirana stores, supermarkets, and distributors across Gujarat.
            </p>
          </div>

          <button className="relative z-10 bg-white text-[#4A3B32] px-8 py-3.5 rounded-full font-bold hover:bg-orange-50 transition-colors flex items-center gap-2 whitespace-nowrap">
            Download Catalog <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-orange-100 py-8 text-center text-sm text-gray-500">
        <p>© 2025 Heerak Food. All product images are for representation purposes only.</p>
      </footer>
    </main>
  );
}
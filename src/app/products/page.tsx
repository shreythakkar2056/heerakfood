'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  ShoppingBag, 
  Star, 
  Leaf, 
  ArrowRight, 
  Phone,
  CheckCircle2,
  Info,
  Menu,
  X,
  MapPin,
  MessageCircle,
  Package,
  Store
} from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// --- Fonts ---
const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700', '800'] });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// --- Data ---
const CATEGORIES = ["All", "Mamra", "Poha", "Jaggery"];

const PRODUCTS = [
  // MAMRA (Puffed Rice)
  {
    id: 1,
    name: "Kolhapuri Mamra",
    category: "Mamra",
    weight: "250g",
    desc: "Premium oval-grain puffed rice.",
    tag: "Best Seller",
    color: "bg-green-100",
    imageColor: "from-green-700 to-green-400",
    image: '/images/Heerak Kolhapuri Mamra.webp'
  },
  {
    id: 2,
    name: "Basmati Mamra",
    category: "Mamra",
    weight: "250g",
    desc: "Extra distinct grain size, aromatic and crunchy.",
    tag: "Premium",
    color: "bg-blue-50",
    imageColor: "from-blue-600 to-blue-200",
    image: '/images/Heerak Basmati Mamra.webp'
  },
  {
    id: 3,
    name: "Sathi Mamra ",
    category: "Mamra",
    weight: "250g",
    desc: "Salt-free, roasted perfection for health conscious, Perfect For Bhel.",
    tag: "Healthy",
    color: "bg-red-50",
    imageColor: "from-orange-600 to-orange-200",
    image: '/images/Heerak Sathi Mamra.webp'
  },
  {
    id: 4,
    name: "Sathi Mamra",
    category: "Mamra",
    weight: "400g",
    desc: "Salt-free, roasted perfection for health conscious, puffed rice snack.",
    tag: "simple",
    color: "bg-red-50",
    imageColor: "from-red-700 to-red-400",
    image: '/images/Heerak Bombe Bhel Mamra.webp'
  },
   {
    id: 5,
    name: "Kolhapuri Mamra",
    category: "Mamra",
    weight: "500g",
    desc: "Premium oval-grain puffed rice.",
    tag: "Best Seller",
    color: "bg-green-100",
    imageColor: "from-green-800 to-green-400",
    image: '/images/Heerak Kolhapuri Mamra 500g.webp'
  },
  {
    id: 6,
    name: "Basmati Mamra",
    category: "Mamra",
    weight: "500g",
    desc: "Extra distinct grain size, aromatic and crunchy.",
    tag: "Premium",
    color: "bg-blue-50",
    imageColor: "from-black to-blue-500",
    image: '/images/Heerak Basmati Mamra 500g.webp'
  },
  {
    id: 7,
    name: "Sathi Mamra ",
    category: "Mamra",
    weight: "500g",
    desc: "Salt-free, roasted perfection for health conscious, Perfect For Bhel.",
    tag: "Healthy",
    color: "bg-red-50",
    imageColor: "from-orange-600 to-orange-200",
    image: '/images/Heerak Special Sathi Mamra 500g.webp'
  },
  // POHA (Flattened Rice)
  {
    id: 8,
    name: "Poha ",
    category: "Poha",
    weight: "1kg",
    desc: "Ideal for making Batata Poha. Does not get mushy.",
    tag: "Kitchen Staple",
    color: "bg-white",
    imageColor: "from-blue-100 to-white",
    image: '/images/Heerak Poha.webp'
  },
    {
    id: 9,
    name: " Poha",
    category: "Poha",
    weight: "500g",
    desc: "Fiber-rich, unpolished rice flakes.",
    tag: "Healthy Choice",
    color: "bg-green-50",
    imageColor: "from-green-600 to-green-50",
    image: '/images/Heerak Rice Poha 500g.webp'
  },
 
  {
    id: 10,
    name: "Nylon Poha",
    category: "Poha",
    weight: "500g",
    desc: "Transparent, premium quality flakes.",
    tag: null,
    color: "bg-blue-50",
    imageColor: "from-blue-500 to-blue-200",
    image: '/images/Heerak Naylon Poha 500g.webp'
  },
 {
    id: 11,
    name: "Maize Poha",
    category: "Poha",
    weight: "500g",
    desc: "Light and crispy maize flakes.",
    tag: "Crispy",
    color: "bg-white",
    imageColor: "from-yellow-600 to-yellow-50",
    image: '/images/Heerak Maize Poha.webp'
  },
 {
    id: 12,
    name: "Maize Poha",
    category: "Poha",
    weight: "400g",
    desc: "Light and crispy maize flakes.",
    tag: "Crispy",
    color: "bg-white",
    imageColor: "from-green-600 to-green-50",
    image: '/images/Heerak Gold Maize Poha.webp'
  },

  // JAGGERY (Gur)
  {
    id: 13,
    name: "Kolhapuri Jaggery",
    category: "Jaggery",
    weight: "1kg ",
    desc: "Chemical-free, natural sweetener cubes.",
    tag: "Organic",
    color: "bg-blue-50",
    imageColor: "from-blue-800 to-blue-600", // Dark brown for Gur
    image: '/images/Jaggery.webp'
  },
  {
    id: 14,
    name: "Desi Jaggery ",
    category: "Jaggery",
    weight: "1kg",
    desc: "Soft, dark traditional jaggery.",
    tag: "Natural",
    color: "bg-orange-100",
    imageColor: "from-orange-900 to-orange-500",
    image: '/images/Organic Jaggery.webp'
  },
];

// --- Shared Components (Mobile Optimized) ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Our Products', href: '/products' },
    { name: 'Legacy', href: '/legacy' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-4 left-0 right-0 z-50 px-3 md:px-8`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-orange-100 p-2 md:p-3 flex justify-between items-center relative z-50"
        >
          {/* Mobile Optimized Logo Section */}
          <Link href="/" className="flex items-center gap-2 pl-2 md:pl-4 group">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform p-0.5">
               <img src="/images/logo.webp" alt="Heerak Food Logo" className="w-full h-full object-contain" />
            </div>
            {/* Smaller text on mobile to prevent overflow */}
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
              {['Our Story', 'Products', 'Wholesale Inquiry', 'Contact Us'].map((item, idx) => (
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
                {/* Fixed Email Clipping: Added break-all */}
                <a href="mailto:heerakfood.business@gmail.com" className="break-all">heerakfood.business@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-orange-500/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-orange-100/50 text-center md:text-left">
          <p className="mb-2 md:mb-0">© 2025 Heerak Food. All rights reserved.</p>
          <p>Designed with ❤️ in India.</p>
        </div>
      </div>
    </footer>
);


// --- Modal Components ---

// 1. Inquiry Modal (Smart Logic)
const InquiryModal = ({ product, onClose }: { product: any, onClose: () => void }) => {
  const [purpose, setPurpose] = useState<'trial' | 'resell'>('trial');
  const [quantity, setQuantity] = useState('');

  const handleWhatsApp = () => {
    let msg = `Hi Heerak Food, I am interested in *${product.name} (${product.weight})*.`;
    if (purpose === 'trial') {
      msg += ` I would like to order a *Trial/Sample* first.`;
    } else {
      msg += ` I am looking for *Bulk Supply for Reselling*.`;
      if (quantity) msg += ` Required Qty: approx ${quantity}.`;
    }
    msg += ` Please guide me with the pricing and delivery.`;
    const url = `https://wa.me/919727724404?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className={`p-6 bg-gradient-to-r ${product.imageColor} text-white relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 p-1 bg-white/20 hover:bg-white/40 rounded-full transition-colors"><X size={20} /></button>
          <h3 className={`${serif.className} text-2xl font-bold mb-1`}>Inquire Now</h3>
          <p className="opacity-90 text-sm">Get the best rates directly on WhatsApp.</p>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
             <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
             <div>
               <p className="font-bold text-[#4A3B32]">{product.name}</p>
               <p className="text-xs text-gray-500">{product.weight} Pack</p>
             </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Purpose of Buying?</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setPurpose('trial')} className={`py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${purpose === 'trial' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-500 hover:border-orange-200'}`}><ShoppingBag size={16} /> Trial / Personal</button>
                <button onClick={() => setPurpose('resell')} className={`py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${purpose === 'resell' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-500 hover:border-orange-200'}`}><Store size={16} /> Bulk / Resell</button>
              </div>
            </div>
            {purpose === 'resell' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Approx Quantity Needed?</label>
                 <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" onChange={(e) => setQuantity(e.target.value)}>
                   <option value="">Select Quantity...</option>
                   <option value="50kg">50 kg</option>
                   <option value="100kg">100 kg</option>
                   <option value="500kg+">500 kg+</option>
                 </select>
              </motion.div>
            )}
            <button onClick={handleWhatsApp} className="w-full py-4 mt-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"><MessageCircle size={20} /> Chat on WhatsApp</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 2. Product Details Modal (Quick View)
const ProductDetailsModal = ({ product, onClose, onInquire }: { product: any, onClose: () => void, onInquire: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
         <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"><X size={20} /></button>
         <div className={`md:w-1/2 h-64 md:h-auto bg-gradient-to-br ${product.imageColor} flex items-center justify-center p-8 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white/10 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
            <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl" />
         </div>
         <div className="md:w-1/2 p-8 flex flex-col">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-2">{product.category}</span>
            <h2 className={`${serif.className} text-3xl font-bold text-[#4A3B32] mb-2`}>{product.name}</h2>
            <div className="flex items-center gap-3 mb-6">
               <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">{product.weight}</span>
               {product.tag && <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-xs font-bold">{product.tag}</span>}
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">{product.desc} This product is processed using our signature 3-step cleaning technology ensuring zero dust and 100% crunch.</p>
            <div className="mt-auto">
              <button onClick={() => { onClose(); onInquire(); }} className="w-full py-4 bg-[#4A3B32] text-white rounded-xl font-bold shadow-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"><MessageCircle size={18} /> Get Price Quote</button>
            </div>
         </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Page Component ---

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // State for Modals
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // For Details
  const [inquiryProduct, setInquiryProduct] = useState<any>(null);   // For Inquiry

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB]`}>
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-12 px-6 text-center">
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

      {/* Filter Tabs - Mobile Optimized with Overflow */}
      <section className="mb-12 sticky top-24 z-30 pointer-events-none w-full">
        <div className="flex justify-center pointer-events-auto w-full px-4">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-orange-100 shadow-sm flex gap-1 overflow-x-auto max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap flex-shrink-0
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
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 flex flex-col h-full relative"
              >
                {/* Image Area */}
                <div 
                   className={`h-48 w-full bg-gradient-to-br ${product.imageColor} relative flex items-center justify-center overflow-hidden cursor-pointer`}
                   onClick={() => setSelectedProduct(product)}
                >
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
                  
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#4A3B32] shadow-sm z-10">
                      {product.tag}
                    </span>
                  )}
                  
                  <div className="absolute top-4 right-4 bg-white p-1 rounded border border-green-600 w-5 h-5 flex items-center justify-center z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                  </div>

                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <ShoppingBag className="text-white/40 w-20 h-20 transform group-hover:scale-110 transition-transform duration-500" />
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                       <Info size={14} /> Quick View
                    </span>
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
                  
                  <p className={`${sans.className} text-sm text-gray-500 mb-6 flex-grow leading-relaxed line-clamp-2`}>
                    {product.desc}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Info size={16} /> Details
                    </button>
                    <button 
                      onClick={() => setInquiryProduct(product)}
                      className="flex-1 bg-[#4A3B32] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-900/10"
                    >
                      <MessageCircle size={16} /> Inquire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Filter className="mx-auto h-12 w-12 mb-4" />
            <p>No products found in this category.</p>
          </div>
        )}
      </section>

      {/* Render Modals */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onInquire={() => {
              const p = selectedProduct;
              setSelectedProduct(null);
              setTimeout(() => setInquiryProduct(p), 300);
            }}
          />
        )}
        {inquiryProduct && (
          <InquiryModal 
            product={inquiryProduct} 
            onClose={() => setInquiryProduct(null)} 
          />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
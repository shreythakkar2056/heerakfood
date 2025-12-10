'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Store, 
  TrendingUp, 
  Award, 
  Heart, 
  Leaf, 
  ShieldCheck, 
  Lightbulb,
  Wheat,
  Home,
  RefreshCcw,
  Menu,
  X,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// --- Fonts ---
const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700', '800'] });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600'] });

// --- Data ---
const TIMELINE = [
  {
    year: "2010",
    title: "Humble Beginnings",
    desc: "Founded by Mr. Ketanbhai Thakkar and his parents. A part-time venture selling mamra from a single room.",
    icon: Home
  },
  {
    year: "2012",
    title: "First Milestone",
    desc: "Reached 100 stores in Ahmedabad. A sign that the city loved our quality.",
    icon: Store
  },
  {
    year: "2013",
    title: "Innovation & Expansion",
    desc: "Moved to a rented space. Introduced 3 varieties of Mamra with 2 packing options—a market first.",
    icon: Lightbulb
  },
  {
    year: "2014",
    title: "The Cleaning Process",
    desc: "Implemented our unique 3-step cleaning process and modern machinery, setting a new standard for hygiene.",
    icon: ShieldCheck
  },
  {
    year: "2017",
    title: "New Categories",
    desc: "Expanded to 3 rented locations. Launched Premium Poha and Jaggery to the portfolio.",
    icon: Wheat
  },
  {
    year: "2020",
    title: "A Decade of Trust",
    desc: "Celebrated 10 years with 20+ products and a move to a larger factory to meet growing demand.",
    icon: Award
  },
  {
    year: "2022",
    title: "Rebirth as 'Heerak'",
    desc: "Rebranded from Kohinoor to Heerak Food. Despite the name change, 90% of customers stayed for the taste.",
    icon: RefreshCcw
  },
  {
    year: "2025",
    title: "Leading the Market",
    desc: "1 Ton daily production (10x growth). Serving 500+ stores with 35+ products.",
    icon: TrendingUp
  }
];

const VALUES = [
  { title: "Quality Assurance", desc: "Stringent safety and taste standards.", icon: ShieldCheck, color: "bg-blue-50 text-blue-600" },
  { title: "Customer Satisfaction", desc: "Prioritizing your needs above all.", icon: Heart, color: "bg-red-50 text-red-600" },
  { title: "Innovation", desc: "Constant improvement in process.", icon: Lightbulb, color: "bg-yellow-50 text-yellow-600" },
  { title: "Sustainability", desc: "Eco-friendly sourcing & packing.", icon: Leaf, color: "bg-green-50 text-green-600" },
];

const STATS = [
  { label: "Years of Trust", value: "15+" },
  { label: "Stores in AHD", value: "500+" },
  { label: "Monthly Families", value: "4000+" },
  { label: "Daily Production", value: "1000kg" },
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
                <a href="mailto:heerakfood@gmail.com" className="break-all">heerakfood@gmail.com</a>
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

export default function LegacyPage() {
  return (
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB] overflow-x-hidden`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6"
          >
            Since 2010
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${serif.className} text-5xl md:text-7xl font-extrabold text-[#4A3B32] mb-8 leading-tight`}
          >
            15 Years of <br/>
            <span className="italic text-orange-600">Trust & Quality.</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From a single room in our home to serving over 4,000 families monthly. This is the story of Heerak Food.
          </p>
        </div>

        {/* Hero Visual - Custom Foundation Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          // Using min-h to ensure it doesn't get squashed on mobile
          className="mt-16 max-w-4xl mx-auto w-full min-h-[320px] md:aspect-[2/1] rounded-[2.5rem] relative shadow-2xl bg-[#3E3228] flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          {/* Subtle Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none"></div>

          {/* Icons Row */}
          <div className="flex items-center gap-6 mb-8 relative z-10">
             <Home className="w-12 h-12 md:w-16 md:h-16 text-[#D4B08C]" strokeWidth={1.5} />
             <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-[#8B5A2B]" strokeWidth={2} />
             {/* <Wheat className="w-12 h-12 md:w-16 md:h-16 text-[#E6C200]" strokeWidth={1.5} /> */}
             <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 rounded-xl overflow-hidden shadow-lg">
            <img src="/images/logo.webp" alt="Heerak Food Logo" className="w-full h-full object-contain" />
          </div>
          </div>
          
          {/* Text Content */}
          <div className="text-center relative z-10">
            <h3 className={`${serif.className} text-3xl md:text-5xl font-bold text-white mb-3 leading-tight`}>
              "Great things start small."
            </h3>
            <p className="text-[#8E8075] font-medium text-base md:text-lg tracking-wide">The First Room, 2010</p>
          </div>

          {/* Footer Label */}
          <div className="absolute bottom-6 left-0 w-full text-center md:text-left md:bottom-10 md:left-12 text-[#6D5F55] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase z-10">
             Founders: Mr. Ketanbhai & Family
          </div>
        </motion.div>
      </section>

      {/* Stats Band */}
      <section className="bg-white py-12 border-y border-orange-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center">
              <h4 className={`${serif.className} text-4xl font-bold text-orange-500 mb-1`}>{stat.value}</h4>
              <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${serif.className} text-4xl font-bold text-[#4A3B32]`}>Our Journey</h2>
            <p className="text-gray-500 mt-2">A timeline of passion and perseverance.</p>
          </div>

          <div className="relative">
            {/* The Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {TIMELINE.map((item, idx) => (
                <TimelineItem key={idx} item={item} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-white rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className={`${serif.className} text-4xl font-bold text-[#4A3B32] mb-4`}>Our Core Values</h2>
              <p className="text-gray-600 text-lg">
                The foundational principles that drive every decision we make at Heerak Food.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-3xl ${val.color.split(' ')[0]} border border-transparent hover:border-gray-100 transition-all`}
              >
                <val.icon className={`w-10 h-10 mb-6 ${val.color.split(' ')[1]}`} />
                <h3 className={`${serif.className} text-xl font-bold text-[#4A3B32] mb-3`}>{val.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-20 px-6 bg-[#4A3B32] text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 rounded-xl overflow-hidden shadow-lg">
            <img src="/images/logo.webp" alt="Heerak Food Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className={`${serif.className} text-2xl md:text-4xl font-bold text-white mb-8 leading-relaxed`}>
            "Heerak stands as a symbol of innovation and quality, aspiring to expand nationwide and continue serving loyal customers."
          </h2>
          <p className="text-orange-100/60 font-medium tracking-widest uppercase text-sm">
            - The Thakkar Family
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Sub-component for Timeline logic
function TimelineItem({ item, index }: { item: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Spacer for Desktop Layout */}
      <div className="hidden md:block w-5/12"></div>

      {/* The Dot */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#FFFBEB] border-4 border-orange-500 rounded-full z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
      </div>

      {/* Content Card */}
      <div className="ml-12 md:ml-0 md:w-5/12">
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-orange-50 relative ${isEven ? 'md:text-right' : 'md:text-left'}`}>
          {/* Arrow pointing to center (Desktop only) */}
          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-b border-l border-orange-50 transform rotate-45 ${isEven ? '-right-2 border-r border-t-0 border-l-0 border-b-0' : '-left-2'}`}></div>
          
          <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <span className="text-4xl font-extrabold text-orange-200">{item.year}</span>
            <div className="p-2 bg-orange-50 rounded-full text-orange-600">
              <item.icon size={16} />
            </div>
          </div>
          
          <h3 className={`${serif.className} text-xl font-bold text-[#4A3B32] mb-2`}>{item.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
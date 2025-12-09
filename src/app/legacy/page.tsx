'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Users, 
  Store, 
  TrendingUp, 
  Calendar, 
  Award, 
  Heart, 
  Leaf, 
  ShieldCheck, 
  Lightbulb,
  Wheat
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
    desc: "Founded by Mr. Ketanbhai Thakkar and his parents, Mr. Krishnakant & Mrs. Manjulaben. A part-time venture selling mamra from a single room.",
    icon: HomeIcon
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

// Helper Icons
function HomeIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function RefreshCcw({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>;
}

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#FFFBEB]/90 backdrop-blur-md border-b border-orange-100 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <span className={`${serif.className} text-xl font-bold text-[#4A3B32]`}>Heerak Food</span>
      <a href="/" className="text-sm font-semibold text-gray-500 hover:text-orange-600">Back to Home</a>
    </div>
  </nav>
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

        {/* Hero Image Placeholder - Founders */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto aspect-[16/7] bg-[#4A3B32] rounded-[3rem] overflow-hidden relative shadow-2xl"
        >
          {/* Sepia Overlay for Legacy Feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B32]/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 z-20"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-30 text-white">
            <h3 className={`${serif.className} text-3xl font-bold mb-2`}>The Foundation</h3>
            <p className="opacity-90 max-w-lg">
              Started by Mr. Ketanbhai Thakkar and his parents, Mr. Krishnakant & Mrs. Manjulaben Thakkar.
            </p>
          </div>

          {/* Actual Image Placeholder */}
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold text-xl">
             
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
            <button className="bg-[#4A3B32] text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
              Read More
            </button>
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
          <Wheat className="w-12 h-12 text-orange-400 mx-auto mb-6" />
          <h2 className={`${serif.className} text-2xl md:text-4xl font-bold text-white mb-8 leading-relaxed`}>
            "Heerak stands as a symbol of innovation and quality, aspiring to expand nationwide and continue serving loyal customers."
          </h2>
          <p className="text-orange-100/60 font-medium tracking-widest uppercase text-sm">
            - The Thakkar Family
          </p>
        </div>
      </section>
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
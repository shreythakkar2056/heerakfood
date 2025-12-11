'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// --- Fonts ---
const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700', '800'] });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function NotFound() {
  return (
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative inline-block mb-4"
        >
          <h1 className={`${serif.className} text-[150px] md:text-[200px] font-extrabold text-[#4A3B32]/10 leading-none select-none`}>
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             {/* Simple SVG Graphic: Empty Bowl */}
             <motion.svg 
                width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
                className="text-orange-500"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             >
                <path d="M4 10c0 4.418 3.582 8 8 8s8-3.582 8-8H4z" /> {/* Bowl */}
                <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" /> {/* Steam/Empty space */}
             </motion.svg>
          </div>
        </motion.div>

        <h2 className={`${serif.className} text-3xl md:text-4xl font-bold text-[#4A3B32] mb-4`}>
          Oops! The jar is empty.
        </h2>
        
        <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
          We looked everywhere—pantry, kitchen, and warehouse—but we couldn't find the page you're looking for.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="flex items-center justify-center gap-2 bg-[#4A3B32] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/10 w-full sm:w-auto">
              <Home size={18} /> Back to Home
            </button>
          </Link>
          
          <Link href="/products">
            <button className="flex items-center justify-center gap-2 bg-white text-[#4A3B32] border border-orange-200 px-8 py-3.5 rounded-xl font-bold hover:bg-orange-50 transition-all w-full sm:w-auto">
              <Search size={18} /> Browse Products
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-8 text-sm text-gray-400">
        © Heerak Food
      </div>
    </main>
  );
}
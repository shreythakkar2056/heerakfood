'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Award, 
  ChefHat, 
  Heart, 
  ArrowRight,
  MapPin,
  UtensilsCrossed,
  Menu, // Added for Mobile
  X     // Added for Mobile
} from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// --- Fonts ---
const serif = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['600', '700', '800']
});

const sans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'] 
});

// --- Animation Variants ---
const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemFadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
};

// --- Helper Component: 3D Tilt Card ---
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};


// --- Components ---

/**
 * Navigation: Responsive & Sticky
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const links = [
    { name: 'Our Products', href: '/products' },
    { name: 'Legacy', href: '/legacy' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-4 left-0 right-0 z-50 px-4 md:px-8`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-orange-100 p-3 flex justify-between items-center relative z-50"
        >
          
          {/* LEFT: Logo Area */}
          <Link href="/" className="flex items-center gap-3 pl-2 md:pl-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform p-1">
               <img src="/images/logo.webp" alt="Heerak Food Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`${serif.className} text-lg md:text-2xl font-bold text-gray-800 tracking-tight`}>
              Heerak Food
            </span>
          </Link>

          {/* RIGHT (Desktop): Links & CTA */}
          <div className="hidden md:flex items-center gap-8">
            <div className={`flex gap-6 ${sans.className} text-sm font-semibold text-gray-600`}>
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-orange-600 transition-colors relative group"
                >
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

          {/* RIGHT (Mobile): Hamburger Menu */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-orange-500 text-white p-2.5 rounded-full hover:bg-orange-600 transition-colors shadow-md"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
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
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`${serif.className} text-2xl font-bold text-[#4A3B32] hover:text-orange-600`}
                >
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

/**
 * Section A: Tasty Hero with Parallax
 */
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={ref} className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#FFFBEB]">
      
      {/* Organic Background Blobs */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
         <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div style={{ y: textY }} variants={containerStagger} initial="hidden" animate="show" className="text-center md:text-left pt-10 md:pt-0">
          <motion.div variants={itemFadeUp} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className={`${sans.className} text-xs font-bold text-gray-500 uppercase tracking-wider`}>
              100% Natural & Fresh from Ahmedabad
            </span>
          </motion.div>

          <motion.h1 
            variants={itemFadeUp}
            className={`${serif.className} text-5xl md:text-7xl font-extrabold text-[#4A3B32] leading-[1.1] mb-6`}
          >
            The Crunch of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Tradition.
            </span>
          </motion.h1>

          <motion.p 
            variants={itemFadeUp}
            className={`${sans.className} text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed`}
          >
            From premium Mamra (Puffed Rice) to authentic Gujarati snacks. We process the finest grains to bring the true taste of India to your kitchen.
          </motion.p>

          <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/products" className="w-full sm:w-auto">
              <button className="bg-[#4A3B32] text-white px-8 py-4 rounded-full font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-900/10 w-full hover:-translate-y-1">
                View Products <ArrowRight size={18} />
              </button>
            </Link>
            
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="bg-white text-[#4A3B32] border border-[#E5E5E5] px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all w-full hover:-translate-y-1">
                Contact Sales
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1.2, bounce: 0.3 }}
          className="relative mt-8 md:mt-0"
        >
          <div className="relative z-20 w-full aspect-square max-w-[500px] mx-auto bg-gradient-to-br from-orange-100 to-white rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border-8 border-white flex items-center justify-center overflow-hidden group">
              <img 
                src="/images/mamra bowl.png" 
                alt="Premium Mamra Bowl" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-in-out"
              />
          </div>
            
            {/* Floating Labels */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 right-0 md:-right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-green-100 flex items-center gap-3 z-30"
            >
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <Leaf size={20} />
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-bold text-gray-800">100% Organic</p>
                <p className="text-[10px] text-gray-500">No Preservatives</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [15, -15, 15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 left-0 md:-left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-orange-100 flex items-center gap-3 z-30"
            >
              <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                <ChefHat size={20} />
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-bold text-gray-800">Traditional Recipe</p>
                <p className="text-[10px] text-gray-500">Authentic Taste</p>
              </div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Section B: Product Categories (IMAGES INSTEAD OF ICONS)
 */
const ProductShowcase = () => {
  // Update this array with your actual image paths in 'public/images/'
  const products = [
    { 
      name: "Premium Mamra", 
      desc: "Light, crunchy puffed rice.", 
      image: "/images/Heerak Kolhapuri Mamra.webp", // Replace with actual product image
      color: "bg-blue-50",
      accent: "blue" 
    },
    { 
      name: "Various Poha", 
      desc: "Light & healthy Breakfast.", 
      image: "/images/Heerak Poha.webp", // Replace with Poha Image e.g. "/images/poha.png"
      color: "bg-orange-50",
      accent: "orange"
    },
    { 
      name: "Pure Jaggery", 
      desc: "Natural sweetener with minerals.", 
      image: "/images/Jaggery.webp", // Replace with Jaggery Image e.g. "/images/jaggery.png"
      color: "bg-yellow-50",
      accent: "yellow"
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`${serif.className} text-4xl font-bold text-[#4A3B32] mb-4`}>Our Fresh Collections</h2>
          <p className={`${sans.className} text-gray-500 text-lg`}>Crafted for health, taste, and everyday joy.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 px-2">
          {products.map((item, idx) => (
            <Link key={idx} href="/products" className="perspective-1000">
              <TiltCard className={`${item.color} rounded-[2rem] p-6 md:p-10 text-center border border-gray-50 shadow-lg shadow-gray-200/50 h-full flex flex-col items-center justify-between group bg-gradient-to-b from-white via-white to-${item.accent}-50`}>
                <div className="w-full">
                  {/* Actual Image Container */}
                  <div className="h-48 w-full relative mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/50 blur-2xl rounded-full scale-75 group-hover:scale-90 transition-transform"></div>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  <h3 className={`${serif.className} text-2xl md:text-3xl font-bold text-[#4A3B32] mb-3`}>{item.name}</h3>
                  <p className={`${sans.className} text-gray-600 mb-8 leading-relaxed`}>{item.desc}</p>
                </div>
                <span className="text-white bg-[#4A3B32] px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-orange-600 transition-colors shadow-md w-full md:w-auto">
                  View Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </TiltCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Section C: Why Choose Us (Responsive Packaging Image)
 */
const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-32 bg-[#FFFBEB] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Content */}
        <motion.div 
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="md:w-1/2 relative z-10 order-2 md:order-1"
        >
          <motion.span variants={itemFadeUp} className="text-orange-600 font-bold tracking-wider text-sm uppercase mb-2 block">Why Heerak Food?</motion.span>
          <motion.h2 variants={itemFadeUp} className={`${serif.className} text-4xl md:text-5xl font-bold text-[#4A3B32] mb-10 leading-tight`}>
            Purity you can <br/> <span className="italic text-orange-600 relative inline-block">taste
            <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5C15 1 25 9 40 5C55 1 65 9 80 5C90 2 95 5 98 8" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            </span> in every bite.
          </motion.h2>
          
          <div className="space-y-8">
            {[
              { title: "Farm to Factory", desc: "We source directly from trusted farmers in Gujarat.", icon: MapPin },
              { title: "Hygiene First", desc: "Processed in a dust-free, automated environment.", icon: Award },
              { title: "No Harmful Additives", desc: "Just pure grains, salt, and natural spices.", icon: Heart },
            ].map((f, i) => (
              <motion.div variants={itemFadeUp} key={i} className="flex gap-5 group">
                <div className="bg-white p-4 h-fit rounded-2xl shadow-sm text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0">
                  <f.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A3B32] text-xl mb-2 group-hover:text-orange-700 transition-colors">{f.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-base">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Visual (Fixed height for mobile) */}
        <div className="w-full md:w-1/2 relative perspective-1000 order-1 md:order-2">
           <motion.div 
              animate={{ y: [-10, 10, -10], rotate: [1, 2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-white p-3 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] border-4 border-white"
            >
              {/* FIXED HEIGHT: h-[350px] on mobile, h-[600px] on desktop */}
              <div className="bg-gray-100 rounded-[2rem] h-[350px] md:h-[600px] w-full flex items-center justify-center bg-[url('/images/heerak%20sathi%20mamra.webp')] bg-cover bg-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                 <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm text-white p-6">
                    <UtensilsCrossed size={64} className="mx-auto mb-4" />
                    <p className="font-bold text-xl">Premium Packaging</p>
                    <p className="text-sm">Sealed for freshness</p>
                 </div>
              </div>
              
              {/* Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1, rotate: -12 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                className="absolute top-6 -left-2 md:top-12 md:-left-12 bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center font-bold text-center leading-tight shadow-[0_10px_30px_-10px_rgba(245,158,11,0.5)] border-4 border-white text-xs md:text-base"
              >
                Best<br/>Quality
              </motion.div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * Section D: Footer
 */
const Footer = () => {
  return (
    <footer className="bg-[#4A3B32] text-orange-50 pt-24 pb-10 rounded-t-[3rem] md:rounded-t-[4rem] mt-10 relative z-10">
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
              {['Our Story', 'Products', 'Wholesale Inquiry', 'Contact Us'].map((item, idx) => {
                  const href = item === 'Our Story' ? '/legacy' : item === 'Products' ? '/products' : '/contact';
                  return (
                    <li key={idx}>
                        <Link href={href} className="hover:text-orange-400 transition-colors inline-block hover:translate-x-2 duration-300">
                        {item}
                        </Link>
                    </li>
                  )
              })}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-orange-100/70 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0" size={20} /> 
                Ahmedabad, Gujarat
              </li>
              <li className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                <ArrowRight className="text-orange-500 shrink-0" size={20} />
                <a href="tel:+919727724404">+91 97277 24404</a>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                 <ArrowRight className="text-orange-500 shrink-0" size={20} />
                <a href="mailto:heerakfood@gmail.com"  className="break-all">heerakfood@gmail.com</a>
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
};

export default function HeerakFoodPage() {
  return (
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB] selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden`}>
      <Navbar />
      <HeroSection />
      <ProductShowcase />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
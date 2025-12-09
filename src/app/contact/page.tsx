'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  Star, 
  Truck, 
  Send, 
  User, 
  Building2,
  CheckCircle2
} from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// --- Fonts ---
const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700'] });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#FFFBEB]/90 backdrop-blur-md border-b border-orange-100 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <span className={`${serif.className} text-xl font-bold text-[#4A3B32]`}>Heerak Food</span>
      <a href="/" className="text-sm font-semibold text-gray-500 hover:text-orange-600">Back to Home</a>
    </div>
  </nav>
);

// --- Form Sub-Components ---

const InputField = ({ label, placeholder, type = "text", required = false }: any) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all placeholder:text-gray-400"
    />
  </div>
);

const TextArea = ({ label, placeholder, rows = 4 }: any) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
    <textarea 
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all placeholder:text-gray-400 resize-none"
    />
  </div>
);

// --- Main Page ---

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'feedback' | 'partner'>('general');
  const [rating, setRating] = useState(0);

  return (
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB]`}>
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT SIDE: Contact Info & Map */}
          <div className="space-y-10">
            <div>
              <span className="text-orange-600 font-bold tracking-wider text-sm uppercase mb-3 block">
                Get in Touch
              </span>
              <h1 className={`${serif.className} text-4xl md:text-5xl font-extrabold text-[#4A3B32] mb-6 leading-tight`}>
                We'd love to hear <br /> from <span className="italic text-orange-600">you.</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you have a question about our products, want to become a distributor, or just want to share your love for our Mamra — our team is ready to chat.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className={`${serif.className} font-bold text-xl text-[#4A3B32] mb-1`}>Visit Factory</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Plot No. 123, GIDC Industrial Estate,<br/>
                    Naroda, Ahmedabad, Gujarat - 382330
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className={`${serif.className} font-bold text-xl text-[#4A3B32] mb-1`}>Quick Chat</h3>
                  <p className="text-gray-500 text-sm mb-3">Available Mon-Sat, 9am - 7pm</p>
                  <a href="https://wa.me/919876543210" target="_blank" className="inline-flex items-center gap-2 text-green-600 font-bold text-sm hover:underline">
                    Chat on WhatsApp <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className={`${serif.className} font-bold text-xl text-[#4A3B32] mb-1`}>Email Us</h3>
                  <p className="text-gray-500 text-sm">hello@heerakfood.in</p>
                  <p className="text-gray-500 text-sm">sales@heerakfood.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Form */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-orange-900/5 overflow-hidden border border-orange-50">
            
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100">
              {[
                { id: 'general', label: 'Say Hello', icon: User },
                { id: 'feedback', label: 'Feedback', icon: Star },
                { id: 'partner', label: 'Partner', icon: Truck },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-6 flex flex-col items-center gap-2 text-sm font-bold transition-all border-b-2
                    ${activeTab === tab.id 
                      ? 'text-orange-600 border-orange-600 bg-orange-50/50' 
                      : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Content Area */}
            <div className="p-8 md:p-10 min-h-[500px]">
              <AnimatePresence mode="wait">
                
                {/* 1. GENERAL INQUIRY / CAMPAIGN */}
                {activeTab === 'general' && (
                  <motion.form 
                    key="general"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="mb-6">
                      <h3 className={`${serif.className} text-2xl font-bold text-[#4A3B32]`}>Send a Message</h3>
                      <p className="text-sm text-gray-500">For campaigns, general questions, or just to say hi!</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="First Name" placeholder="John" required />
                      <InputField label="Last Name" placeholder="Doe" />
                    </div>
                    <InputField label="Email Address" placeholder="john@example.com" type="email" required />
                    
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all">
                        <option>General Inquiry</option>
                        <option>Marketing / Collaboration</option>
                        <option>Careers</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <TextArea label="Your Message" placeholder="How can we help you today?" />

                    <button className="w-full bg-[#4A3B32] text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 mt-4">
                      Send Message <Send size={18} />
                    </button>
                  </motion.form>
                )}

                {/* 2. FEEDBACK */}
                {activeTab === 'feedback' && (
                  <motion.form 
                    key="feedback"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                     <div className="mb-6">
                      <h3 className={`${serif.className} text-2xl font-bold text-[#4A3B32]`}>Rate our Product</h3>
                      <p className="text-sm text-gray-500">Your review helps us keep the crunch perfect.</p>
                    </div>

                    <div className="flex justify-center mb-8 gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-2 transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                        >
                          <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>

                    <InputField label="Your Name" placeholder="e.g. Rahul Verma" required />
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Purchased</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-orange-200">
                        <option>Select a product...</option>
                        <option>Kolhapuri Mamra</option>
                        <option>Jada Poha</option>
                        <option>Jaggery</option>
                      </select>
                    </div>
                    <TextArea label="Your Review" placeholder="What did you like or dislike?" />
                    
                    <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 mt-4">
                      Submit Feedback
                    </button>
                  </motion.form>
                )}

                {/* 3. DISTRIBUTOR / PARTNER */}
                {activeTab === 'partner' && (
                  <motion.form 
                    key="partner"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                     <div className="mb-6">
                      <h3 className={`${serif.className} text-2xl font-bold text-[#4A3B32]`}>Become a Distributor</h3>
                      <p className="text-sm text-gray-500">Join our network of 500+ successful partners.</p>
                    </div>

                    <InputField label="Business Name" placeholder="e.g. Shree Krishna Traders" required />
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="Contact Person" placeholder="Name" required />
                      <InputField label="Mobile Number" placeholder="+91" required />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32]" />
                      </div>
                      <div className="mb-4">
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Experience</label>
                         <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32]">
                          <option>New Business</option>
                          <option>1-5 Years</option>
                          <option>5+ Years</option>
                        </select>
                      </div>
                    </div>

                    <TextArea label="Current Business Details" placeholder="Tell us about your current shop size, storage capacity, and turnover..." />
                    
                    <button className="w-full bg-[#4A3B32] text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 mt-4">
                      Apply Now <CheckCircle2 size={20} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Map Section */}
      <section className="h-96 w-full relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29918790076!2d72.41492686885376!3d23.02015808455172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1709664551225!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}
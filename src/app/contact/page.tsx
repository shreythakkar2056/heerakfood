'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, MapPin, Mail, MessageCircle, Star, Truck, Send, User, Menu, X, ArrowRight, CheckCircle2, Loader2
} from 'lucide-react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
// FIXED IMPORT: Using relative path
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- Fonts ---
const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700', '800'] });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

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

// --- Form Components ---
const InputField = ({ label, placeholder, name, type = "text", required = false, onChange }: any) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type={type} 
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all placeholder:text-gray-400"
    />
  </div>
);

const TextArea = ({ label, placeholder, name, rows = 4, onChange }: any) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
    <textarea 
      rows={rows}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all placeholder:text-gray-400 resize-none"
    />
  </div>
);

// --- Main Page ---

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'feedback' | 'partner'>('general');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  // Form States
  const [generalForm, setGeneralForm] = useState({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
  const [feedbackForm, setFeedbackForm] = useState({ name: '', product: '', review: '' });
  const [partnerForm, setPartnerForm] = useState({ businessName: '', contactPerson: '', mobile: '', city: '', experience: 'New Business', details: '' });

  // Generic Handler
  const handleChange = (e: any, setForm: any) => {
    setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit Logic
  const handleSubmit = async (e: React.FormEvent, collectionName: string, data: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(), // Adds exact time
      });
      setStatus('success');
      // Reset forms
      setGeneralForm({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
      setFeedbackForm({ name: '', product: '', review: '' });
      setPartnerForm({ businessName: '', contactPerson: '', mobile: '', city: '', experience: 'New Business', details: '' });
      setRating(0);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 5000); // Clear message after 5s
    }
  };

  return (
    <main className={`min-h-screen ${sans.className} bg-[#FFFBEB]`}>
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Success/Error Toast */}
        {status && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-full font-bold text-white shadow-xl ${status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {status === 'success' ? 'Message Sent Successfully! ✅' : 'Something went wrong. Try again. ❌'}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT SIDE: Contact Info */}
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
                    Heerak Food, Beside Aiiyapa Mandir, <br/>
                    Vasna, Ahmedabad, Gujarat - 380007
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
                  <a href="https://wa.me/919727724404" target="_blank" className="inline-flex items-center gap-2 text-green-600 font-bold text-sm hover:underline">
                    Chat on WhatsApp <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className={`${serif.className} font-bold text-xl text-[#4A3B32] mb-1`}>Email Us</h3>
                  <p className="text-gray-500 text-sm">heerakfood@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Form */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-orange-900/5 overflow-hidden border border-orange-50">
            
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100">
              {[{ id: 'general', label: 'Say Hello', icon: User }, { id: 'feedback', label: 'Feedback', icon: Star }, { id: 'partner', label: 'Partner', icon: Truck }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 py-6 flex flex-col items-center gap-2 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id ? 'text-orange-600 border-orange-600 bg-orange-50/50' : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'}`}>
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Content Area */}
            <div className="p-8 md:p-10 min-h-[500px]">
              <AnimatePresence mode="wait">
                
                {/* 1. GENERAL FORM */}
                {activeTab === 'general' && (
                  <motion.form 
                    key="general" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                    onSubmit={(e) => handleSubmit(e, 'contacts', generalForm)}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="First Name" name="firstName" placeholder="John" required onChange={(e:any) => handleChange(e, setGeneralForm)} />
                      <InputField label="Last Name" name="lastName" placeholder="Doe" onChange={(e:any) => handleChange(e, setGeneralForm)} />
                    </div>
                    <InputField label="Email Address" name="email" placeholder="john@example.com" type="email" required onChange={(e:any) => handleChange(e, setGeneralForm)} />
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                      <select name="subject" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32]" onChange={(e:any) => handleChange(e, setGeneralForm)}>
                        <option>General Inquiry</option>
                        <option>Marketing / Collaboration</option>
                        <option>Careers</option>
                      </select>
                    </div>
                    <TextArea label="Your Message" name="message" placeholder="How can we help?" onChange={(e:any) => handleChange(e, setGeneralForm)} />
                    <button disabled={isSubmitting} className="w-full bg-[#4A3B32] text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} /></>}
                    </button>
                  </motion.form>
                )}

                {/* 2. FEEDBACK FORM */}
                {activeTab === 'feedback' && (
                  <motion.form 
                    key="feedback" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                    onSubmit={(e) => handleSubmit(e, 'feedbacks', { ...feedbackForm, rating })}
                  >
                    <div className="flex justify-center mb-8 gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setRating(star)} className={`p-2 transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}>
                          <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                    <InputField label="Your Name" name="name" placeholder="Rahul" required onChange={(e:any) => handleChange(e, setFeedbackForm)} />
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Purchased</label>
                        <select name="product" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#4A3B32]" onChange={(e:any) => handleChange(e, setFeedbackForm)}>
                            <option value="">Select Product...</option>
                            <optgroup label="Mamra (Puffed Rice)">
                              <option>Kolhapuri Mamra</option>
                              <option>Basmati Mamra</option>
                              <option>Sathi Mamra</option>
                            </optgroup>
                            <optgroup label="Poha (Flattened Rice)">
                              <option>Poha (Thick/Jada)</option>
                              <option>Nylon Poha</option>
                              <option>Maize Poha</option>
                            </optgroup>
                            <optgroup label="Jaggery (Gur)">
                              <option>Kolhapuri Jaggery</option>
                              <option>Desi Jaggery</option>
                            </optgroup>
                        </select>
                    </div>
                    <TextArea label="Your Review" name="review" placeholder="Tell us about the taste..." onChange={(e:any) => handleChange(e, setFeedbackForm)} />
                    <button disabled={isSubmitting} className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all flex justify-center">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Feedback'}
                    </button>
                  </motion.form>
                )}

                {/* 3. PARTNER FORM */}
                {activeTab === 'partner' && (
                  <motion.form 
                    key="partner" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                    onSubmit={(e) => handleSubmit(e, 'partners', partnerForm)}
                  >
                    <InputField label="Business Name" name="businessName" placeholder="Shree Trading" required onChange={(e:any) => handleChange(e, setPartnerForm)} />
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="Contact Person" name="contactPerson" required onChange={(e:any) => handleChange(e, setPartnerForm)} />
                      <InputField label="Mobile" name="mobile" required onChange={(e:any) => handleChange(e, setPartnerForm)} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                       <InputField label="City" name="city" onChange={(e:any) => handleChange(e, setPartnerForm)} />
                       <div className="mb-4">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Experience</label>
                          <select name="experience" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl" onChange={(e:any) => handleChange(e, setPartnerForm)}>
                             <option>New Business</option><option>1-5 Years</option><option>5+ Years</option>
                          </select>
                       </div>
                    </div>
                    <TextArea label="Business Details" name="details" placeholder="Turnover, storage capacity..." onChange={(e:any) => handleChange(e, setPartnerForm)} />
                    <button disabled={isSubmitting} className="w-full bg-[#4A3B32] text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-2">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <>Apply Now <CheckCircle2 size={20} /></>}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Embedded Map Section */}
      <section className="h-96 w-full relative grayscale hover:grayscale-0 transition-all duration-700 border-t border-orange-100">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.742558307966!2d72.54579947476951!3d22.99649241730196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e853b0f776919%3A0xb2edbc24d78eaadb!2sHeerak%20Food!5e0!3m2!1sen!2sin!4v1765394985783!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <Footer />
    </main>
  );
}
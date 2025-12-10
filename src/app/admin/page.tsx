'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Loader2, Lock, User, Star, Truck, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Simple Key Check (Change 'heerak123' to whatever you want)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === 'sahaj1anand') {
      setIsAuthenticated(true);
      fetchData('contacts');
    } else {
      alert('Wrong Key!');
    }
  };

  const fetchData = async (collectionName: string) => {
    setLoading(true);
    setActiveTab(collectionName);
    try {
      const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
    } catch (error) {
      console.error("Error fetching: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[#4A3B32] mb-2">Admin Access</h1>
          <p className="text-gray-500 text-sm mb-6">Enter the secret key to view inquiries.</p>
          <input 
            type="password" 
            placeholder="Enter Key" 
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-center focus:outline-none focus:border-orange-500"
          />
          <button className="w-full bg-[#4A3B32] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-[#4A3B32]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Heerak Admin</h1>
          <button onClick={() => fetchData(activeTab)} className="p-2 bg-white rounded-full shadow hover:rotate-180 transition-transform duration-500">
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <TabButton icon={User} label="Inquiries" isActive={activeTab === 'contacts'} onClick={() => fetchData('contacts')} />
          <TabButton icon={Star} label="Feedback" isActive={activeTab === 'feedbacks'} onClick={() => fetchData('feedbacks')} />
          <TabButton icon={Truck} label="Distributors" isActive={activeTab === 'partners'} onClick={() => fetchData('partners')} />
        </div>

        {/* Data List */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : (
          <div className="grid gap-4">
            {data.length === 0 && <p className="text-center text-gray-400 py-10">No data found yet.</p>}
            
            {data.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                
                {/* RENDER LOGIC BASED ON TAB */}
                {activeTab === 'contacts' && (
                  <>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-lg">{item.firstName} {item.lastName}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{new Date(item.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-orange-600 font-bold mb-2">{item.subject}</p>
                    <p className="text-gray-600 mb-2">{item.message}</p>
                    <p className="text-xs text-gray-400">{item.email}</p>
                  </>
                )}

                {activeTab === 'feedbacks' && (
                  <>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(item.rating || 0)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-sm font-bold bg-green-50 text-green-700 px-2 py-1 rounded inline-block mb-2">{item.product}</p>
                    <p className="text-gray-600">"{item.review}"</p>
                  </>
                )}

                {activeTab === 'partners' && (
                  <>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-lg">{item.businessName}</h3>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{item.experience}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <p><span className="font-bold">Contact:</span> {item.contactPerson}</p>
                      <p><span className="font-bold">Phone:</span> {item.mobile}</p>
                      <p><span className="font-bold">City:</span> {item.city}</p>
                    </div>
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{item.details}</p>
                  </>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const TabButton = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all
      ${isActive ? 'bg-[#4A3B32] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}
    `}
  >
    <Icon size={18} /> {label}
  </button>
);
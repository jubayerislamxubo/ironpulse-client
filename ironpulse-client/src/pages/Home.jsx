import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 👈 রাউটার লিংক ইমপোর্ট করা হয়েছে

const Home = () => {
  const [featuredClasses, setFeaturedClasses] = useState([]);

  useEffect(() => {
    axios.get('https://ironpulse-server-silk.vercel.app/featured-classes')
      .then(response => {
        const enrichedData = response.data.map((cls, index) => {
          const extraInfo = [
            { trainer: "Alex Rodriguez", duration: "1 Month", bookings: 142 },
            { trainer: "Sarah Jenkins", duration: "1 Month", bookings: 120 },
            { trainer: "Marcus Vance", duration: "3 Weeks", bookings: 98 }
          ];
          return { ...cls, ...extraInfo[index % 3] };
        });
        setFeaturedClasses(enrichedData);
      })
      .catch(error => {
        console.error("Error fetching featured classes:", error);
      });
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="text-center py-20 px-4 bg-slate-950">
        <h1 className="text-5xl font-black uppercase tracking-tight leading-none mb-4">
          PUSH YOUR LIMITS <span className="text-emerald-400 block mt-2">BUILD YOUR LEGACY</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
          Amader platform teke fitness journey shuru korun certified trainer ebon premium dashboard er sathe.
        </p>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-8 py-3 rounded-md uppercase tracking-wider text-xs transition">
          EXPLORE CLASSES
        </button>
      </div>

      
      <div className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            FEATURED CLASSES
          </h2>
          <p className="text-slate-500 mt-1 text-xs uppercase tracking-wider">
            Top booked classes architecture by our professionals
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredClasses.map((cls) => (
            <div 
              key={cls._id} 
              className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between border border-slate-100"
            >
              <div>
                
                <div className="w-full h-48 bg-slate-200 overflow-hidden">
                  <img 
                    src={cls.image} 
                    alt={cls.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
               
                <div className="p-6">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {cls.category}
                  </span>
                  
                  <div className="mt-4 space-y-1 text-slate-800">
                    <h3 className="text-base font-black text-slate-900 mb-2">{cls.name}</h3>
                    <p className="text-sm font-bold text-slate-900">Trainer: {cls.trainer}</p>
                    <p className="text-xs text-slate-500">Duration: {cls.duration} | Bookings: {cls.bookings}</p>
                  </div>
                </div>
              </div>
              
              
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-50 mt-4">
                <span className="text-xl font-black text-emerald-600">৳{cls.price}</span>
                
                <Link 
                  to={`/classes/${cls._id}`} 
                  className="bg-slate-950 hover:bg-slate-900 text-white font-black px-4 py-2 rounded-md uppercase tracking-wider text-xs transition text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
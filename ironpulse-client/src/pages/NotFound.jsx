import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-9xl font-black text-emerald-500 tracking-widest mb-4 animate-bounce">
        404
      </div>
      <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
        Page Not Found
      </h2>
      <p className="text-slate-400 max-w-md mb-8 text-sm md:text-base">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to training!
      </p>
      <Link
        to="/"
        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm transition transform active:scale-95 shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
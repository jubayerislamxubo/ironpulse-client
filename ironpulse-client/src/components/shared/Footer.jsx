import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 px-8 py-10 border-t border-slate-800 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-emerald-400 font-bold text-lg mb-3">IronPulse</h3>
          <p className="text-sm text-slate-400">Your premium fitness companion platform.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/classes" className="hover:text-emerald-400">Classes</Link></li>
            <li><Link to="/forum" className="hover:text-emerald-400">Forum</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm text-slate-400">Email: info@ironpulse.com</p>
          <p className="text-sm text-slate-400">Phone: +880 1234 5678</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <span className="text-sm text-slate-500">Twitter / Facebook</span>
        </div>
      </div>
      <div className="text-center mt-8 pt-4 border-t border-slate-800 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} IronPulse Academy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
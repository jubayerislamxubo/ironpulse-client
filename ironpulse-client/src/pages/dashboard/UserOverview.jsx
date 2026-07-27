import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const UserOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ bookedCount: 0, favoriteCount: 0 });
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      // Fetch user role
      axios.get(`https://ironpulse-server-silk.vercel.app/users?email=${user.email}`)
        .then(res => {
          setRole(res.data?.role || 'user');
        })
        .catch(() => {
          axios.get(`https://ironpulse-server-silk.vercel.app/users/admin/${user.email}`)
            .then(res => {
              if (res.data?.admin) setRole('admin');
            })
            .catch(() => setRole('user'));
        });

      // Fetch user stats
      axios.get(`https://ironpulse-server-silk.vercel.app/user-stats?email=${user.email}`)
        .then(res => {
          setStats(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          {role} <span className="text-emerald-400">Overview</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome back, <span className="text-white font-bold">{user?.displayName || 'Member'}</span>!
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booked Classes Stats */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Booked Classes</p>
            <h3 className="text-4xl font-black text-emerald-400 mt-2">
              {loading ? '...' : stats.bookedCount}
            </h3>
          </div>
          <div className="bg-emerald-500/10 p-4 rounded-xl text-3xl">🏋️‍♂️</div>
        </div>

        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Favorites</p>
            <h3 className="text-4xl font-black text-amber-400 mt-2">
              {loading ? '...' : stats.favoriteCount}
            </h3>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-xl text-3xl">⭐</div>
        </div>
      </div>

      
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Profile Information</h2>

        <div className="flex items-center gap-5">
          
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://i.ibb.co/mJRk03X/avatar.png';
              }}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 font-black text-2xl">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-black text-white uppercase tracking-wide">
                {user?.displayName || 'User'}
              </h3>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                {role}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
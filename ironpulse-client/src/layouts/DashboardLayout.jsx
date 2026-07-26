import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState('user'); 
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (user?.email) {
      axios.get(`https://ironpulse-server-silk.vercel.app/users/role/${user.email}`)
        .then(res => {
          setRole(res.data?.role || 'user');
          setLoading(false);
        })
        .catch(() => {
          setRole('user');
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-bold text-emerald-400">IronPulse</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded uppercase">
              {role}
            </span>
          </Link>

          
          <nav className="space-y-2">
            {/* Common Link */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              📊 Overview
            </NavLink>

           
            {role === 'user' && (
              <>
                <NavLink
                  to="/dashboard/booked-classes"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  🏋️ Booked Classes
                </NavLink>
                <NavLink
                  to="/dashboard/favorites"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  ⭐ Favorite Classes
                </NavLink>
                <NavLink
                  to="/dashboard/apply-trainer"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  📋 Apply as Trainer
                </NavLink>
              </>
            )}

            
            {role === 'trainer' && (
              <>
                <NavLink
                  to="/dashboard/add-class"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  ➕ Add Class
                </NavLink>
                <NavLink
                  to="/dashboard/my-classes"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  📚 My Classes
                </NavLink>
                <NavLink
                  to="/dashboard/add-forum-post"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  ✍️ Add Forum Post
                </NavLink>
                <NavLink
                  to="/dashboard/my-posts"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  📝 My Forum Posts
                </NavLink>
              </>
            )}

            
            {role === 'admin' && (
              <>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  👥 Manage Users
                </NavLink>
                <NavLink
                  to="/dashboard/applied-trainers"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  📩 Applied Trainers
                </NavLink>
                <NavLink
                  to="/dashboard/manage-trainers"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  🥋 Manage Trainers
                </NavLink>
                <NavLink
                  to="/dashboard/manage-classes"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  🏋️ Manage Classes
                </NavLink>
                <NavLink
                  to="/dashboard/transactions"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  💳 Transactions
                </NavLink>
              </>
            )}
          </nav>
        </div>

        
        <div className="pt-6 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-lg font-semibold transition text-xs"
          >
            ← Back to Main Site
          </Link>
        </div>
      </aside>

     
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
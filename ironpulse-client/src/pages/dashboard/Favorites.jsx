import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      
      axios.get(`http://localhost:5000/favorites?email=${user.email}`)
        .then(res => {
          setFavorites(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading favorites:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleRemove = (id) => {
    
    setFavorites(favorites.filter(item => item._id !== id));
    
    
    axios.delete(`http://localhost:5000/favorites/${id}`)
      .catch(err => console.error("Remove Error:", err));
  };

  if (loading) {
    return <div className="text-emerald-400 font-bold p-6">Loading Favorites...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Favorite <span className="text-emerald-400">Classes</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Your bookmarked workouts and saved routines.</p>
      </div>

      
      {favorites.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl text-center">
          <p className="text-slate-400 text-lg mb-4">You haven't saved any favorite classes yet.</p>
          <Link
            to="/all-classes"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-xl uppercase text-xs tracking-wider inline-block transition"
          >
            Explore Classes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item, index) => (
            <div key={item._id || index} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd'}
                alt={item.className || item.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 uppercase">
                    {item.category || 'Fitness'}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">
                    {item.className || item.name || 'IronPulse Session'}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Trainer: {item.trainerName || 'Master Trainer'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800 gap-2">
                  <Link
                    to={`/classes/${item.classId || item._id}`}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-lg text-xs transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/30 font-bold px-4 py-2 rounded-lg text-xs transition"
                  >
                    Remove 🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
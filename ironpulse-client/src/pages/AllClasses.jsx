import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const AllClasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/classes')
      .then(res => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching classes:", err);
        setLoading(false);
      });
  }, []);

  
  const handleAddFavorite = (cls) => {
    if (!user?.email) {
      alert('Please login to add favorites!');
      return;
    }

    const favData = {
      userEmail: user.email,
      classId: cls._id,
      className: cls.name,
      image: cls.image,
      price: cls.price,
      category: cls.category
    };

    axios.post('http://localhost:5000/favorites', favData)
      .then(res => {
        if (res.status === 201) {
          alert(`⭐ "${cls.name}" added to your favorites!`);
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert('This class is already in your favorites!');
        } else {
          alert('Failed to add to favorites. Make sure your local server is running.');
        }
      });
  };

  const filteredClasses = classes.filter(item => {
    const nameMatch = (item.name || '').toLowerCase().includes(search.toLowerCase());
    const catMatch = category && category !== 'All' ? (item.category || '').toLowerCase() === category.toLowerCase() : true;
    return nameMatch && catMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-wider">
          Explore Our <span className="text-emerald-400">Fitness Classes</span>
        </h1>
        <p className="text-slate-400 text-sm">Find your workout and level up your fitness journey today.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by class name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
        >
          <option value="All">All Categories</option>
          <option value="Gym">Gym</option>
          <option value="Yoga">Yoga</option>
          <option value="Cardio">Cardio</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-emerald-400 font-bold">Loading Classes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((item) => (
            <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition flex flex-col justify-between relative group">
              
              
              <button
                onClick={() => handleAddFavorite(item)}
                title="Add to Favorites"
                className="absolute top-3 right-3 bg-slate-950/80 hover:bg-emerald-500 hover:text-slate-950 text-amber-400 p-2.5 rounded-full border border-slate-800 transition z-10 shadow-lg cursor-pointer"
              >
                ⭐
              </button>

              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="p-5 space-y-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2">
                    {item.details}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
                <span className="text-emerald-400 font-black text-lg">৳{item.price}</span>
                <Link
                  to={`/classes/${item._id}`}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClasses;
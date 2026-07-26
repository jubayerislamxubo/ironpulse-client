import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const AddNewClass = () => {
  const { user } = useContext(AuthContext);
  const [className, setClassName] = useState('');
  const [image, setImage] = useState('');
  const [details, setDetails] = useState('');
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const newClass = {
      className,
      image,
      details,
      requirements,
      trainerName: user?.displayName,
      trainerEmail: user?.email,
      trainerPhoto: user?.photoURL,
      createdAt: new Date()
    };

    axios.post('https://ironpulse-server-silk.vercel.app/classes', newClass)
      .then(() => {
        setLoading(false);
        setMessage('Class created successfully! 🎉');
        setClassName('');
        setImage('');
        setDetails('');
        setRequirements('');
      })
      .catch(() => {
        setLoading(false);
        setMessage('Failed to create class. Please try again.');
      });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Add New <span className="text-emerald-400">Class</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Design and publish a new fitness class session.</p>
      </div>

      {/* Form Container */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg">
        {message && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Class Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. High Intensity Cardio Blast"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Image URL
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Class Details & Overview
            </label>
            <textarea
              required
              rows="4"
              placeholder="Describe what students will learn and achieve..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Equipment / Requirements
            </label>
            <input
              type="text"
              placeholder="e.g. Yoga Mat, Water Bottle, Dumbbells"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-4 rounded-xl uppercase tracking-wider text-sm transition transform active:scale-95 shadow-lg"
          >
            {loading ? 'Creating Class...' : 'Add Class'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewClass;
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const ApplyTrainer = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    email: user?.email || '',
    age: '',
    experience: '',
    skills: '',
    availableTime: 'Morning (08:00 AM - 12:00 PM)',
    bio: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    axios.post('https://ironpulse-server-silk.vercel.app/apply-trainer', formData)
      .then(res => {
        setLoading(false);
        setStatusMessage({
          type: 'success',
          text: 'Application submitted successfully! Our team will review your application soon.'
        });
      })
      .catch(err => {
        setLoading(false);
        const errorMsg = err.response?.data?.message || 'Failed to submit application. Try again.';
        setStatusMessage({ type: 'error', text: errorMsg });
      });
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Apply as <span className="text-emerald-400">Trainer</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Join IronPulse as an expert trainer and empower our fitness community.
        </p>
      </div>

      
      {statusMessage.text && (
        <div className={`p-4 rounded-xl text-sm font-bold border ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
            : 'bg-red-500/10 text-red-400 border-red-500/30'
        }`}>
          {statusMessage.text}
        </div>
      )}

      
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          <div>
            <label className="block text-slate-300 font-semibold text-sm mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              readOnly
              className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed text-sm focus:outline-none"
            />
          </div>

         
          <div>
            <label className="block text-slate-300 font-semibold text-sm mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed text-sm focus:outline-none"
            />
          </div>

        
          <div>
            <label className="block text-slate-300 font-semibold text-sm mb-2">Age</label>
            <input
              type="number"
              name="age"
              required
              placeholder="e.g. 28"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none transition"
            />
          </div>

         
          <div>
            <label className="block text-slate-300 font-semibold text-sm mb-2">Years of Experience</label>
            <input
              type="number"
              name="experience"
              required
              placeholder="e.g. 5"
              value={formData.experience}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none transition"
            />
          </div>

          
          <div>
            <label className="block text-slate-300 font-semibold text-sm mb-2">Specializations / Skills</label>
            <input
              type="text"
              name="skills"
              required
              placeholder="e.g. Bodybuilding, HIIT, Yoga"
              value={formData.skills}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none transition"
            />
          </div>

          
          <div>
            <label className="block text-slate-300 font-semibold text-sm mb-2">Preferred Available Slot</label>
            <select
              name="availableTime"
              value={formData.availableTime}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none transition"
            >
              <option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</option>
              <option value="Afternoon (02:00 PM - 06:00 PM)">Afternoon (02:00 PM - 06:00 PM)</option>
              <option value="Evening (06:00 PM - 10:00 PM)">Evening (06:00 PM - 10:00 PM)</option>
            </select>
          </div>
        </div>

        
        <div>
          <label className="block text-slate-300 font-semibold text-sm mb-2">Short Bio & Background</label>
          <textarea
            name="bio"
            rows="4"
            required
            placeholder="Tell us briefly about your certification, fitness journey, and coaching style..."
            value={formData.bio}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm focus:border-emerald-500 focus:outline-none transition"
          ></textarea>
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-black py-4 rounded-xl uppercase tracking-wider text-sm transition"
        >
          {loading ? 'Submitting Application...' : 'Submit Trainer Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyTrainer;
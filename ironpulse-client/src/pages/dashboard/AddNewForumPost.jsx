import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const AddNewForumPost = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Fitness Tips');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const forumPost = {
      title,
      content,
      category,
      authorName: user?.displayName || 'Trainer',
      authorEmail: user?.email,
      authorPhoto: user?.photoURL,
      authorRole: 'Trainer',
      votes: 0,
      createdAt: new Date()
    };

    axios.post('https://ironpulse-server-silk.vercel.app/forum-posts', forumPost)
      .then(() => {
        setLoading(false);
        setMessage('Forum post created successfully! 🚀');
        setTitle('');
        setContent('');
      })
      .catch(() => {
        setLoading(false);
        setMessage('Failed to publish forum post. Please try again.');
      });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Add Forum <span className="text-emerald-400">Post</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Share tips, news, and advice with the IronPulse community.</p>
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
              Post Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 5 Common Mistakes During Deadlifts"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            >
              <option value="Fitness Tips">Fitness Tips</option>
              <option value="Nutrition & Diet">Nutrition & Diet</option>
              <option value="Workout Routines">Workout Routines</option>
              <option value="Platform Announcement">Platform Announcement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Post Content
            </label>
            <textarea
              required
              rows="6"
              placeholder="Write your article or tips here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-4 rounded-xl uppercase tracking-wider text-sm transition transform active:scale-95 shadow-lg"
          >
            {loading ? 'Publishing Post...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewForumPost;
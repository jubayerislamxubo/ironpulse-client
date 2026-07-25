import React, { useState } from 'react';

const Forum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Ultimate Post-Workout Nutrition Guide",
      author: "Coach Marcus",
      role: "Senior Trainer",
      date: "June 20, 2026",
      desc: "Shundor shastho gorar jonno proper nutrition khub dorkar. Workout er por protein abong carbs er balance maintain korle muscle recovery druto hoy.",
      likes: 24,
      commentsCount: 5,
      tags: ["Nutrition", "Diet"]
    },
    {
      id: 2,
      title: "5 Common Mistakes in Deadlift Form",
      author: "Trainer Alex",
      role: "Powerlifting Coach",
      date: "June 18, 2026",
      desc: "Deadlift korar shomoy bishal boro vul gulo avoid korun. Spine sobshomoy neutral rakhte hobe, nabolto lumbar spine injury hother bishal risk thake.",
      likes: 42,
      commentsCount: 12,
      tags: ["Powerlifting", "Safety"]
    },
    {
      id: 3,
      title: "Mental Health Benefits of Daily Yoga",
      author: "Sarah Jenkins",
      role: "Yoga Instructor",
      date: "June 15, 2026",
      desc: "Protidini ektu yoga amader brain ke refresh rakhte bishal vumika rakhe. Cortisol level komiye eta anxiety control-e layout management bhalo kore.",
      likes: 19,
      commentsCount: 3,
      tags: ["Yoga", "MentalHealth"]
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  
  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const post = {
      id: Date.now(),
      title: newTitle,
      author: "CurrentUser",
      role: "Member",
      date: "Just Now",
      desc: newDesc,
      likes: 0,
      commentsCount: 0,
      tags: ["Discussion"]
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-3">
            Community <span className="text-emerald-400">Forum</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Share knowledge, tips, and fitness architecture layouts with expert trainers and fitness enthusiasts.
          </p>
        </div>

       
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-10 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4">Start a Discussion</h3>
          <form onSubmit={handleAddPost} className="space-y-4">
            <input
              type="text"
              placeholder="Topic or Title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <textarea
              rows="3"
              placeholder="Share your thoughts or ask a question..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl uppercase text-xs transition tracking-wider"
              >
                Post Topic
              </button>
            </div>
          </form>
        </div>

       
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition shadow-lg">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-white text-lg md:text-xl hover:text-emerald-400 transition cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    By <span className="font-bold text-emerald-400">{post.author}</span> ({post.role}) • {post.date}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                {post.desc}
              </p>

              <div className="flex gap-2 mb-6">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-slate-800 text-sm font-bold text-slate-400">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 hover:text-emerald-400 transition active:scale-95"
                >
                  👍 <span>{post.likes} Likes</span>
                </button>
                <div className="flex items-center gap-2 cursor-pointer hover:text-slate-200 transition">
                  💬 <span>{post.commentsCount} Comments</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Forum;
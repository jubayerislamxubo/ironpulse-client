import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = () => {
    axios.get('http://localhost:5000/trainers')
      .then(res => {
        setTrainers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDemote = (trainerId, email) => {
    axios.patch(`http://localhost:5000/demote-trainer/${trainerId}`, { email })
      .then(() => {
        fetchTrainers();
      })
      .catch(err => console.error(err));
  };

  if (loading) {
    return <div className="text-emerald-400 font-bold p-6">Loading Trainers...</div>;
  }

  return (
    <div className="space-y-6">
     
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          All <span className="text-emerald-400">Trainers</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage active platform instructors and team members.</p>
      </div>

     
      {trainers.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl text-center">
          <p className="text-slate-400 text-lg">No active trainers found.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-lg">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Trainer</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {trainers.map((trainer) => (
                <tr key={trainer._id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={trainer.photoURL || 'https://i.ibb.co/mJRk03X/avatar.png'}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                    />
                    <div>
                      <p className="font-bold text-white">{trainer.displayName || trainer.name}</p>
                      <p className="text-slate-400 text-xs">{trainer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Trainer
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDemote(trainer._id, trainer.email)}
                      className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/30 font-bold px-4 py-2 rounded-lg text-xs transition"
                    >
                      Demote to User ⬇️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTrainers;
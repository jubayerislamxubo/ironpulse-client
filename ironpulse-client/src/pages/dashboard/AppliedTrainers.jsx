import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppliedTrainers = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    axios.get('http://localhost:5000/applied-trainers')
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleApprove = (app) => {
    axios.patch(`http://localhost:5000/approve-trainer/${app._id}`, { email: app.userEmail })
      .then(() => {
        fetchApplications();
      })
      .catch(err => console.error(err));
  };

  const handleReject = (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    axios.patch(`http://localhost:5000/reject-trainer/${selectedApp._id}`, { feedback })
      .then(() => {
        setSelectedApp(null);
        setFeedback('');
        fetchApplications();
      })
      .catch(err => console.error(err));
  };

  if (loading) {
    return <div className="text-emerald-400 font-bold p-6">Loading Applications...</div>;
  }

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Applied <span className="text-emerald-400">Trainers</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Review trainer applications and assign instructor roles.</p>
      </div>

    
      {applications.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl text-center">
          <p className="text-slate-400 text-lg">No pending trainer applications.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-lg">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={app.photoURL || 'https://i.ibb.co/mJRk03X/avatar.png'} alt="" className="w-10 h-10 rounded-full object-cover border border-emerald-500/30" />
                    <div>
                      <p className="font-bold text-white">{app.userName}</p>
                      <p className="text-slate-400 text-xs">{app.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-400">{app.specialty}</td>
                  <td className="px-6 py-4 text-sm">{app.experience} Years</td>
                  <td className="px-6 py-4">
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleApprove(app)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition"
                    >
                      Approve ✅
                    </button>
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/30 font-bold px-3 py-1.5 rounded-lg text-xs transition"
                    >
                      Reject ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Reject Application</h3>
            <p className="text-slate-400 text-sm">
              Provide feedback for <span className="text-emerald-400 font-semibold">{selectedApp.userName}</span>:
            </p>
            <textarea
              required
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="State the reason for rejection..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
            ></textarea>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTrainers;
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const ManageSlots = () => {
  const { user } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/trainer/slots/${user.email}`)
        .then(res => {
          setSlots(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const handleDeleteSlot = (slotId) => {
    axios.delete(`http://localhost:5000/slots/${slotId}`)
      .then(() => {
        setSlots(slots.filter(slot => slot._id !== slotId));
      })
      .catch(err => console.error(err));
  };

  if (loading) {
    return <div className="text-emerald-400 font-bold p-6">Loading Slots...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Manage <span className="text-emerald-400">Slots</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Review booked sessions and remove unbooked time slots.</p>
      </div>

      {/* Slots Table */}
      {slots.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl text-center">
          <p className="text-slate-400 text-lg">No slots created yet.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-lg">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Slot Name / Time</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Booked By</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {slots.map((slot) => (
                <tr key={slot._id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4 font-bold text-white">{slot.slotName} ({slot.slotTime})</td>
                  <td className="px-6 py-4 text-emerald-400 font-semibold">{slot.className}</td>
                  <td className="px-6 py-4 text-sm">
                    {slot.bookedBy ? (
                      <div>
                        <p className="text-white font-medium">{slot.bookedBy.name}</p>
                        <p className="text-slate-400 text-xs">{slot.bookedBy.email}</p>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {slot.isBooked ? (
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        Booked
                      </span>
                    ) : (
                      <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        Available
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {!slot.isBooked ? (
                      <button
                        onClick={() => handleDeleteSlot(slot._id)}
                        className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/30 font-bold px-4 py-2 rounded-lg text-xs transition"
                      >
                        Delete Slot 🗑️
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 font-semibold uppercase">Locked</span>
                    )}
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

export default ManageSlots;
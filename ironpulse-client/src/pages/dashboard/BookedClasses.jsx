import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const BookedClasses = () => {
  const { user } = useContext(AuthContext);
  const [bookedClasses, setBookedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      
      axios.get(`https://ironpulse-server-silk.vercel.app/bookings?email=${user.email}`)
        .then(res => {
          setBookedClasses(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading booked classes:", error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <div className="text-emerald-400 font-bold p-6">Loading Booked Classes...</div>;
  }

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Booked <span className="text-emerald-400">Classes</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage and review all your registered sessions.</p>
      </div>

      
      {bookedClasses.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl text-center">
          <p className="text-slate-400 text-lg mb-4">You haven't booked any classes yet.</p>
          <Link
            to="/all-classes"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-xl uppercase text-xs tracking-wider inline-block transition"
          >
            Explore Classes
          </Link>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-lg">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Class Name</th>
                <th className="px-6 py-4">Trainer Name</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bookedClasses.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4 font-bold text-white">
                    {item.className || item.name || 'IronPulse Session'}
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-semibold">
                    {item.trainerName || 'Master Trainer'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {item.schedule || item.slot || 'Regular Slot'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/classes/${item.classId || item._id}`}
                      className="bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 font-bold px-4 py-2 rounded-lg text-xs transition"
                    >
                      View Details
                    </Link>
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

export default BookedClasses;
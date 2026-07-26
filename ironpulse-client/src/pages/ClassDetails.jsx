import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    axios.get(`https://ironpulse-server-silk.vercel.app/classes/${id}`)
      .then(res => {
        setClassData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching class details:", err);
        setLoading(false);
      });
  }, [id]);

 
  const handleJoinClass = () => {
    if (!user?.email) {
      alert('Please login to book a class!');
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    const bookingPayload = {
      userEmail: user.email,
      userName: user.displayName || 'Member',
      classId: classData._id,
      className: classData.className || classData.name,
      price: classData.price || 2000,
      image: classData.image,
      bookedAt: new Date()
    };

    axios.post('https://ironpulse-server-silk.vercel.app/bookings', bookingPayload)
      .then(() => {
        setBookingLoading(false);
        alert('Successfully joined the class! 🎉 Check your dashboard.');
        navigate('/dashboard/booked-classes');
      })
      .catch(() => {
        setBookingLoading(false);
        alert('Failed to book class. Please try again.');
      });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-emerald-400 font-bold text-sm tracking-wider uppercase">Loading Details...</p>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-3xl font-black text-rose-500 uppercase">Class Not Found!</h2>
        <Link
          to="/all-classes"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition"
        >
          Back to Classes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Link to="/all-classes" className="hover:text-emerald-400 transition">Classes</Link>
        <span>/</span>
        <span className="text-emerald-400">{classData.className || classData.name}</span>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Banner Image */}
        <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <img
            src={classData.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200'}
            alt={classData.className}
            className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
          <span className="absolute top-4 left-4 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
            Featured Class
          </span>
        </div>

       
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-wide leading-tight">
              {classData.className || classData.name}
            </h1>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              {classData.details || classData.description || 'Level up your fitness journey with our elite group training session.'}
            </p>
          </div>

         
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duration</p>
              <p className="text-sm font-bold text-emerald-400 mt-0.5">{classData.duration || '60 Minutes'}</p>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Intensity</p>
              <p className="text-sm font-bold text-amber-400 mt-0.5">{classData.intensity || 'High Performance'}</p>
            </div>
          </div>

          
          <button
            onClick={handleJoinClass}
            disabled={bookingLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-4 rounded-xl uppercase tracking-wider text-xs text-center shadow-lg transition transform active:scale-95 disabled:opacity-50"
          >
            {bookingLoading ? 'Processing Booking...' : 'Join This Class'}
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-xl font-black text-white uppercase tracking-wider border-b border-slate-800 pb-4">
            About <span className="text-emerald-400">The Program</span>
          </h2>
          <div className="text-slate-300 text-sm leading-relaxed space-y-4">
            <p>
              {classData.details || classData.description || 'This class is engineered to maximize strength, endurance, and overall functional fitness.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-xl font-black text-white uppercase tracking-wider border-b border-slate-800 pb-4">
            Class <span className="text-emerald-400">Trainers</span>
          </h2>
          {classData.trainers && classData.trainers.length > 0 ? (
            <div className="space-y-4">
              {classData.trainers.map((trainer, index) => {
                const name = typeof trainer === 'string' ? trainer : (trainer.name || 'Instructor');
                return (
                  <div key={index} className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{name}</h4>
                      <p className="text-xs text-emerald-400">Certified Coach</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-400 text-xs">No trainers assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
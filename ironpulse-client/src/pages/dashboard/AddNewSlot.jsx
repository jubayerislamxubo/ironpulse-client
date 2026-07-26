import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const AddNewSlot = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [slotName, setSlotName] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    // Fetch available classes to assign slot to
    axios.get('https://ironpulse-server-silk.vercel.app/classes')
      .then(res => {
        setClasses(res.data);
        if (res.data.length > 0) setSelectedClass(res.data[0].className);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDays.length === 0) {
      setMessage('Please select at least one day.');
      return;
    }

    setLoading(true);
    setMessage('');

    const newSlot = {
      trainerEmail: user?.email,
      trainerName: user?.displayName,
      className: selectedClass,
      slotName,
      slotTime,
      days: selectedDays,
      isBooked: false
    };

    axios.post('https://ironpulse-server-silk.vercel.app/slots', newSlot)
      .then(() => {
        setLoading(false);
        setMessage('New Slot added successfully! 🎉');
        setSlotName('');
        setSlotTime('');
        setSelectedDays([]);
      })
      .catch(() => {
        setLoading(false);
        setMessage('Failed to add slot. Please try again.');
      });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Add New <span className="text-emerald-400">Slot</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Create time slots for your training sessions.</p>
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
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            >
              {classes.map(cls => (
                <option key={cls._id} value={cls.className}>{cls.className}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Slot Title / Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Morning Power Workout"
              value={slotName}
              onChange={(e) => setSlotName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Slot Time Range
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 10:00 AM - 11:30 AM"
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-medium text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Select Days
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {daysList.map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => handleDayChange(day)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                    selectedDays.includes(day)
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-4 rounded-xl uppercase tracking-wider text-sm transition transform active:scale-95 shadow-lg"
          >
            {loading ? 'Adding Slot...' : 'Create Slot'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewSlot;
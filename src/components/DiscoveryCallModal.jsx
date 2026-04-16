import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const DiscoveryCallModal = ({ isOpen, onClose, darkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', time: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/booking', formData);
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', date: '', time: '' });
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputClass = `w-full h-12 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-700 focus:border-blue-500 text-white' : 'bg-slate-50 border-slate-200 focus:border-blue-500 text-slate-900'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md p-8 rounded-[2rem] premium-shadow ${darkMode ? 'bg-slate-950 border border-slate-800' : 'bg-white border border-slate-100'}`}
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <h2 className="text-2xl font-bold mb-2">Book a Discovery Call</h2>
            <p className="text-sm text-slate-500 mb-6">Schedule a 30-minute free consultation with our team.</p>

            {status === 'success' ? (
              <div className="py-8 text-center text-green-500 font-semibold flex flex-col items-center gap-3">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Booking Confirmed! We'll send a GMeet link soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase tracking-wider">Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase tracking-wider">Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase tracking-wider">Date</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase tracking-wider">Time</label>
                    <input required type="time" name="time" value={formData.time} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    disabled={status === 'loading'}
                    className={`w-full h-12 rounded-xl font-bold tracking-wide transition-all ${status === 'loading' ? 'opacity-70' : 'hover:scale-[1.02]'} ${darkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}
                  >
                    {status === 'loading' ? 'Booking...' : status === 'error' ? 'Error. Try Again.' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiscoveryCallModal;

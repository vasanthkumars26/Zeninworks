import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', projectType: '', budget: '', deadline: '', requirements: ''
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // In production use proper ENV URL. 
      // Assuming a default vite proxy or full path.
      const submitData = {
        ...formData,
        mobile: `${countryCode} ${formData.mobile}`
      };
      await axios.post('https://zeninworks-be.onrender.com/api/inquiry', submitData);
      setStatus('success');
      setFormData({ name: '', email: '', mobile: '', projectType: '', budget: '', deadline: '', requirements: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const inputClass = `w-full h-14 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-800 focus:border-slate-600 focus:ring-slate-800 text-white' : 'bg-slate-50 border-slate-200 focus:border-slate-400 focus:ring-slate-100 text-slate-900'}`;

  return (
    <section id="contact" className={`py-24 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's build something exceptional.</h2>
            <p className="text-xl text-slate-500 mb-10">We are currently accepting new projects for Q3.</p>
            <div className={`p-8 rounded-[2rem] premium-shadow ${darkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
              <h3 className="text-lg font-semibold mb-2">Direct Contact</h3>
              <p className="text-slate-500">hello@zeninworks.com</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className={inputClass} />
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)} 
                    className={`w-[110px] h-14 rounded-xl px-2 border focus:ring-2 outline-none transition-all cursor-pointer font-medium ${darkMode ? 'bg-slate-900 border-slate-800 focus:border-slate-600 focus:ring-slate-800 text-white' : 'bg-slate-50 border-slate-200 focus:border-slate-400 focus:ring-slate-100 text-slate-900'}`}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className={`${inputClass} flex-1`} />
                </div>
                <input required type="text" name="projectType" value={formData.projectType} onChange={handleChange} placeholder="Project Type" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget Range" className={inputClass} />
                <input type="text" name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Deadline" className={inputClass} />
              </div>
              <textarea required name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Detailed Requirements" rows={5} className={`${inputClass} h-auto py-4 resize-none`}></textarea>
              
              <button 
                disabled={status === 'loading'}
                className={`h-14 mt-2 rounded-xl font-bold tracking-wide transition-all ${status === 'loading' ? 'opacity-70' : 'hover:scale-[1.02]'} ${darkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Send Inquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

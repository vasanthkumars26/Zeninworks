import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ darkMode }) => {
  return (
    <section className={`py-24 overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-16 tracking-tight">Client Voices</h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto rounded-[2.5rem] p-12 md:p-16 premium-shadow relative ${darkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}
        >
          <div className="absolute top-8 left-8 text-slate-200 dark:text-slate-700 opacity-50">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8c-3.3 0-6 2.7-6 6v4h6v6H4v-6c0-4.4 3.6-8 8-8v2zm12 0c-3.3 0-6 2.7-6 6v4h6v6h-6v-6c0-4.4 3.6-8 8-8v2z"/></svg>
          </div>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 relative z-10 text-slate-800 dark:text-slate-200">
            "Zeninworks delivered our MERN platform with exceptional speed, communication, and production quality. Their engineering capabilities are top-tier."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            <div className="text-left">
              <div className="font-bold">Startup Founder</div>
              <div className="text-sm text-slate-500">Tech Industry</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

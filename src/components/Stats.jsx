import React from 'react';
import { motion } from 'framer-motion';

const Stats = ({ darkMode }) => {
  const stats = [
    { value: "10+", label: "Global Clients", isLive: true },
    { value: "10+", label: "Projects Delivered", isLive: false },
    { value: "99%", label: "Client Satisfaction", isLive: false },
  ];

  return (
    <section className={`py-12 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`rounded-[2rem] p-10 text-center premium-shadow transition-transform relative overflow-hidden ${darkMode ? 'bg-slate-800/50' : 'bg-slate-50 border border-slate-100'}`}
            >
              {stat.isLive && (
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Live</span>
                </div>
              )}
              <div className="text-5xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white flex items-center justify-center gap-1">
                {stat.value}
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

import React from 'react';
import { motion } from 'framer-motion';

const Stats = ({ darkMode }) => {
  const stats = [
    { value: "10+", label: "Projects Delivered" },
    { value: "5+", label: "Happy Clients" },
    { value: "99%", label: "Delivery Satisfaction" },
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
              className={`rounded-[2rem] p-10 text-center premium-shadow transition-transform ${darkMode ? 'bg-slate-800/50' : 'bg-slate-50 border border-slate-100'}`}
            >
              <div className="text-5xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white">{stat.value}</div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

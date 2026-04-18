import React from 'react';
import { motion } from 'framer-motion';

const Founders = ({ darkMode }) => {
  const founders = [
    {
      name: "Vasantha Kumar S",
      role: "Founder • Full Stack MERN Developer",
      bio: "Specializes in React frontends, Node APIs, MongoDB architecture, e-commerce systems, and premium UI experiences.",
      img: "https://ui-avatars.com/api/?name=Vasantha+Kumar&background=0D8ABC&color=fff&size=256"
    },
    {
      name: "Srivatsan A",
      role: "Founder • Full Stack MERN Developer",
      bio: "Focused on backend engineering, REST integrations, authentication systems, dashboards, and workflow automation.",
      img: "https://ui-avatars.com/api/?name=Srivatsan+A&background=28B463&color=fff&size=256"
    }
  ];

  return (
    <section id="founders" className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Architected by Elite Engineers</h2>
          <p className="text-lg text-slate-500">Bridging the gap between complex engineering and seamless design.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pl-4 pr-4">
          {founders.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className={`rounded-[2rem] p-8 sm:p-10 premium-border premium-shadow transition-all ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <img src={f.img} alt={f.name} className="w-24 h-24 rounded-full shadow-md object-cover" />
                <div>
                  <h3 className="text-2xl font-bold mb-1">{f.name}</h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">{f.role}</p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{f.bio}</p>
                  
                  <div className="flex gap-4 justify-center sm:justify-start">
                    {/* Social icons removed for a cleaner, professional look */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Our Vision --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-24 p-10 sm:p-16 rounded-[2.5rem] premium-shadow premium-border relative overflow-hidden flex flex-col md:flex-row items-center gap-12 transition-all hover:shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
        >
          {/* Subtle background accent */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl mb-6 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Our Vision.</h3>
            <div className="w-12 h-1.5 bg-blue-500 rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-8 md:pt-0 pl-0 md:pl-12">
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium relative z-10">
              "We believe that world-class software shouldn't be restricted to massive enterprises. Our vision is to empower startups, founders, and growing businesses by providing them with the exact same level of engineering excellence, premium visual aesthetics, and scalable backend architecture that industry titans leverage to succeed."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Founders;

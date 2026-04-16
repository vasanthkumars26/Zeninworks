import React from 'react';
import { motion } from 'framer-motion';

const Process = ({ darkMode }) => {
  const steps = [
    { num: "01", title: "Discovery", desc: "Aligning requirements and infrastructure architecture." },
    { num: "02", title: "UI/UX Wireframe", desc: "Designing premium Apple-grade interfaces." },
    { num: "03", title: "MERN Sprint", desc: "Full-stack development." },
    { num: "04", title: "Launch & Support", desc: "Deployment and ongoing scaling." }
  ];

  return (
    <section className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Delivery Process.</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className={`text-6xl font-black mb-4 ${darkMode ? 'text-slate-800' : 'text-slate-200'}`}>
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-slate-500">{step.desc}</p>
              
              {i < 3 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

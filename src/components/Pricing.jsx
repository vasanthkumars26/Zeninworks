import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DiscoveryCallModal from './DiscoveryCallModal';

const Pricing = ({ darkMode }) => {
  const [showBooking, setShowBooking] = useState(false);

  const tiers = [
    { 
      name: "Startup MVP", 
      price: "Custom", 
      desc: "For early stage founders needing a robust MERN foundation.",
      features: [
        "Core MERN Architecture",
        "Essential Authentication",
        "Responsive UI Components",
        "Basic DB Setup",
        "1-Month Launch Strategy"
      ]
    },
    { 
      name: "Business Platform", 
      price: "Custom", 
      desc: "Full-scale web application for growing companies.",
      features: [
        "Complex State Management",
        "Advanced Analytics & Dashboards",
        "Third-party API Integrations",
        "Performance Optimization",
        "Dedicated QA & Testing"
      ]
    },
    { 
      name: "Tech Partner", 
      price: "Retainer", 
      desc: "Ongoing engineering and product maintenance.",
      features: [
        "Continuous Delivery & Hotfixes",
        "Infrastructure Scaling",
        "Architecture Refactoring",
        "Security Audits",
        "24/7 Priority Support"
      ]
    }
  ];



  return (
    <section id="pricing" className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Transparent Engagements.</h2>
          <p className="text-lg text-slate-500">Premium engineering models tailored to your scale.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className={`rounded-[2rem] p-10 flex flex-col premium-shadow premium-border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-slate-500 mb-8 h-12">{tier.desc}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-extrabold">{tier.price}</span>
              </div>
              
              <ul className="mb-10 space-y-4 flex-1">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button onClick={() => setShowBooking(true)} className={`w-full py-4 rounded-full font-semibold text-center transition-transform hover:scale-105 ${darkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                Book Discovery Call
              </button>
            </motion.div>
          ))}
        </div>

        <DiscoveryCallModal isOpen={showBooking} onClose={() => setShowBooking(false)} darkMode={darkMode} />
      </div>
    </section>
  );
};

export default Pricing;

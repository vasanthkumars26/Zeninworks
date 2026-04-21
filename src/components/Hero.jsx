import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DiscoveryCallModal from './DiscoveryCallModal';

const Hero = ({ darkMode }) => {
  const services = [
    "Custom MERN SaaS Platforms",
    "E-commerce Platforms",
    "Salon Booking Systems",
    "Admin Dashboards",
    "REST APIs + Auth",
    "Long-term Maintenance"
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <section id="services" className={`relative pt-16 pb-8 md:pt-32 md:pb-20 overflow-hidden ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="absolute inset-0 bg-particles opacity-30"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-4xl m-5 ml-0 md:m-0  lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-6">
              We craft scalable <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-900 dark:from-slate-200 dark:to-slate-500">MERN products</span> <br/>
              for startups.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
              We design and develop premium full-stack web products using React, Node.js, Express, MongoDB, and scalable backend architecture.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:scale-105 transition-transform shadow-xl shadow-slate-900/10">
                Book Discovery Call
              </button>
              <a href="#contact" className="px-8 py-4 rounded-full bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all premium-shadow">
                Get Proposal
              </a>
            </div>
          </motion.div>
          
          {/* Professional 3D Tilted Upward Circular Spinning Animation (Desktop/Tablet) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center w-full overflow-visible"
          >
            <div 
              className="relative w-[440px] h-[440px] mx-auto flex items-center justify-center group" 
              style={{ perspective: '1200px' }}
            >
             <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
             
               {/* 3D Tilted Orbit Plane */}
               <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}>
                 
                 {/* Orbiting dashed ring */}
                 <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-slate-300 dark:border-slate-700 animate-orbit" style={{ transformStyle: 'preserve-3d' }}>
                   
                   {services.map((service, i) => {
                      const angle = (i / services.length) * 2 * Math.PI;
                      const xPercent = Math.cos(angle) * 50; 
                      const yPercent = Math.sin(angle) * 50;
                      
                      return (
                         <div 
                           key={i} 
                           className="absolute flex items-center justify-center"
                           style={{ 
                             left: `calc(50% + ${xPercent}%)`, 
                             top: `calc(50% + ${yPercent}%)`,
                             transform: 'translate(-50%, -50%)',
                             transformStyle: 'preserve-3d'
                           }}
                         >
                            {/* Counter-orbit to prevent them from spinning upside down */}
                            <div className="animate-counter-orbit flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                              
                               {/* Item tilts back exactly negative the plane rotation to stand strictly vertical relative to camera */}
                               <div 
                                 className={`px-4 py-3 rounded-xl shadow-xl text-center text-sm font-semibold premium-border cursor-pointer transition-colors w-40 hover:bg-slate-50 dark:hover:bg-slate-800 ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'}`}
                                 style={{ transform: 'rotateX(-60deg)' }}
                               >
                                 {service}
                               </div>

                            </div>
                         </div>
                      );
                   })}
                 </div>
               </div>

               {/* Central Floating core element - Sits correctly in Z space above the background ring items */}
               <div 
                 className="absolute inset-0 m-auto w-36 h-36 rounded-full premium-shadow flex items-center justify-center transition-colors bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                 style={{ transform: 'translateZ(10px)' }}
               >
                 <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Zeninworks</span>
               </div>
               
             </div>
            </div>
          </motion.div>

          {/* Mobile Zoom-In One-By-One List */}
          <div className="lg:hidden w-full flex flex-col gap-3 sm:gap-4 mt-8 pb-4">
             {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 100 }}
                  className={`w-full px-5 py-4 sm:px-6 sm:py-5 rounded-2xl flex items-center justify-between premium-shadow premium-border transition-all hover:scale-[1.02] cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 tracking-tight">{service}</span>
                  <div className={`p-1.5 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
    <DiscoveryCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} darkMode={darkMode} />
    </>
  );
};

export default Hero;

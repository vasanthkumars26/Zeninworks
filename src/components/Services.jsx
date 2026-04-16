import React from 'react';
import { motion } from 'framer-motion';
import { Code, ShoppingCart, Scissors, LayoutDashboard, Database, Wrench } from 'lucide-react';

const Services = ({ darkMode }) => {
  const services = [
    {
      title: "Custom MERN SaaS Platforms",
      desc: "Scalable and secure multi-tenant architectures tailored to your business logic.",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "E-commerce Platforms",
      desc: "High-conversion shopping experiences with cart, checkout, and payment integration.",
      icon: <ShoppingCart className="w-6 h-6" />
    },
    {
      title: "Booking Systems",
      desc: "Robust appointment scheduling and management systems for salons & services.",
      icon: <Scissors className="w-6 h-6" />
    },
    {
      title: "Admin Dashboards",
      desc: "Powerful data visualization and management tools to control your operations.",
      icon: <LayoutDashboard className="w-6 h-6" />
    },
    {
      title: "REST APIs & Auth",
      desc: "Secure stateless API architectures with JWT authentication and Role-Based Access.",
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Long-term Maintenance",
      desc: "Ongoing support, scaling, and feature additions as your product grows.",
      icon: <Wrench className="w-6 h-6" />
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className={`py-24 ${darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Engineering Elite Products.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            We don't just write code; we build architectures designed to scale from day one.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-8 rounded-3xl border transition-all duration-300 ${darkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${darkMode ? 'bg-slate-900 text-amber-500' : 'bg-slate-50 text-slate-900'}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

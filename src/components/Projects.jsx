import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Projects = ({ darkMode }) => {
  const defaultProjects = [
    {
      title: "Construction Management Platform",
      desc: "A full-stack construction service platform with booking, admin dashboard, and real-time updates.",
      tech: ["React", "Node", "MongoDB", "Socket.IO"],
      link: "https://construction-fe-delta.vercel.app",
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Salon Booking Website",
      desc: "Online salon appointment system with authentication, booking management, and admin panel.",
      tech: ["React", "Node", "MongoDB", "Firebase"],
      link: "https://salon-web-client.vercel.app",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "BuyNext E-Commerce",
      desc: "Full-stack shopping platform with authentication, cart, and payment integration.",
      tech: ["MERN", "REST API"],
      link: "https://buynext-hwn9.vercel.app/",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/project');
        if (res.data && res.data.length > 0) {
          setProjects([...res.data, ...defaultProjects]);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className={`py-24 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Live Projects.</h2>
          <p className="text-lg text-slate-500">Real production applications we have built.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -12, scale: 1.01 }}
              className={`block flex flex-col group rounded-[2rem] premium-border premium-shadow transition-all relative overflow-hidden ${darkMode ? 'bg-slate-900 hover:border-slate-700' : 'bg-white hover:border-slate-300'}`}
            >
              {project.image && (
                <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image.startsWith('/uploads') ? 'http://localhost:5000' + project.image : project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}
              
              <div className="relative p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'} shadow-sm`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  <div className="text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900 dark:text-white">{project.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tag, idx) => (
                    <span key={idx} className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider ${darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

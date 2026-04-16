import React from 'react';
import Logo from './Logo';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`border-t py-12 ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          <div className="flex items-center scale-90 md:scale-100 origin-left">
            <Logo />
          </div>
          <span className="text-sm border-l border-slate-300 dark:border-slate-700 pl-3">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

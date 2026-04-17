import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);
  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Work' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'founders', label: 'Team' }
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex relative z-50">
            <Link to="/" className="flex flex-row items-center font-bold tracking-tight text-slate-900 dark:text-white drop-shadow-sm cursor-pointer hover:opacity-80 transition-opacity z-50">
              <Logo />
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                href={`/#${link.id}`}
                className="text-sm font-semibold tracking-wide text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors capitalize"
              >
                {link.label}
              </motion.a>
            ))}

          </nav>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 sm:p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform"
            >
              Start Your Project
            </a>
            <button
              className="lg:hidden p-2 ml-1 rounded-lg text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Minimal Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="lg:hidden absolute top-full right-4 sm:right-6 mt-2 w-56 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
            >
              <nav className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`/#${link.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-3 text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-4"></div>

                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mx-4 mt-2 mb-2 py-2.5 text-center rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
                >
                  Start Your Project
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;

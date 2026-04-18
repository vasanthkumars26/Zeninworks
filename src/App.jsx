import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Founders from './components/Founders';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AntigravityTheme from './components/AntigravityTheme';

function MainContent({ darkMode }) {
  return (
    <main className="relative">
      <Hero darkMode={darkMode} />
      <Stats darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Pricing darkMode={darkMode} />
      <Testimonials darkMode={darkMode} />
      <Process darkMode={darkMode} />
      <Founders darkMode={darkMode} />
      <FAQ darkMode={darkMode} />
      <Contact darkMode={darkMode} />
    </main>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);



  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 ease-in-out font-sans relative">
        <AntigravityTheme darkMode={darkMode} />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="relative z-10 w-full">
          <Routes>
            <Route path="/" element={<MainContent darkMode={darkMode} />} />
            <Route path="/zeninadminworks" element={<AdminDashboard darkMode={darkMode} />} />
          </Routes>
          <Footer darkMode={darkMode} /> 
        </div>
      </div>
    </Router>
  );
}

export default App;

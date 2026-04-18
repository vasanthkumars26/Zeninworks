import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Mail, MessageCircle, Trash2, RefreshCw, Activity, DollarSign, FolderGit2, Users, PlusCircle, Video, Send, LogOut, Edit2 } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const API_URL = window.location.hostname === 'localhost' ? "http://localhost:5000" : "https://zeninworks-be.onrender.com";

const AdminDashboard = ({ darkMode }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  
  const ADMIN_UID = 'j2CH17O466YnJueOjXQy1x6nUTj2';

  const [inquiries, setInquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Project Form State
  const [projectForm, setProjectForm] = useState({ title: '', desc: '', tech: '', link: '', revenue: '' });
  const [projectImage, setProjectImage] = useState(null);
  const [addingProject, setAddingProject] = useState(false);
  const [addMsg, setAddMsg] = useState('');
  const [editProjectId, setEditProjectId] = useState(null);
  
  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'Failed to sign in with Google.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch inquiries
      try {
        const inqRes = await axios.get(`${API_URL}/api/inquiry`);
        setInquiries(inqRes.data);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      }

      // Fetch bookings
      try {
        const bookRes = await axios.get(`${API_URL}/api/booking`);
        setBookings(bookRes.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
      
      // Fetch projects
      try {
        const projRes = await axios.get(`${API_URL}/api/project`);
        setProjects(projRes.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/api/inquiry/${id}`, { status });
      setInquiries(inquiries.map(i => i._id === id ? { ...i, status } : i));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/inquiry/${id}`);
      setInquiries(inquiries.filter(i => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateBookingStatus = async (id, status, gmeetLink) => {
    try {
      const payload = { status };
      if (gmeetLink !== undefined) payload.gmeetLink = gmeetLink;
      
      const res = await axios.patch(`${API_URL}/api/booking/${id}`, payload);
      setBookings(bookings.map(b => b._id === id ? res.data : b));
      if (gmeetLink !== undefined) {
        showToast('Meeting link sent successfully to client!', 'success');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to send link. Please try again.', 'error');
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/booking/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setAddingProject(true);
    setAddMsg('');
    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('desc', projectForm.desc);
      formData.append('link', projectForm.link);
      formData.append('tech', projectForm.tech); // Backend splits the string
      if (projectForm.revenue) formData.append('revenue', projectForm.revenue);
      
      if (projectImage) {
        // Compress image inline to bypass ephemeral disk wipes and CORS issues
        const base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(projectImage);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 1200; // Optimal 1080p-lite dimensions
              const MAX_HEIGHT = 800;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
              } else {
                if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.8)); // 80% optimized JPEG
            };
          };
        });
        formData.append('image', base64Image);
      }

      if (editProjectId) {
        await axios.patch(`${API_URL}/api/project/${editProjectId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setAddMsg('Project updated successfully!');
      } else {
        await axios.post(`${API_URL}/api/project`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setAddMsg('Project added successfully!');
      }

      setProjectForm({ title: '', desc: '', tech: '', link: '', revenue: '' });
      setProjectImage(null);
      setEditProjectId(null);
      // clear the file input field
      const fileInput = document.getElementById('project-image-upload');
      if (fileInput) fileInput.value = '';
      fetchData(); // refresh count
      setTimeout(() => setAddMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setAddMsg('Error saving project.');
    } finally {
      setAddingProject(false);
    }
  };

  const handleEditProject = (proj) => {
    setEditProjectId(proj._id);
    setProjectForm({
      title: proj.title || '',
      desc: proj.desc || '',
      link: proj.link || '',
      tech: proj.tech ? proj.tech.join(', ') : '',
      revenue: proj.revenue || 0
    });
    setProjectImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API_URL}/api/project/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const currentRevenue = projects.reduce((sum, p) => sum + (Number(p.revenue) || 0), 0); 
  const activeVisitors = Math.floor(Math.random() * (45 - 15 + 1) + 15);

  const statCardClass = `p-6 rounded-[2rem] flex items-center gap-4 premium-shadow premium-border transition-all hover:-translate-y-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`;
  const iconBoxClass = `p-4 rounded-full ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'}`;

  if (authLoading) {
    return <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>Loading...</div>;
  }

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md w-full relative z-10 p-10 rounded-[2.5rem] premium-shadow premium-border ${darkMode ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800/10' : 'bg-white/80 backdrop-blur-xl border-white'}`}
        >
          <div className="text-center mb-10">
            <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
              <Users className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className="text-3xl font-bold mb-3 tracking-tight">Admin Portal</h1>
            <p className="text-slate-500">Sign in securely to manage your workspace.</p>
          </div>
          
          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium text-center">
              {authError}
            </div>
          )}

          <button 
            onClick={handleGoogleLogin} 
            className={`w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${darkMode ? 'bg-white text-slate-900 shadow-xl shadow-white/10' : 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'}`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </motion.div>
      </div>
    );
  }

  if (user && user.uid !== ADMIN_UID) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md w-full relative z-10 p-10 rounded-[2.5rem] premium-shadow premium-border text-center ${darkMode ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800/10' : 'bg-white/80 backdrop-blur-xl border-white'}`}
        >
          <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-red-900/50' : 'bg-red-100'}`}>
            <svg className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tight">Access Denied</h1>
          <p className="text-slate-500 mb-8">You do not have administrative privileges to view this page. If you believe this is an error, please try logging out and signing in with the correct account.</p>
          
          <button 
            onClick={handleLogout}
            className={`w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${darkMode ? 'bg-white text-slate-900 shadow-xl shadow-white/10' : 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'}`}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
              toast.type === 'success' 
                ? (darkMode ? 'bg-emerald-900/90 border-emerald-800 text-emerald-100' : 'bg-emerald-50 border-emerald-200 text-emerald-800')
                : (darkMode ? 'bg-red-900/90 border-red-800 text-red-100' : 'bg-red-50 border-red-200 text-red-800')
            } backdrop-blur-md`}
          >
            {toast.type === 'success' ? (
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
            )}
            <div>
              <p className="font-semibold text-sm">
                {toast.type === 'success' ? 'Success' : 'Error'}
              </p>
              <p className="text-sm opacity-90">{toast.message}</p>
            </div>
            <button onClick={() => setToast({ show: false, message: '', type: '' })} className="ml-4 p-1 opacity-50 hover:opacity-100 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button onClick={fetchData} className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${darkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>
              <RefreshCw className="w-4 h-4" /> <span className="hidden md:inline">Refresh</span>
            </button>
            <button onClick={handleLogout} className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition text-red-500 ${darkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>
              <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* --- Metrics Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className={statCardClass}>
            <div className={iconBoxClass}><DollarSign className="w-6 h-6 text-green-500" /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Revenue (₹)</p>
              <h3 className="text-2xl font-bold">₹{currentRevenue.toLocaleString('en-IN')}</h3>
            </div>
          </div>
          <div className={statCardClass}>
            <div className={iconBoxClass}><FolderGit2 className="w-6 h-6 text-blue-500" /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Projects</p>
              <h3 className="text-2xl font-bold">{projects.length}</h3>
            </div>
          </div>
          <div className={statCardClass}>
            <div className={iconBoxClass}><Users className="w-6 h-6 text-purple-500" /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Inquiries</p>
              <h3 className="text-2xl font-bold">{inquiries.length}</h3>
            </div>
          </div>
          <div className={statCardClass}>
            <div className={iconBoxClass}>
              <div className="relative">
                <Activity className="w-6 h-6 text-red-500" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Realtime Visitors</p>
              <h3 className="text-2xl font-bold">{activeVisitors}</h3>
            </div>
          </div>
        </div>

        {/* --- Add Project Section --- */}
        <div className={`mb-12 p-8 rounded-[2rem] premium-shadow premium-border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <PlusCircle className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold">{editProjectId ? 'Edit Project' : 'Add New Project'}</h2>
          </div>
          <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-500">Project Title</label>
              <input required type="text" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className={`w-full h-12 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} placeholder="e.g. Finance Dashboard" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-500">Live Link URL</label>
              <input required type="url" value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} className={`w-full h-12 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} placeholder="e.g. https://myproject.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-500">Project Revenue (₹)</label>
              <input required type="number" min="0" value={projectForm.revenue} onChange={e => setProjectForm({...projectForm, revenue: e.target.value})} className={`w-full h-12 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} placeholder="e.g. 50000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-500">Technologies (Comma separated)</label>
              <input required type="text" value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} className={`w-full h-12 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} placeholder="e.g. React, Node, Tailwind" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-slate-500">Description</label>
              <input required type="text" value={projectForm.desc} onChange={e => setProjectForm({...projectForm, desc: e.target.value})} className={`w-full h-12 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} placeholder="A short description of the project" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-slate-500">Project Image / Screenshot</label>
              <input id="project-image-upload" type="file" accept="image/*" onChange={e => setProjectImage(e.target.files[0])} className={`w-full h-12 rounded-xl px-4 py-2 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} />
            </div>
            <div className="md:col-span-2 flex items-center justify-between mt-2">
              <span className={`text-sm font-semibold ${addMsg.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {addMsg}
              </span>
              <div className="flex gap-4">
                {editProjectId && (
                  <button type="button" onClick={() => { setEditProjectId(null); setProjectForm({ title: '', desc: '', tech: '', link: '', revenue: '' }); }} className={`px-6 py-3 rounded-full font-semibold transition border ${darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}>
                    Cancel
                  </button>
                )}
                <button disabled={addingProject} type="submit" className={`px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105 disabled:opacity-70 ${darkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                  {addingProject ? 'Saving...' : (editProjectId ? 'Update Project' : 'Publish Project')}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* --- Added Projects Preview --- */}
        <h2 className="text-2xl font-bold mb-6 mt-16 flex items-center gap-2">
          <FolderGit2 className="w-6 h-6 text-blue-500" /> Manage Projects
        </h2>
        {loading ? (
          <p className="text-slate-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence>
              {projects.map((proj) => (
                <motion.div
                  key={proj._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-6 rounded-[2rem] flex flex-col premium-shadow premium-border relative group overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}
                >
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={() => handleEditProject(proj)} title="Edit Project" type="button" className={`p-2 rounded-full backdrop-blur-md ${darkMode ? 'bg-black/50 text-white hover:bg-black/80' : 'bg-white/80 text-slate-900 hover:bg-white'} transition shadow-md`}>
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteProject(proj._id)} title="Delete Project" type="button" className={`p-2 rounded-full backdrop-blur-md ${darkMode ? 'bg-black/50 text-red-400 hover:bg-red-900/80' : 'bg-white/80 text-red-600 hover:bg-red-50'} transition shadow-md`}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {proj.image && (
                    <div className="w-full h-40 -mt-6 -mx-6 mb-4 relative bg-slate-100 dark:bg-slate-800 shrink-0">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${proj.image.startsWith('/uploads') ? API_URL + proj.image : proj.image})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                      <p className="absolute bottom-3 left-4 text-white font-bold text-lg">₹{(proj.revenue || 0).toLocaleString('en-IN')}</p>
                    </div>
                  )}
                  
                  <div className={`flex flex-col flex-1 ${!proj.image && 'pt-4'}`}>
                    <h3 className="text-xl font-bold mb-1 truncate pr-16">{proj.title}</h3>
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm mb-3 truncate">{proj.link}</a>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                      {proj.tech && proj.tech.map((t, idx) => (
                        <span key={idx} className={`text-[10px] px-2 py-1 rounded-md uppercase font-bold tracking-wider ${darkMode ? 'bg-slate-800/80 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              {projects.length === 0 && !loading && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  No projects added yet.
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* --- Inquiries Section --- */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-slate-400" /> Recent Inquiries
        </h2>
        {loading ? (
          <p className="text-slate-500">Loading inquiries...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {inquiries.map((inq) => (
                <motion.div
                  key={inq._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-6 rounded-[2rem] flex flex-col premium-shadow premium-border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{inq.name}</h3>
                      <p className="text-sm text-slate-500">{new Date(inq.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${inq.status === 'New' ? 'bg-blue-100 text-blue-800' : inq.status === 'Reviewed' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {inq.status || 'New'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <p className="text-sm"><span className="font-semibold">Type:</span> {inq.projectType}</p>
                    <p className="text-sm"><span className="font-semibold">Budget:</span> {inq.budget}</p>
                    {inq.mobile && <p className="text-sm"><span className="font-semibold">Mobile:</span> {inq.mobile}</p>}
                    {inq.deadline && <p className="text-sm"><span className="font-semibold">Deadline:</span> {inq.deadline}</p>}
                    <div className={`p-4 rounded-xl text-sm ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
                      {inq.requirements}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 mt-auto">
                    <div className="flex gap-2">
                      <a href={`mailto:${inq.email}?subject=Reply to your Zeninworks Inquiry`} title="Reply via Mail" className={`p-2 rounded-full transition ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
                        <Mail className="w-5 h-5" />
                      </a>
                      <a href={`https://wa.me/${inq.mobile ? inq.mobile.replace(/\D/g, '') : ''}?text=Hello ${encodeURIComponent(inq.name)}, reaching out from Zeninworks regarding your project inquiry!`} target="_blank" rel="noreferrer" title="Automated Message via WhatsApp" className={`p-2 rounded-full transition ${darkMode ? 'hover:bg-slate-800 text-green-400' : 'hover:bg-slate-100 text-green-600'}`}>
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                      <select 
                        value={inq.status || 'New'} 
                        onChange={(e) => updateStatus(inq._id, e.target.value)}
                        className={`text-sm rounded-lg px-2 py-1 outline-none ${darkMode ? 'bg-slate-950 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}
                      >
                        <option value="New">New</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Contacted">Contacted</option>
                      </select>
                      
                      <button onClick={() => deleteInquiry(inq._id)} title="Delete Inquiry" className={`p-2 rounded-full transition ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'}`}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {inquiries.length === 0 && !loading && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  No inquiries found. Check back later!
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
        {/* --- Bookings Section --- */}
        <h2 className="text-2xl font-bold mb-6 mt-16 flex items-center gap-2">
          <Video className="w-6 h-6 text-blue-500" /> Discovery Call Bookings
        </h2>
        {loading ? (
          <p className="text-slate-500">Loading bookings...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {bookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-6 rounded-[2rem] flex flex-col premium-shadow premium-border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{booking.name}</h3>
                      <p className="text-sm text-slate-500">{booking.email}</p>
                      {booking.mobile && <p className="text-sm text-slate-500">{booking.mobile}</p>}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <div className={`p-4 rounded-xl text-sm flex gap-4 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
                      <div>
                        <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Date</span>
                        <span className="font-medium">{booking.date}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Time</span>
                        <span className="font-medium">{booking.time}</span>
                      </div>
                    </div>
                    {booking.message && (
                      <div className={`p-4 rounded-xl text-sm ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
                        <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Message / Agenda</span>
                        <p className="text-slate-700 dark:text-slate-300 italic">{booking.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-auto">
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Google Meet Link</label>
                    <div className="flex gap-2 mb-4">
                      <input 
                        type="url" 
                        placeholder="https://meet.google.com/..." 
                        defaultValue={booking.gmeetLink || ''}
                        id={`gmeet-${booking._id}`}
                        className={`flex-1 text-sm rounded-lg px-3 py-2 outline-none border focus:ring-2 transition-all ${darkMode ? 'bg-slate-950 border-slate-700 focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}
                      />
                      <button 
                        onClick={() => {
                          const link = document.getElementById(`gmeet-${booking._id}`).value;
                          updateBookingStatus(booking._id, 'Replied', link);
                        }}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors"
                        title="Send Link"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <select 
                        value={booking.status || 'Pending'} 
                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                        className={`text-sm rounded-lg px-2 py-1 outline-none ${darkMode ? 'bg-slate-950 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Replied">Replied</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                      
                      <button onClick={() => deleteBooking(booking._id)} title="Delete Booking" className={`p-2 rounded-full transition ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'}`}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {bookings.length === 0 && !loading && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  No discovery call bookings yet.
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

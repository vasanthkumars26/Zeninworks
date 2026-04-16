import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Mail, MessageCircle, Trash2, RefreshCw, Activity, DollarSign, FolderGit2, Users, PlusCircle, Video, Send } from 'lucide-react';

const AdminDashboard = ({ darkMode }) => {
  const [inquiries, setInquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // New Project Form State
  const [projectForm, setProjectForm] = useState({ title: '', desc: '', tech: '', link: '' });
  const [projectImage, setProjectImage] = useState(null);
  const [addingProject, setAddingProject] = useState(false);
  const [addMsg, setAddMsg] = useState('');

  const fetchData = async () => {
    try {
      // Fetch inquiries
      try {
        const inqRes = await axios.get('https://zeninworks-be.onrender.com/api/inquiry');
        setInquiries(inqRes.data);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      }

      // Fetch bookings
      try {
        const bookRes = await axios.get('https://zeninworks-be.onrender.com/api/booking');
        setBookings(bookRes.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
      
      // Fetch projects
      try {
        const projRes = await axios.get('https://zeninworks-be.onrender.com/api/project');
        setProjectsCount(projRes.data.length);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`https://zeninworks-be.onrender.com/api/inquiry/${id}`, { status });
      setInquiries(inquiries.map(i => i._id === id ? { ...i, status } : i));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await axios.delete(`https://zeninworks-be.onrender.com/api/inquiry/${id}`);
      setInquiries(inquiries.filter(i => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateBookingStatus = async (id, status, gmeetLink) => {
    try {
      const payload = { status };
      if (gmeetLink !== undefined) payload.gmeetLink = gmeetLink;
      
      const res = await axios.patch(`https://zeninworks-be.onrender.com/api/booking/${id}`, payload);
      setBookings(bookings.map(b => b._id === id ? res.data : b));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`https://zeninworks-be.onrender.com/api/booking/${id}`);
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
      if (projectImage) {
        formData.append('image', projectImage);
      }

      await axios.post('https://zeninworks-be.onrender.com/api/project', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAddMsg('Project added successfully!');
      setProjectForm({ title: '', desc: '', tech: '', link: '' });
      setProjectImage(null);
      // clear the file input field
      const fileInput = document.getElementById('project-image-upload');
      if (fileInput) fileInput.value = '';
      fetchData(); // refresh count
      setTimeout(() => setAddMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setAddMsg('Error adding project.');
    } finally {
      setAddingProject(false);
    }
  };

  const currentRevenue = 125000; 
  const activeVisitors = Math.floor(Math.random() * (45 - 15 + 1) + 15);

  const statCardClass = `p-6 rounded-[2rem] flex items-center gap-4 premium-shadow premium-border transition-all hover:-translate-y-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`;
  const iconBoxClass = `p-4 rounded-full ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'}`;

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <button onClick={fetchData} className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${darkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* --- Metrics Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className={statCardClass}>
            <div className={iconBoxClass}><DollarSign className="w-6 h-6 text-green-500" /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold">${currentRevenue.toLocaleString()}</h3>
            </div>
          </div>
          <div className={statCardClass}>
            <div className={iconBoxClass}><FolderGit2 className="w-6 h-6 text-blue-500" /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Projects</p>
              <h3 className="text-2xl font-bold">{projectsCount}</h3>
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
            <h2 className="text-2xl font-bold">Add New Project</h2>
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-slate-500">Description</label>
              <input required type="text" value={projectForm.desc} onChange={e => setProjectForm({...projectForm, desc: e.target.value})} className={`w-full h-12 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} placeholder="A short description of the project" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-slate-500">Technologies (Comma separated)</label>
              <input required type="text" value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} className={`w-full h-12 rounded-xl px-4 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} placeholder="e.g. React, Node, Tailwind" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-slate-500">Project Image / Screenshot</label>
              <input id="project-image-upload" type="file" accept="image/*" onChange={e => setProjectImage(e.target.files[0])} className={`w-full h-12 rounded-xl px-4 py-2 border focus:ring-2 outline-none transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-400'}`} />
            </div>
            <div className="md:col-span-2 flex items-center justify-between mt-2">
              <span className={`text-sm font-semibold ${addMsg.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {addMsg}
              </span>
              <button disabled={addingProject} type="submit" className={`px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105 disabled:opacity-70 ${darkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                {addingProject ? 'Adding...' : 'Publish Project'}
              </button>
            </div>
          </form>
        </div>

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
                      <a href={`https://wa.me/?text=Hello ${encodeURIComponent(inq.name)}, reaching out from Zeninworks regarding your project inquiry!`} target="_blank" rel="noreferrer" title="Reply via WhatsApp" className={`p-2 rounded-full transition ${darkMode ? 'hover:bg-slate-800 text-green-400' : 'hover:bg-slate-100 text-green-600'}`}>
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

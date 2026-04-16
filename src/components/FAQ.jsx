import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What exactly is Zeninworks?",
    answer: "Zeninworks is a premium freelance agency focused on delivering high-end web applications, modern branding, and digital solutions that help scale your business with style."
  },
  {
    question: "How long does a typical project take?",
    answer: "Most of our standard projects are completed within 2 to 4 weeks depending on the complexity, custom features, and revisions required. Large scale enterprise solutions may take longer."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Absolutely. We offer comprehensive maintenance and support packages to ensure your digital products continue running smoothly, stay secure, and adapt to your growing business needs."
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer both fixed-price projects and customized solutions. Please book a discovery call or check our pricing section for a detailed transparent breakdown without hidden fees."
  }
];

const FAQ = ({ darkMode }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden z-10 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about our services, process, and billing. Find answers to common questions quickly.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === idx ? 'bg-white/80 dark:bg-slate-900/80 border-blue-500/50 shadow-md' : 'bg-white/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'} backdrop-blur-sm`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl"
                onClick={() => toggleFaq(idx)}
              >
                <span className="font-semibold text-lg text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <span className={`transform transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180 text-blue-500' : 'text-slate-400'}`}>
                  ▼
                </span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0 text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

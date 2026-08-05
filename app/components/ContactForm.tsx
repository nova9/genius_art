import React, { useState, useEffect } from "react";
import { ServiceItem } from "../types";
import { addContactSubmission } from "../lib/cache";
import { CheckCircle, WifiOff, Send, Loader2, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactFormProps {
  services: ServiceItem[];
  isDark: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ services, isDark }) => {
  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [serviceId, setServiceId] = useState(services[0]?.id || "");
  const [message, setMessage] = useState("");
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<"synced" | "cached" | null>(null);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);

  // Load submissions from cache
  useEffect(() => {
    // Read simulated offline preset from local storage
    const storedStatus = localStorage.getItem("simulated_offline_mode") === "true";
    setIsSimulatedOffline(storedStatus);
  }, []);

  // Sync serviceId when services load
  useEffect(() => {
    if (!serviceId && services.length > 0) {
      setServiceId(services[0].id);
    }
  }, [services, serviceId]);

  // Toggle offline simulator
  const toggleOfflineSimulation = () => {
    const nextVal = !isSimulatedOffline;
    setIsSimulatedOffline(nextVal);
    localStorage.setItem("simulated_offline_mode", String(nextVal));
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate network delay for realistic cinematic loading states
    setTimeout(() => {
      const submission = addContactSubmission({
        name,
        email,
        company,
        serviceId,
        message
      });

      // Clear form inputs
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setIsSubmitting(false);

      setSubmitSuccess(submission.status);

      // Auto-clear success message
      setTimeout(() => {
        setSubmitSuccess(null);
      }, 7000);

    }, 1200);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Contact Form Details (Left - 7 cols) */}
      <div className="lg:col-span-12 space-y-6">
        
        {/* Connection status notification */}
        <div className={`p-4 rounded-2xl flex items-center justify-between border ${
          isSimulatedOffline
            ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
            : "bg-white/5 border-white/20 text-white"
        }`}>
          <div className="flex items-center gap-3">
            {isSimulatedOffline ? (
              <WifiOff className="h-5 w-5 shrink-0 animate-pulse text-amber-500" />
            ) : (
              <Database className="h-5 w-5 shrink-0 text-white/70" />
            )}
            <div className="text-left">
              <p className="text-xs font-mono font-medium">
                {isSimulatedOffline ? "SIMULATED OFFLINE MODE ACTIVE" : "SECURED CLOUD BACKEND CONNECTED"}
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                {isSimulatedOffline 
                  ? "Form submissions will cache in local storage safely." 
                  : "All submissions synchronized to the production database."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleOfflineSimulation}
            className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-transform active:scale-95 border ${
              isSimulatedOffline
                ? "bg-amber-500 text-slate-950 border-amber-400"
                : "bg-white/10 text-white border-white/20 hover:bg-white hover:text-black"
            }`}
          >
            {isSimulatedOffline ? "GO ONLINE" : "TEST OFFLINE STORAGE"}
          </button>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="partnership-name" className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                Your Full Name *
              </label>
              <input
                id="partnership-name"
                required
                type="text"
                placeholder="CEO, Co-Creator..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  isDark
                    ? "bg-white/5 border-white/10 focus:ring-white focus:border-white text-white"
                    : "bg-white border-slate-250 focus:ring-black focus:border-black text-slate-900"
                }`}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="partnership-email" className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                Work Email Address *
              </label>
              <input
                id="partnership-email"
                required
                type="email"
                placeholder="you@corporate.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  isDark
                    ? "bg-white/5 border-white/10 focus:ring-white focus:border-white text-white"
                    : "bg-white border-slate-255 focus:ring-black focus:border-black text-slate-900"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Corporate Name */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="partnership-company" className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                Company Name
              </label>
              <input
                id="partnership-company"
                type="text"
                placeholder="Inc, Labs, Global"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  isDark
                    ? "bg-white/5 border-white/10 focus:ring-white focus:border-white text-white"
                    : "bg-white border-slate-260 focus:ring-black focus:border-black text-slate-900"
                }`}
              />
            </div>

            {/* Service Dropdown */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="partnership-service" className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                Service Requested
              </label>
              <select
                id="partnership-service"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className={`w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  isDark
                    ? "bg-white/5 border-white/10 focus:ring-white focus:border-white text-slate-350"
                    : "bg-white border-slate-265 focus:ring-black focus:border-black text-slate-800"
                }`}
              >
                {services.map((serv) => (
                  <option key={serv.id} value={serv.id} className="text-slate-900">
                    {serv.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="partnership-message" className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
              Describe your Creative Objective *
            </label>
            <textarea
              id="partnership-message"
              required
              rows={4}
              placeholder="What imagination would you like to unleash? Share details..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-1 transition-all resize-none ${
                isDark
                  ? "bg-white/5 border-white/10 focus:ring-white focus:border-white text-white"
                  : "bg-white border-slate-270 focus:ring-black focus:border-black text-slate-900"
              }`}
            />
          </div>

          {/* Submission button with loading state */}
          <div className="text-right">
            <button
              id="submit-campaign-btn"
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 relative inline-flex items-center gap-2 ${
                isSubmitting
                  ? "opacity-60 cursor-not-allowed bg-white/10 text-slate-500"
                  : isDark
                  ? "bg-white text-black hover:bg-white/90 active:scale-95"
                  : "bg-black text-white hover:bg-black/90 active:scale-95"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Transmitting Message...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>

        {/* Elegant Submission Toast feedback */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 mt-4 ${
                submitSuccess === "cached"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                  : "bg-emerald-500/15 border-emerald-500/35 text-emerald-400"
              }`}
            >
              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-cyan-400" />
              <div>
                <h5 className="font-bold font-display text-sm">
                  {submitSuccess === "cached" 
                    ? "Secure Offline Cache Activated!" 
                    : "Partnership Proposal Transmitted!"}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {submitSuccess === "cached"
                    ? "We detected offline mode simulation. Your blueprint proposal has been saved inside your browser cache. Push 'FORCE SYNC MATRIX' on the right panel once you toggle online!"
                    : "Your advertising vision has been logged safely. Our creatives will examine alignment vectors and correspond within 12 standard business hours."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};

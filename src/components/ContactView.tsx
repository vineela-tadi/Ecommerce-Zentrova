import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, ShieldCheck, Clock, ExternalLink } from "lucide-react";

export default function ContactView() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    
    setSubmitted(true);
    setTimeout(() => {
      alert(`Success: Your support ticket has been compiled! A customer advisor will reach out to ${formEmail} within 2 hours.`);
      // reset forms
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
      setSubmitted(false);
    }, 1000);
  };

  return (
    <div id="contact-support-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left space-y-12">
      
      {/* Page Header */}
      <div className="mb-10 text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full text-amber-600 text-xs font-bold font-mono tracking-wider uppercase mb-3">
          <HelpCircle className="w-3.5 h-3.5" /> SUPPORT DESK
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mt-2">Get in Touch with Zentrova</h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed font-light">
          Have queries about shipping timelines, artisan warranties, or corporate code allocations? Reach out. Our advisory desk resolves tickets 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: TICKET SUBMISSION FORM */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-bold text-lg text-slate-905 pb-3 border-b border-slate-50">Create Support Ticket</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-400">Your Full Name</label>
              <input
                id="contact-name-input"
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Julian Carter"
                className="w-full py-2.5 px-3 border border-slate-200 outline-none focus:border-blue-500 rounded-xl bg-slate-50 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Email Address</label>
              <input
                id="contact-email-input"
                type="email"
                required
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="julian@example.com"
                className="w-full py-2.5 px-3 border border-slate-200 outline-none focus:border-blue-500 rounded-xl bg-slate-50 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-450">Subject / Category</label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                className="w-full py-2.5 px-3 border border-slate-200 rounded-xl bg-white text-slate-600 outline-none"
              >
                <option value="General">General Inquiry</option>
                <option value="Shipping & Logistics">Shipping & Logistics Tracking</option>
                <option value="Artisan Warranty Claims">Artisan Warranty & Repairs</option>
                <option value="Bulk Operations & Corporate">Bulk Purchases & Corporate Accounts</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Detailed Message</label>
              <textarea
                id="contact-message-input"
                required
                rows={4}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Details of your request..."
                className="w-full py-2.5 px-3 border border-slate-200 outline-none focus:border-blue-500 rounded-xl bg-slate-50 focus:bg-white transition-all font-sans"
              ></textarea>
            </div>

            <button
              id="contact-submit-ticket-btn"
              type="submit"
              disabled={submitted}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-98 cursor-pointer disabled:bg-slate-350"
            >
              <Send className="w-4 h-4" /> {submitted ? "Sending Ticket..." : "Submit Secure Ticket"}
            </button>

          </form>
        </div>

        {/* RIGHT COLUMN: HEADQUARTERS PIN & SIMULATED INTERACTIVE MAP */}
        <div className="space-y-8">
          
          {/* Coordinates list */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">Corporate Coordinates</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-10 text-blue-600 rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-slate-400 font-bold font-mono">Customer Hotline</span>
                  <p className="text-slate-800">+1 (800) 905-ZEN-TRA</p>
                  <span className="text-[10px] text-slate-450 leading-none">Mon - Sun (24 Hours Open)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-10 text-blue-600 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-slate-400 font-bold font-mono">Email Dispatch</span>
                  <p className="text-slate-800">support@zentrova.com</p>
                  <span className="text-[10px] text-zinc-400 leading-none">Resolved in under 2 hrs</span>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <div className="p-2 bg-blue-10 text-blue-600 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-slate-400 font-bold font-mono">Headquarters Location</span>
                  <p className="text-slate-800">Zentrova Tower, 500 Park Avenue</p>
                  <span className="text-[10px] text-slate-400 leading-none">New York, NY 10022, United States</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATED INTERACTIVE MAP WIREFRAME */}
          <div className="border border-slate-100 rounded-3xl p-4 bg-slate-900 text-white shadow-xl relative overflow-hidden h-64 flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-75"></div>
            
            <div className="relative z-10 flex justify-between items-center bg-slate-950/80 p-3 rounded-2xl border border-white/5 backdrop-blur">
              <div className="text-left">
                <span className="text-[8px] text-blue-400 font-extrabold uppercase font-mono tracking-wider">ZENTROVA CORE HQ</span>
                <p className="text-xs font-bold text-white leading-tight">Park Avenue Office Complex</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                ● LIVE MAP CONNECTED
              </span>
            </div>

            {/* Simulated target grid pinpoint cursor overlay */}
            <div className="relative text-center flex flex-col items-center justify-center py-2 relative z-10">
              <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500 animate-ping absolute"></div>
              <MapPin className="w-8 h-8 text-blue-500 drop-shadow-lg scale-110" />
              <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold mt-2 bg-slate-950/85 px-2 py-0.5 rounded-md border border-white/5">
                LAT: 40.7614° N, LON: 73.9718° W
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/40 p-2 rounded-xl mt-auto">
              <span>Map Style: Slate-Dark</span>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 text-blue-400 font-extrabold">
                Get Directions <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

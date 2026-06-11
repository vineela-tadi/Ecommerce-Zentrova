import { Sparkles, ShieldCheck, Award, Heart, Check, Users, MapPin, Milestone } from "lucide-react";

export default function AboutView() {
  const milestones = [
    { year: "2023", title: "Corporate Inception", desc: "Formed Zentrova cooperatives to aggregate local premium craftsman collections." },
    { year: "2024", title: "Going Full-Stack Node", desc: "Launched optimized proxy APIs and Zene smart conversational models." },
    { year: "2025", title: "Carbon Neutral Delivery", desc: "Upgraded regional courier fleets to 100% electric delivery transport layers." },
    { year: "2026", title: "Discovery Redefined", desc: "Achieved multi-million benchmark evaluations in catalog accessibility and visual craftsmanship." }
  ];

  return (
    <div id="about-brand-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left space-y-16">
      
      {/* 1. HERO STORY GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-105 rounded-full text-blue-600 text-xs font-bold font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> The Zentrova Narrative
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 leading-none">
            Combining Convenience, <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Innovation & Style</span>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed font-light">
            Zentrova is a next-generation online shopping platform that combines innovation, convenience, and style. The platform offers customers a seamless shopping experience across Electronics, Fashion, Accessories, Lifestyle Products, Home Essentials, Beauty Products, and Trending Items. The brand should feel modern, trustworthy, premium, and customer-focused.
          </p>
          <p className="text-sm text-slate-505 leading-relaxed font-light">
            By integrating dedicated API gateways with cutting-edge Gemini conversational processors, we enable our site visitors to bypass dense static category filters and directly discover individual artisan-level products naturally.
          </p>
        </div>

        <div className="aspect-video lg:aspect-square bg-slate-950 rounded-3xl overflow-hidden relative shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" 
            alt="Zentrova distribution" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/10 to-transparent"></div>
        </div>
      </section>

      {/* 2. CORE VALUES BLOCK */}
      <section className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-100 text-center">
        <div className="max-w-xl mx-auto space-y-3 mb-10">
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase font-mono">Our Priorities</span>
          <h2 className="text-3xl font-bold font-heading text-slate-900">Operations Benchmarks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { title: "Artisan Selection", desc: "Every item inside Zentrova undercuts generic factory batches. We deal straight with approved craftsman cooperatives.", icon: Award },
            { title: "Absolute Protection", desc: "Payments route using 256-bit secure sockets layer locks so bank credentials remain entirely private.", icon: ShieldCheck },
            { title: "Empathetic Support", desc: "Our virtual assistant Zene coordinates live with shipping centers to secure claims instantly.", icon: Heart },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{val.title}</h3>
                <p className="text-xs text-slate-505 leading-relaxed font-light">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. EXPERIENCE JOURNEY MAP (MILESTONES) */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-heading text-slate-900 text-center">Development Journey</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative">
              <span className="text-3xl font-extrabold text-blue-600/20 font-mono absolute top-4 right-4">{m.year}</span>
              <div className="space-y-2 pt-6">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600" /> {m.title}
                </h4>
                <p className="text-xs text-slate-450 leading-relaxed font-light">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE TEAM */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono">Visionaries</span>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">Our Leadership Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Julian Zentrova", role: "CEO & Co-Founder", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80" },
            { name: "Elena Rostova", role: "Chief Design Architect", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80" },
            { name: "Marcus Stone", role: "Director of Logistics", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" }
          ].map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="h-64 bg-slate-100 overflow-hidden">
                <img src={t.img} className="w-full h-full object-cover object-top" alt={t.name} referrerPolicy="no-referrer" />
              </div>
              <div className="p-4 text-left">
                <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase font-mono">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

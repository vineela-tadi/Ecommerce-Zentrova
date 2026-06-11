import React from "react";
import { ArrowRight, Mail, Facebook, Instagram, Twitter, ShieldCheck } from "lucide-react";

interface FooterProps {
  onViewChange: (view: string, param?: any) => void;
  onSubscribe: (email: string) => void;
}

export default function Footer({ onViewChange, onSubscribe }: FooterProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (input && input.value) {
      onSubscribe(input.value);
      input.value = "";
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Upper division: Newsletter and Brand Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-slate-800">
          <div className="lg:pr-8">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => onViewChange("home")}>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm tracking-wider leading-none">
                Z
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-white">Zentrova</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Discover the Best, Shop the Future. Zentrova combines cutting-edge AI-assisted shopping guides, certified logistics speeds, and highly curated premium departments.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg transition-colors text-slate-400">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg transition-colors text-slate-400">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg transition-colors text-slate-400">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col md:flex-row justify-between gap-8 md:pl-8 lg:border-l lg:border-slate-800">
            <div className="max-w-md">
              <h4 className="text-white font-heading font-semibold text-base mb-3 tracking-wide flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" /> Unlock Future Exclusives
              </h4>
              <p className="text-sm text-slate-400 mb-4">
                Subscribe to our newsletter to receive curated promotions, product launches, and exclusive member discount campaigns.
              </p>
              <form onSubmit={handleSubmit} className="relative flex max-w-sm">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full py-2.5 pl-4 pr-12 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 px-3.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-2 min-w-[150px]">
              <span className="text-slate-300 text-xs font-bold tracking-wider uppercase mb-2">Shop Categories</span>
              <button onClick={() => onViewChange("shop", { category: "Electronics" })} className="text-left text-sm hover:text-white transition-colors">Electronics</button>
              <button onClick={() => onViewChange("shop", { category: "Fashion" })} className="text-left text-sm hover:text-white transition-colors">Fashion Apparel</button>
              <button onClick={() => onViewChange("shop", { category: "Accessories" })} className="text-left text-sm hover:text-white transition-colors">Accessories & Shades</button>
              <button onClick={() => onViewChange("shop", { category: "Beauty" })} className="text-left text-sm hover:text-white transition-colors">Beauty & Skincare</button>
            </div>
          </div>
        </div>

        {/* Lower division: Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-xs">
          <div>
            <h5 className="text-white font-semibold uppercase tracking-wider mb-3">Customer Support</h5>
            <ul className="space-y-2">
              <li><button onClick={() => onViewChange("contact")} className="hover:text-white transition-colors text-left">24/7 Support Desk</button></li>
              <li><button onClick={() => onViewChange("contact")} className="hover:text-white transition-colors text-left">Contact Form</button></li>
              <li><button onClick={() => onViewChange("contact")} className="hover:text-white transition-colors text-left">FAQ Library</button></li>
              <li><button onClick={() => onViewChange("contact")} className="hover:text-white transition-colors text-left">Return Center</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold uppercase tracking-wider mb-3">Corporate Brand</h5>
            <ul className="space-y-2">
              <li><button onClick={() => onViewChange("about")} className="hover:text-white transition-colors text-left">Our Heritage Story</button></li>
              <li><button onClick={() => onViewChange("about")} className="hover:text-white transition-colors text-left">Mission & Core Values</button></li>
              <li><button onClick={() => onViewChange("about")} className="hover:text-white transition-colors text-left">Executive Leaders</button></li>
              <li><span className="text-slate-600">Careers (We're hiring!)</span></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold uppercase tracking-wider mb-3">Shop Guarantees</h5>
            <ul className="space-y-2">
              <li><span className="text-slate-500">Free Over-night Shipping on $150+</span></li>
              <li><span className="text-slate-500">100% Secure SSL Payment Layers</span></li>
              <li><span className="text-slate-500">30-Day Money Back Returns</span></li>
              <li><span className="text-slate-500">Carbon Neutral Shipments</span></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
            <h5 className="text-white font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> SECURED BY ZENTROVA
            </h5>
            <p className="text-[11px] leading-relaxed mb-4">
              Our payments page routes transactions via encrypted 256-bit bank channels, complying with standard global security principles.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 bg-slate-850 border border-slate-800 text-slate-500 rounded font-semibold text-[9px] tracking-widest font-mono">STRIPE</span>
              <span className="px-2 py-1 bg-slate-850 border border-slate-800 text-slate-500 rounded font-semibold text-[9px] tracking-widest font-mono">RAZORPAY</span>
              <span className="px-2 py-1 bg-slate-850 border border-slate-800 text-slate-500 rounded font-semibold text-[9px] tracking-widest font-mono">VISA / MC</span>
            </div>
          </div>
        </div>

        {/* Core footer notes */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Zentrova Premium Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-500 font-mono text-[10px]">
            <span>URL CONFIG: SECURED VIA APP_URL</span>
            <span>HOST: CLOUD READY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

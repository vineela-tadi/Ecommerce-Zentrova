import { useState } from "react";
import { Sparkles, Percent, Calendar, Check, Copy, Tag, Clock, Flame } from "lucide-react";
import { OFFERS } from "../data/products";

interface OffersViewProps {
  onApplyCoupon: (code: string) => void;
  activeCouponCode?: string;
  onViewChange: (view: string, param?: any) => void;
}

export default function OffersView({ onApplyCoupon, activeCouponCode, onViewChange }: OffersViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleClaimOffer = (code: string) => {
    onApplyCoupon(code);
    alert(`Success: ${code} has been redeemed on your cart! You will see the matching price reductions immediately.`);
  };

  return (
    <div id="offers-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left">
      
      {/* Page Header */}
      <div className="mb-10 text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-full text-amber-600 text-xs font-bold font-mono tracking-wider uppercase mb-3">
          <Percent className="w-3.5 h-3.5" /> Campaign Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900	 mt-2">Active Savings Code & Exclusives</h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed font-light">
          Redeem premium coupons directly onto your cart to secure high-profile discounts across all electronics, accessories, and fashion.
        </p>
      </div>

      {/* Offers Banners Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OFFERS.map((offer) => {
          const isCopied = copiedCode === offer.couponCode;
          const isActiveOnCart = activeCouponCode === offer.couponCode;

          return (
            <div 
              key={offer.id}
              id={`offer-card-${offer.id}`}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media banner visual */}
              <div className="h-44 relative bg-slate-900">
                <img 
                  src={offer.bannerUrl} 
                  className="w-full h-full object-cover opacity-75" 
                  alt={offer.title} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div className="px-2.5 py-1 rounded bg-amber-500 font-extrabold text-[10px] tracking-wider uppercase font-mono shadow-md shadow-amber-500/20">
                    {offer.discountText}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-300 font-mono">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> Exp: {offer.expiryCountdown}
                  </div>
                </div>
              </div>

              {/* Offer Info Detail */}
              <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900 leading-tight flex items-start gap-1.5">
                    <Sparkles className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                    {offer.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{offer.description}</p>
                </div>

                {/* Redeem operations row */}
                <div className="space-y-3 pt-4 border-t border-slate-50 mt-auto">
                  
                  {/* Coupon clipboard row */}
                  <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100 font-mono">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-bold text-slate-800">{offer.couponCode}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(offer.couponCode)}
                      className={`p-1.5 rounded-lg border transition-all flex items-center gap-1.5 text-[10.5px] font-bold ${isCopied ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800"}`}
                    >
                      {isCopied ? (
                        <>Copied <Check className="w-3.5 h-3.5" /></>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  </div>

                  {/* Primary claim operations */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleClaimOffer(offer.couponCode)}
                      className={`w-1/2 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${isActiveOnCart ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-default" : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer active:scale-98"}`}
                    >
                      {isActiveOnCart ? "Active Coupon Applied" : "Claim Code Now"}
                    </button>
                    <button
                      onClick={() => onViewChange("shop")}
                      className="w-1/2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-650 font-bold text-xs transition-all"
                    >
                      Shop Eligible Items
                    </button>
                  </div>

                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Bonus promotions block/banner */}
      <section id="additional-campaign-deals" className="mt-16 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-650/15 rounded-full blur-3xl"></div>
        
        <div className="space-y-2 text-left">
          <span className="text-xs uppercase font-extrabold text-blue-400 font-mono tracking-widest flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" /> Exclusive Loyalty Rewards
          </span>
          <h2 className="text-2xl font-extrabold font-heading text-white">Join Zentrova Club Member Series</h2>
          <p className="text-xs text-slate-400 max-w-xl font-light leading-relaxed">
            Every ₹1 spent earns 10 loyalty points. Double reward boosters trigger automatically during weekends. Build points securely to swap for premium gift cards!
          </p>
        </div>

        <button 
          onClick={() => onViewChange("dashboard")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-transform active:scale-95 flex items-center gap-1.5 shrink-0"
        >
          Activate member profile &rarr;
        </button>
      </section>

    </div>
  );
}

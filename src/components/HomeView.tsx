import { useState, useEffect } from "react";
import { 
  ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Star, 
  Clock, TrendingUp, Sparkles, Award, Heart, ShoppingCart, Eye, Percent
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { Product } from "../types";
import { formatPrice } from "../utils/currency";

interface HomeViewProps {
  onViewChange: (view: string, param?: any) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export default function HomeView({
  onViewChange,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}: HomeViewProps) {
  // Countdown Timer state for Flash Sale
  const [timeLeft, setTimeLeft] = useState({ hrs: 14, mins: 32, secs: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { hrs: prev.hrs, mins: prev.mins - 1, secs: 59 };
        if (prev.hrs > 0) return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, "0");

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const flashSaleProduct = PRODUCTS.find((p) => p.isFlashSale) || PRODUCTS[0];
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending || p.rating >= 4.7).slice(0, 4);

  const categories = [
    { name: "Electronics", count: "124 items", desc: "Hi-Fi Audio, Laptops, Smartwatches", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80" },
    { name: "Fashion", count: "210 items", desc: "Organic Outerwear & Knitwear", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80" },
    { name: "Accessories", count: "98 items", desc: "Acetate Sunglasses & Leather Duffels", image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&auto=format&fit=crop&q=80" },
    { name: "Lifestyle", count: "84 items", desc: "Wabi-Sabi Stoneware & Cork Support", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&auto=format&fit=crop&q=80" },
    { name: "Beauty", count: "115 items", desc: "Bio-peptide Hyaluronic Serums", image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80" },
  ];

  const brandLogos = ["SAMSUNG", "APPLE", "SONY", "BOSE", "ATELIER", "NORDIC"];

  return (
    <div id="home-view" className="space-y-16 pb-20">
      
      {/* 1. HERO BANNER SECTION */}
      <section id="hero-banner" className="relative bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-6">
        {/* Visual background gradient layering */}
        <div className="absolute inset-0 bg-radial-gradient from-blue-700/20 via-transparent to-transparent opacity-75"></div>
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 overflow-hidden hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80" 
            alt="Zentrova Prime Model"
            className="w-full h-full object-cover object-center scale-102 hover:scale-105 transition-all duration-7000 ease-out opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-24 lg:py-32 flex flex-col justify-center min-h-[480px] lg:w-1/2 z-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/25 rounded-full text-blue-400 text-xs font-semibold tracking-wider font-mono uppercase mb-6 self-start animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> Discovery Redefined
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-none mb-6 text-white">
            Discover the Best, <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Shop the Future</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-md mb-8">
            Explore premium electronics, fashion, accessories, and lifestyle essentials at unbeatable prices. Immersive design meets unmatched customer service.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              id="hero-shop-now-btn"
              onClick={() => onViewChange("shop")}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 active:scale-98 flex items-center gap-2 cursor-pointer"
            >
              Shop Curated Catalog <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={() => onViewChange("offers")}
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm rounded-xl transition-all border border-slate-700 active:scale-98"
            >
              Browse Active Coupon Codes
            </button>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section id="trust-statements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">Fast Shipping</h3>
              <p className="text-xs text-slate-400 leading-normal">Free next-day transit on standard orders ₹12,450+</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">Secure Shopping</h3>
              <p className="text-xs text-slate-400 leading-normal">Multi-layer encryption systems for all bank channels</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">Easy Returns</h3>
              <p className="text-xs text-slate-400 leading-normal">Unconditional 30-day money-back satisfaction lock</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">24/7 Premium Help</h3>
              <p className="text-xs text-slate-400 leading-normal">Live expert advisors and smart chatbot assistants</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION */}
      <section id="featured-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono">Curated Collections</span>
            <h2 className="text-3xl font-bold font-heading text-slate-900 mt-2">Signature Categories</h2>
          </div>
          <button onClick={() => onViewChange("shop")} className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
            Explore All Departments <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <div 
              key={cat.name}
              id={`cat-card-${idx}`}
              onClick={() => onViewChange("shop", { category: cat.name })}
              className="group relative h-48 rounded-2xl overflow-hidden border border-slate-100 cursor-pointer shadow-sm shadow-slate-100"
            >
              <img 
                src={cat.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                alt={cat.name} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute inset-x-4 bottom-4 text-left">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider font-mono">{cat.count}</span>
                <h3 className="text-white font-bold font-heading text-lg mt-0.5 leading-tight">{cat.name}</h3>
                <p className="text-[11px] text-slate-300 truncate mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE PROMOTION */}
      <section id="flash-sale-timer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-500 to-orange-400 rounded-3xl overflow-hidden shadow-xl p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center gap-8 text-left relative">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-bold font-mono tracking-wider uppercase">
              <Clock className="w-3.5 h-3.5" /> LIMITED-TIME OFFER
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight leading-none">
              Superpowered Flash Sale
            </h2>
            <p className="text-sm sm:text-base text-red-50 leading-relaxed max-w-lg font-light">
              Don&apos;t wait. Redefine your style and accessories today with limited-capacity deals expiring within hours.
            </p>

            {/* Simulated countdown timers */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/15 flex items-center justify-center text-xl font-bold font-mono">
                  {formatNum(timeLeft.hrs)}
                </div>
                <span className="text-[10px] text-red-100 font-bold tracking-wider uppercase mt-1">Hours</span>
              </div>
              <span className="text-2xl font-bold font-mono mb-4">:</span>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/15 flex items-center justify-center text-xl font-bold font-mono">
                  {formatNum(timeLeft.mins)}
                </div>
                <span className="text-[10px] text-red-100 font-bold tracking-wider uppercase mt-1">Mins</span>
              </div>
              <span className="text-2xl font-bold font-mono mb-4">:</span>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/15 flex items-center justify-center text-xl font-bold font-mono">
                  {formatNum(timeLeft.secs)}
                </div>
                <span className="text-[10px] text-red-100 font-bold tracking-wider uppercase mt-1">Secs</span>
              </div>
            </div>
          </div>

          {/* Flash sale product promo board */}
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 flex gap-4 text-slate-800 shadow-lg relative">
            <span className="absolute -top-3 -right-3 px-3 py-1 bg-red-500 font-bold text-white text-[10px] rounded-full shadow-md shadow-red-300">
              {flashSaleProduct.discountPercent}% SLASHED
            </span>
            <img src={flashSaleProduct.imageUrl} className="w-24 h-24 rounded-xl object-cover bg-slate-50 shrink-0" alt="Flash promo" referrerPolicy="no-referrer" />
            <div className="flex-grow flex flex-col justify-between text-left">
              <div>
                <span className="text-[9px] uppercase font-bold text-red-500 font-mono tracking-wider">{flashSaleProduct.brand}</span>
                <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">{flashSaleProduct.title}</h4>
                <div className="flex items-center text-amber-500 font-bold text-xs mt-1">
                  <Star className="w-3 h-3 fill-current mr-0.5" /> {flashSaleProduct.rating}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-lg font-extrabold text-slate-950">{formatPrice(flashSaleProduct.price)}</span>
                  {flashSaleProduct.originalPrice && (
                    <span className="text-xs text-slate-400 line-through ml-1.5">{formatPrice(flashSaleProduct.originalPrice)}</span>
                  )}
                </div>
                <button 
                  onClick={() => onViewChange("product", flashSaleProduct.id)}
                  className="px-3.5 py-1.5 bg-red-500 hover:bg-red-650 text-white font-bold text-[10px] rounded-lg transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  Claim Deal
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. BEST SELLERS SECTION */}
      <section id="best-sellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono">Highly Coveted</span>
            <h2 className="text-3xl font-bold font-heading text-slate-900 mt-2">Zentrova Best Sellers</h2>
          </div>
          <button onClick={() => onViewChange("shop", { sort: "rating" })} className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            View All Verified Sellers
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => {
            const isWish = wishlistIds.includes(product.id);
            return (
              <div 
                key={product.id}
                id={`best-seller-card-${product.id}`}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Image panel */}
                <div className="relative pt-[100%] bg-slate-50/50 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={product.title} 
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 bg-blue-600 text-white text-[9px] font-bold tracking-wider rounded-lg uppercase">
                      BEST SELLER
                    </span>
                    {product.discountPercent && (
                      <span className="px-2.5 py-1 bg-amber-500 text-white text-[9px] font-bold tracking-wider rounded-lg uppercase">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Operational Overlays */}
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => onQuickView(product)}
                      className="p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-full shadow-lg transition-transform hover:scale-115 cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => onAddToCart(product, 1)}
                      className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-transform hover:scale-115 cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Wishlist triggers */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all cursor-pointer ${isWish ? "bg-rose-500 text-white" : "bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600"}`}
                  >
                    <Heart className={`w-4.5 h-4.5 ${isWish ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Info details */}
                <div className="p-5 text-left flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-mono">{product.brand}</span>
                    <h3 
                      onClick={() => onViewChange("product", product.id)}
                      className="text-[15px] font-bold text-slate-900 mt-1 cursor-pointer hover:text-blue-600 transition-colors truncate"
                    >
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex items-center text-amber-500 bg-amber-50 px-1.5 py-0.2 rounded text-[10px] font-bold">
                        <Star className="w-3 h-3 fill-current mr-0.5" /> {product.rating}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">({product.reviewCount})</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-slate-50">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-slate-950">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => onViewChange("product", product.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-0.5"
                    >
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 6. WHY CHOOSE ZENTROVA (BENTO BLOCK REPRESENTATIONS) */}
      <section id="features-highlights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 py-16 rounded-3xl border border-slate-100">
        <div className="max-w-xl mx-auto text-center mb-12">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono">The Zentrova Standard</span>
          <h2 className="text-3xl font-bold font-heading text-slate-900 mt-2">Core Operations Guarantee</h2>
          <p className="text-slate-500 text-sm mt-3 font-light leading-relaxed">
            Leading-class user interfaces matched with durable logistics structures that prioritize your security and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Certified Authentic Brands</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Every single item in our catalog arrives with 100% authenticity declarations and warranties straight from original craftsmen cooperatives.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mt-6">Zero-Risk Purchase</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Live Real-time AI Assistant</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Our custom backend proxy bridges direct conversations with Zene, giving you rapid access to coupon campaign claims and product material detail sheets.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mt-6">Conversational UI</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-5">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Next-Generation Logistics</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Synchronized with regional shipping centers in major metropolises to secure overnight doorstep delivery speeds with carbon-absorbing credentials.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mt-6">Next Day Delivery</span>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER REVIEWS */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono font-semibold">User Endorsements</span>
          <h2 className="text-3xl font-bold font-heading text-slate-900 mt-2">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                &ldquo;Zene recommended me the Aethera headphones when I asked about ANC features in the chat widget. Swiping the welcome code was immediate. Overnight delivery was precisely on time.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-700">DC</div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Dr. Carter S.</h4>
                <span className="text-[10px] text-slate-400 font-medium uppercase font-mono">Verified Tech Buyer</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                &ldquo;The Sloane Sunglasses honey-tortoise acetate finish looks extremely luxury. Incredible glare rejection at the beach. Zentrova is easily a startup worth millions of dollars in visual craftsmanship!&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-700">HR</div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Hannah Reyes</h4>
                <span className="text-[10px] text-slate-400 font-medium uppercase font-mono">Verified Fashion Buyer</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                &ldquo;Pure organic cork exercise mats usually smell full of petrochemicals, but the Fortis mat smelled perfectly clean and natural out of the wrapper. Zero grip slip even during high sweat cardio.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-700">MB</div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Matthew B.</h4>
                <span className="text-[10px] text-slate-400 font-medium uppercase font-mono">Verified Athlete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FEATURED PARTNER BRANDS */}
      <section id="partner-brands" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-b border-slate-150">
        <div className="flex flex-wrap items-center justify-around gap-8 opacity-45">
          {brandLogos.map((brandName) => (
            <span key={brandName} className="font-heading font-extrabold text-slate-400 tracking-widest text-lg md:text-xl">
              {brandName}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}

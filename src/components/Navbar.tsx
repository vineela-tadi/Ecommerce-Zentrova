import React, { useState, useEffect, useRef } from "react";
import { 
  Search, ShoppingCart, Heart, User, Menu, X, ArrowRight,
  Sparkles, Laptop, Shirt, Watch, Flame, ShoppingBag, Eye 
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { Product, UserProfile } from "../types";

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string, param?: any) => void;
  cartCount: number;
  wishlistCount: number;
  user: UserProfile;
}

export default function Navbar({ currentView, onViewChange, cartCount, wishlistCount, user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products for dropdown suggestion as user types
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subCategory.toLowerCase().includes(query)
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Handle outside clicks to close search suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (productId: string) => {
    setIsSearchFocused(false);
    setSearchQuery("");
    onViewChange("product", productId);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      onViewChange("shop", { search: searchQuery });
      setIsSearchFocused(false);
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange("home")}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold tracking-wider relative overflow-hidden shadow-md shadow-blue-200">
              <span className="relative z-10 font-heading text-lg">Z</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-indigo-500 opacity-60"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-tight text-slate-900 leading-none">Zentrova</span>
              <span className="text-[10px] text-amber-500 tracking-widest font-medium uppercase mt-0.5 font-sans">Shop the Future</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 justify-center flex-1 max-w-xl mx-8 font-sans">
            <button 
              onClick={() => onViewChange("home")}
              className={`text-[15px] font-medium transition-colors ${currentView === "home" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-slate-900"}`}
            >
              Home
            </button>
            <button 
              onClick={() => onViewChange("shop")}
              className={`text-[15px] font-medium transition-colors ${currentView === "shop" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-slate-900"}`}
            >
              Shop
            </button>
            <button 
              onClick={() => onViewChange("offers")}
              className={`text-[15px] font-medium transition-colors flex items-center gap-1 ${currentView === "offers" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-slate-900"}`}
            >
              Offers 
              <span className="inline-block px-1.5 py-0.2 text-[9px] font-bold bg-amber-500 text-white rounded-md animate-pulse">HOT</span>
            </button>
            <button 
              onClick={() => onViewChange("about")}
              className={`text-[15px] font-medium transition-colors ${currentView === "about" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-slate-900"}`}
            >
              About
            </button>
            <button 
              onClick={() => onViewChange("contact")}
              className={`text-[15px] font-medium transition-colors ${currentView === "contact" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-slate-900"}`}
            >
              Contact
            </button>
          </nav>

          {/* Search bar & Icons wrapper */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Search inputs with suggestion dropdown */}
            <div ref={searchRef} className="hidden md:block relative w-64 lg:w-72">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    id="navbar-search-input"
                    type="text"
                    placeholder="Search premium products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full py-2 pl-4 pr-10 rounded-full border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <Search className="w-4.5 h-4.5" />
                  </button>
                </div>
              </form>

              {/* Suggestions dropdown */}
              {isSearchFocused && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-2 border-b border-slate-50 text-[10px] font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> SUGGESTED RESULTS
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {suggestions.map((p) => (
                      <div 
                        key={p.id}
                        id={`search-suggest-${p.id}`}
                        onClick={() => handleSuggestionClick(p.id)}
                        className="p-3 hover:bg-slate-50 flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <img src={p.imageUrl} className="w-10 h-10 rounded-lg object-cover bg-slate-100" alt={p.title} referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-slate-900 truncate">{p.title}</h4>
                          <p className="text-[10px] text-slate-400">{p.brand} &bull; <span className="font-medium text-slate-600">${p.price}</span></p>
                        </div>
                        <Eye className="w-4 h-4 text-slate-300 hover:text-blue-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 lg:gap-4 text-slate-700">
              
              {/* Wishlist Icon */}
              <button 
                id="wishlist-indicator"
                onClick={() => onViewChange("dashboard", "wishlist")} 
                className="p-2.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5.5 h-5.5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none border-2 border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <button 
                id="cart-indicator"
                onClick={() => onViewChange("cart")} 
                className="p-2.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5.5 h-5.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Profile Trigger */}
              <button 
                id="user-indicator"
                onClick={() => onViewChange("dashboard")} 
                className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-2 max-w-[140px]"
                aria-label="Account Dashboard"
              >
                <div className="w-8.5 h-8.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-600">
                  {user.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                  ) : (
                    <User className="w-4.5 h-4.5 text-blue-600" />
                  )}
                </div>
                <span className="hidden xl:inline text-xs font-semibold text-slate-800 truncate">{user.name.split(" ")[0]}</span>
              </button>

              {/* Mobile Drawer Trigger */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 lg:hidden"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg px-4 pt-4 pb-6 space-y-3 shadow-inner">
          
          {/* Mobile search input */}
          <form onSubmit={handleSearchSubmit} className="md:hidden pb-2 mb-2">
            <div className="relative">
              <input
                id="navbar-mobile-search-input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4.5 h-4.5" />
              </button>
            </div>
          </form>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3 pb-4">
            <button 
              onClick={() => { onViewChange("home"); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-sm font-semibold flex items-center gap-2 text-slate-800"
            >
              <ShoppingBag className="w-4 h-4 text-slate-400" /> Home
            </button>
            <button 
              onClick={() => { onViewChange("shop"); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-sm font-semibold flex items-center gap-2 text-slate-800"
            >
              <Laptop className="w-4 h-4 text-slate-400" /> Catalog
            </button>
            <button 
              onClick={() => { onViewChange("offers"); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-slate-50 hover:bg-orange-50 hover:text-orange-600 text-sm font-semibold flex items-center gap-2 text-slate-800"
            >
              <Flame className="w-4 h-4 text-amber-500" /> Offers
            </button>
            <button 
              onClick={() => { onViewChange("dashboard"); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-sm font-semibold flex items-center gap-2 text-slate-800"
            >
              <User className="w-4 h-4 text-slate-400" /> Account
            </button>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2">
            <button 
              onClick={() => { onViewChange("about"); setIsMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-55 rounded-lg"
            >
              Our Brand Story
            </button>
            <button 
              onClick={() => { onViewChange("contact"); setIsMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-55 rounded-lg"
            >
              Contact Support
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Signed in as: <span className="font-semibold text-slate-700">{user.email}</span></span>
            <button onClick={() => { onViewChange("dashboard", "addresses"); setIsMobileMenuOpen(false); }} className="text-xs font-semibold text-blue-600 flex items-center gap-0.5">
              Addresses <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

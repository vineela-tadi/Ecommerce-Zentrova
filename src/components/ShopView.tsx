import { useState, useEffect } from "react";
import { 
  Grid, List, SlidersHorizontal, Search, Heart, ShoppingCart, 
  Eye, Check, X, Filter, RotateCcw, Star 
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { Product } from "../types";
import { formatPrice } from "../utils/currency";

interface ShopViewProps {
  initialSearch?: string;
  initialCategory?: string;
  onViewChange: (view: string, param?: any) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export default function ShopView({
  initialSearch = "",
  initialCategory = "",
  onViewChange,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}: ShopViewProps) {
  // Search & Catalog State
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);
  const [sortBy, setSortBy] = useState<string>("popular");

  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with initial props changes
  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Extract unique brands, colors, and sizes across available dataset for automatic dropdown bindings
  const uniqueBrands = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
  const uniqueColors = Array.from(new Set(PRODUCTS.flatMap((p) => p.colors || [])));
  const uniqueSizes = Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes || [])));

  // Filter Catalog logic
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesBrand = selectedBrand ? p.brand === selectedBrand : true;
    const matchesPrice = p.price <= priceRange;
    const matchesRating = selectedRating ? p.rating >= selectedRating : true;
    const matchesInStock = onlyInStock ? p.inStock : true;
    const matchesDiscounts = onlyDiscounts ? !!p.discountPercent : true;
    
    const matchesColor = selectedColor 
      ? p.colors?.some((c) => c.toLowerCase() === selectedColor.toLowerCase()) 
      : true;
      
    const matchesSize = selectedSize 
      ? p.sizes?.some((s) => s.toLowerCase() === selectedSize.toLowerCase()) 
      : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesRating &&
      matchesInStock &&
      matchesDiscounts &&
      matchesColor &&
      matchesSize
    );
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
    // default trending / popular sort
    return b.reviewCount - a.reviewCount;
  });

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange(1500);
    setSelectedRating(null);
    setSelectedColor("");
    setSelectedSize("");
    setOnlyInStock(false);
    setOnlyDiscounts(false);
    setSortBy("popular");
  };

  return (
    <div id="shop-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Top Banner Context */}
      <div className="mb-8 text-left">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono">Premium Marketplace</span>
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 mt-1">Explore Zentrova</h1>
        <p className="text-slate-400 text-sm mt-1">Showing {sortedProducts.length} curated premium items matching your preference.</p>
      </div>

      {/* Catalog Search, Sort, Views bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 mb-8">
        
        {/* Instant filter query text box */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <input
            id="shop-search-query-field"
            type="text"
            placeholder="Search our catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-sm rounded-xl border border-slate-200 outline-none focus:border-blue-500 bg-slate-50 focus:bg-white transition-all text-slate-800"
          />
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 w-full">
          {/* Mobile Filter trigger */}
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold md:hidden"
          >
            <Filter className="w-4 w-4" /> Filters
          </button>

          {/* Sort Selection */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-semibold text-slate-400 uppercase tracking-wider">Sort:</span>
            <select
              id="shop-sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500 bg-white cursor-pointer text-slate-700"
            >
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Savings</option>
            </select>
          </div>

          {/* Layout Grid vs List triggers */}
          <div className="flex items-center gap-1 border border-slate-200 p-1 rounded-xl bg-slate-50">
            <button 
              onClick={() => setLayout("grid")}
              className={`p-2 rounded-lg transition-colors ${layout === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              aria-label="Grid layout"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setLayout("list")}
              className={`p-2 rounded-lg transition-colors ${layout === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              aria-label="List layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <div className="flex gap-8 items-start relative">
        
        {/* DESKTOP COLLATERATED FILTERS PANEL */}
        <aside id="desktop-filters-sidebar" className="hidden md:block w-64 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 text-left shrink-0">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4.5 h-4.5 text-blue-600" /> Filters
            </h3>
            <button 
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-0.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Category listings */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</span>
            {["Electronics", "Fashion", "Accessories", "Lifestyle", "Beauty"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-sm transition-colors flex items-center justify-between ${selectedCategory === cat ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-650 hover:text-slate-900 hover:bg-slate-50"}`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>

          {/* Brand selectors */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Manufacturer / Brand</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-600 font-medium"
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Price range controls */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Maximum Price</span>
              <span className="text-sm font-bold text-slate-800">{formatPrice(priceRange)}</span>
            </div>
            <input
              type="range"
              min="20"
              max="1500"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>{formatPrice(20)}</span>
              <span>{formatPrice(1500)}</span>
            </div>
          </div>

          {/* Minimal Rating filtering */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Minimum Rating</span>
            {[4.8, 4.5, 4.0].map((starVal) => (
              <button
                key={starVal}
                onClick={() => setSelectedRating(selectedRating === starVal ? null : starVal)}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${selectedRating === starVal ? "bg-amber-50 text-amber-700" : "text-slate-650 hover:bg-slate-50"}`}
              >
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                  {starVal}+ Stars
                </div>
                {selectedRating === starVal && <Check className="w-3.5 h-3.5 text-amber-600 ml-auto" />}
              </button>
            ))}
          </div>

          {/* Color filter */}
          {uniqueColors.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Accent Tone</span>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-600 font-medium"
              >
                <option value="">All Tones</option>
                {uniqueColors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* Inline Stock and Discount flags */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span>In Stock Only</span>
            </label>
            <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDiscounts}
                onChange={(e) => setOnlyDiscounts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span>Discounts & Sales Only</span>
            </label>
          </div>

        </aside>

        {/* CATALOG RESULTS GRID/LIST LOGICS */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center max-w-lg mx-auto">
              < slidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Products Fit Preferences</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                We couldn&apos;t find any Zentrova items matching your current filters. Try relaxing search filters or reset parameters to start afresh.
              </p>
              <button 
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Reset Filter Panel
              </button>
            </div>
          ) : layout === "grid" ? (
            
            /* GRID VIEW LAYOUT */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((p) => {
                const isWish = wishlistIds.includes(p.id);
                return (
                  <div 
                    key={p.id}
                    id={`shop-product-card-${p.id}`}
                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    
                    {/* Top image content */}
                    <div className="relative pt-[100%] bg-slate-50/50 overflow-hidden">
                      <img 
                        src={p.imageUrl} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        alt={p.title} 
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating operations */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {p.isBestSeller && (
                          <span className="px-2 py-0.5 bg-blue-600 text-white font-bold text-[8.5px] rounded-md tracking-wider uppercase">
                            BEST SELLER
                          </span>
                        )}
                        {p.isFlashSale && (
                          <span className="px-2 py-0.5 bg-red-500 text-white font-bold text-[8.5px] rounded-md tracking-wider uppercase">
                            FLASH SALE
                          </span>
                        )}
                        {p.discountPercent && (
                          <span className="px-2 py-0.5 bg-amber-500 text-white font-bold text-[8.5px] rounded-md tracking-wider uppercase">
                            {p.discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      {/* Interactive hover actions */}
                      <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button 
                          onClick={() => onQuickView(p)}
                          className="p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-full shadow-lg transition-transform hover:scale-115 cursor-pointer animate-fade-in-up"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => onAddToCart(p, 1)}
                          className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-transform hover:scale-115 cursor-pointer animate-fade-in-up"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Wishlist button */}
                      <button
                        onClick={() => onToggleWishlist(p.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all cursor-pointer ${isWish ? "bg-rose-500 text-white" : "bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600"}`}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4.5 h-4.5 ${isWish ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Bottom detail card */}
                    <div className="p-5 text-left flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">{p.brand}</span>
                        <h3 
                          onClick={() => onViewChange("product", p.id)}
                          className="text-[14.5px] font-bold text-slate-900 mt-1 cursor-pointer hover:text-blue-600 transition-colors truncate"
                        >
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex items-center bg-amber-50 px-1.5 py-0.2 rounded text-[10px] text-amber-600 font-extrabold pb-0.5">
                            <Star className="w-3 h-3 fill-current mr-0.5 shrink-0" /> {p.rating}
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">({p.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-slate-50">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-slate-950">{formatPrice(p.price)}</span>
                          {p.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">{formatPrice(p.originalPrice)}</span>
                          )}
                        </div>
                        <button 
                          onClick={() => onViewChange("product", p.id)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-all flex items-center gap-0.5 cursor-pointer"
                        >
                          Explore Specs &rarr;
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            
            /* LIST VIEW LAYOUT */
            <div className="space-y-4">
              {sortedProducts.map((p) => {
                const isWish = wishlistIds.includes(p.id);
                return (
                  <div 
                    key={p.id}
                    id={`shop-product-list-card-${p.id}`}
                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden p-4 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition-shadow text-left"
                  >
                    <div className="w-full sm:w-44 h-44 bg-slate-50 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center">
                      <img src={p.imageUrl} className="max-h-full max-w-full object-cover rounded-xl" alt={p.title} referrerPolicy="no-referrer" />
                      
                      {/* Float indicators */}
                      <button
                        onClick={() => onToggleWishlist(p.id)}
                        className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md transition-all cursor-pointer ${isWish ? "bg-rose-500 text-white" : "bg-white text-slate-400 hover:text-slate-600"}`}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWish ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <div className="flex-grow flex flex-col justify-between py-1.5 min-w-0">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono tracking-wider font-bold text-slate-400">
                          <span>{p.brand.toUpperCase()}</span>
                          <span>SKU: {p.sku}</span>
                        </div>
                        <h3 
                          onClick={() => onViewChange("product", p.id)}
                          className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors mt-1 cursor-pointer truncate"
                        >
                          {p.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-light">{p.description}</p>
                        
                        <div className="flex items-center gap-2 mt-3 text-xs">
                          <div className="flex items-center text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-bold">
                            <Star className="w-3 h-3 fill-current mr-0.5" /> {p.rating}
                          </div>
                          <span className="text-slate-400 font-medium">{p.reviewCount} buyers reviewed</span>
                          {p.inStock ? (
                            <span className="text-emerald-600 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded-md ml-auto">IN STOCK ({p.stockCount} left)</span>
                          ) : (
                            <span className="text-rose-500 bg-rose-50 text-[10px] font-bold px-2 py-0.5 rounded-md ml-auto">SOLD OUT</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-end justify-between pt-4 border-t border-slate-50 mt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-slate-950">{formatPrice(p.price)}</span>
                          {p.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">{formatPrice(p.originalPrice)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => onQuickView(p)}
                            className="p-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => onAddToCart(p, 1)}
                            className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-98 cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* MOBILE COLLAPSED FILTERS DRAWER */}
      {isMobileFilterOpen && (
        <div id="mobile-filter-mask" className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-end">
          <div 
            id="mobile-filter-content animate-fade-in-up" 
            className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" /> Filter Criteria
                </h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub filters list */}
              <div className="space-y-6">
                
                {/* Category selections */}
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</span>
                  <div className="space-y-1.5">
                    {["Electronics", "Fashion", "Accessories", "Lifestyle", "Beauty"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                        className={`w-full text-left py-2 px-3 rounded-xl text-sm transition-colors flex items-center justify-between ${selectedCategory === cat ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-650 hover:bg-slate-50"}`}
                      >
                        {cat}
                        {selectedCategory === cat && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands dropdown */}
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Brand</span>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    <option value="">All Brands</option>
                    {uniqueBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Range price list */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Max Price</span>
                    <span className="text-sm font-bold text-blue-600">{formatPrice(priceRange)}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="1500"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* In stock / discounts checks */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="w-4.5 h-4.5 rounded text-blue-600"
                    />
                    <span>Available In-Stock Only</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyDiscounts}
                      onChange={(e) => setOnlyDiscounts(e.target.checked)}
                      className="w-4.5 h-4.5 rounded text-blue-600"
                    />
                    <span>Discounts Campaign Items</span>
                  </label>
                </div>

              </div>
            </div>

            {/* Apply operations */}
            <div className="pt-6 border-t border-slate-100 flex gap-4 mt-8">
              <button 
                onClick={handleResetFilters}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-bold transition-all text-center"
              >
                Reset All
              </button>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all text-center"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

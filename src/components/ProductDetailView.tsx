import { useState, useEffect } from "react";
import { 
  Star, Heart, ShoppingCart, ArrowRight, ShieldCheck, Truck, 
  RotateCcw, Info, Sparkles, AlertCircle, Plus, Sparkle 
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { Product } from "../types";
import { formatPrice } from "../utils/currency";

interface ProductDetailViewProps {
  productId: string;
  onViewChange: (view: string, param?: any) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

type TabType = "description" | "specifications" | "reviews" | "faqs";

export default function ProductDetailView({
  productId,
  onViewChange,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}: ProductDetailViewProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<TabType>("description");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [bundleAgreed, setBundleAgreed] = useState(true);

  // Load product based on incoming active state ID
  useEffect(() => {
    const selected = PRODUCTS.find((p) => p.id === productId);
    if (selected) {
      setProduct(selected);
      setSelectedImage(selected.imageUrl);
      setSelectedColor(selected.colors?.[0] || "");
      setSelectedSize(selected.sizes?.[0] || "");
      setQuantity(1);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-slate-900	">Catalog Item Not Found</h3>
        <p className="text-slate-400 text-sm mt-1 mb-6">We could not resolve this product record. Backtrack to our shop view to review modern arrivals.</p>
        <button onClick={() => onViewChange("shop")} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold">
          Return to Shop catalog
        </button>
      </div>
    );
  }

  // Filter 4 related products in same category
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Frequently Bought Together configuration: Pair with another accessory item
  const pairedProduct = PRODUCTS.find((p) => p.id !== product.id && p.category === product.category) || PRODUCTS[0];
  const combinedPrice = product.price + pairedProduct.price;
  const bundleDiscountPercent = 10;
  const bundleTotal = Math.round(combinedPrice * (1 - bundleDiscountPercent / 100));

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    onViewChange("cart");
  };

  const handleAddBundle = () => {
    onAddToCart(product, 1, selectedColor, selectedSize);
    onAddToCart(pairedProduct, 1);
    onViewChange("cart");
  };

  const isWish = wishlistIds.includes(product.id);

  return (
    <div id="product-details-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left">
      
      {/* Breadcrumb row */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-450 tracking-wide mb-8">
        <button onClick={() => onViewChange("home")} className="hover:text-blue-600">HOME</button>
        <span>/</span>
        <button onClick={() => onViewChange("shop")} className="hover:text-blue-600">CATALOG</button>
        <span>/</span>
        <button onClick={() => onViewChange("shop", { category: product.category })} className="hover:text-blue-600 uppercase">{product.category}</button>
        <span>/</span>
        <span className="text-slate-800 uppercase max-w-[200px] truncate">{product.title}</span>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        {/* LEFT COMPONENT: IMAGE GALLERY SYSTEM */}
        <div className="space-y-4">
          <div className="w-full h-[350px] sm:h-[450px] bg-white rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center p-6 relative group shadow-sm">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            
            {/* Discount Stamp */}
            {product.discountPercent && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 rounded-full font-bold text-white text-[10px] tracking-wider uppercase shadow-md shadow-amber-200">
                SAVE {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails Swappable List */}
          {product.additionalImages?.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              <button 
                onClick={() => setSelectedImage(product.imageUrl)}
                className={`w-18 h-18 rounded-2xl overflow-hidden border-2 bg-white shrink-0 transition-all ${selectedImage === product.imageUrl ? "border-blue-600 scale-102 shadow-md" : "border-slate-100 opacity-80"}`}
              >
                <img src={product.imageUrl} className="w-full h-full object-cover" alt="Primary" referrerPolicy="no-referrer" />
              </button>
              {product.additionalImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-18 h-18 rounded-2xl overflow-hidden border-2 bg-white shrink-0 transition-all ${selectedImage === img ? "border-blue-600 scale-102 shadow-md" : "border-slate-100 opacity-80"}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Gallery-thumbnail-${idx}`} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COMPONENT: METRICS AND INVENTORY SPECS */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center text-xs font-mono tracking-widest font-bold text-slate-400 mb-2">
              <span>{product.brand.toUpperCase()}</span>
              <span>SKU CODE: {product.sku}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">{product.title}</h1>

            {/* Ratings, reviews and stock label */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center text-amber-500 bg-amber-55 px-2 py-0.5 rounded-lg text-xs font-extrabold">
                <Star className="w-3.5 h-3.5 fill-current mr-1 text-amber-500 shrink-0" />
                {product.rating}
              </div>
              <span className="text-xs font-semibold text-slate-500">({product.reviewCount} customers bought & verified)</span>
              
              <div className="ml-auto">
                {product.inStock ? (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {product.stockCount} Units Available
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-500 border border-rose-100">
                    Currently Sold Out
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Pricing tier */}
          <div className="p-5 bg-slate-50 rounded-2xl flex items-baseline gap-4">
            <span className="text-3xl font-extrabold text-slate-950">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-slate-400 line-through font-light">{formatPrice(product.originalPrice)}</span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-mono">
                  Save {formatPrice(product.originalPrice - product.price)} Now
                </span>
              </>
            )}
          </div>

          {/* Color selections */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <span className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2.5">Available Tone Accent:</span>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${selectedColor === col ? "border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selections */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <span className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2.5">Choose Size/Dimension:</span>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-11 text-xs font-bold rounded-xl border flex items-center justify-center transition-all ${selectedSize === sz ? "border-blue-600 bg-blue-50 text-blue-700 font-extrabold shadow-sm" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Primary Call-to-actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            {product.inStock && (
              <div className="flex items-center border border-slate-250 rounded-xl overflow-hidden shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 bg-slate-50 hover:bg-slate-100 font-extrabold text-sm border-r border-slate-200"
                >
                  -
                </button>
                <span className="px-5 text-sm font-bold text-slate-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-4 py-3 bg-slate-50 hover:bg-slate-100 font-extrabold text-sm border-l border-slate-200"
                >
                  +
                </button>
              </div>
            )}

            <button
              id="detail-add-to-cart-cta"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className={`flex-grow py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-sm font-extrabold transition-all shadow-md ${product.inStock ? "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/10 cursor-pointer active:scale-98" : "bg-slate-150 text-slate-400 cursor-not-allowed"}`}
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart Basket
            </button>

            <button 
              onClick={() => onToggleWishlist(product.id)}
              className={`p-3.5 rounded-2xl border transition-all shrink-0 cursor-pointer ${isWish ? "border-rose-100 bg-rose-50 text-rose-500" : "border-slate-250 text-slate-550 hover:bg-slate-50"}`}
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWish ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              disabled={!product.inStock}
              onClick={handleBuyNow}
              className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl shadow transition-all uppercase tracking-wide cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              Buy and Checkout Now
            </button>
          </div>

          {/* Quick Support Flags */}
          <div className="grid grid-cols-3 gap-3 border-t border-b border-slate-100 py-4 text-[11px] text-slate-400 font-medium">
            <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-xl">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" /> Fast Overnight
            </div>
            <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-xl">
              <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" /> 30-Day Returns
            </div>
            <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" /> 2-Yr Warranty
            </div>
          </div>

        </div>

      </div>

      {/* METRIC SPECS, DETAILS, REVIEWS TAB LAYOUTS */}
      <section id="product-tabbed-info" className="mt-16 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
        
        {/* Navigation headers */}
        <div className="flex overflow-x-auto gap-8 border-b border-slate-100 pb-2 mb-6">
          <button 
            onClick={() => setSelectedTab("description")}
            className={`pb-3 text-sm font-bold tracking-wide uppercase transition-all relative ${selectedTab === "description" ? "text-blue-600 font-extrabold" : "text-slate-400 hover:text-slate-650"}`}
          >
            Product Story & Features
            {selectedTab === "description" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded"></span>}
          </button>
          <button 
            onClick={() => setSelectedTab("specifications")}
            className={`pb-3 text-sm font-bold tracking-wide uppercase transition-all relative ${selectedTab === "specifications" ? "text-blue-600 font-extrabold" : "text-slate-400 hover:text-slate-650"}`}
          >
            Technical Specifications
            {selectedTab === "specifications" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded"></span>}
          </button>
          <button 
            onClick={() => setSelectedTab("reviews")}
            className={`pb-3 text-sm font-bold tracking-wide uppercase transition-all relative ${selectedTab === "reviews" ? "text-blue-600 font-extrabold" : "text-slate-400 hover:text-slate-650"}`}
          >
            Client Reviews ({product.reviews?.length || 0})
            {selectedTab === "reviews" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded"></span>}
          </button>
          <button 
            onClick={() => setSelectedTab("faqs")}
            className={`pb-3 text-sm font-bold tracking-wide uppercase transition-all relative ${selectedTab === "faqs" ? "text-blue-600 font-extrabold" : "text-slate-400 hover:text-slate-650"}`}
          >
            FAQ Help Guide
            {selectedTab === "faqs" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded"></span>}
          </button>
        </div>

        {/* Tab content bodies */}
        <div className="min-h-[160px]">
          {selectedTab === "description" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed font-light">{product.description}</p>
              <div className="space-y-2.5 pt-4">
                <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">Highlight Features:</span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                  {product.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 animate-pulse" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedTab === "specifications" && (
            <div className="max-w-xl">
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-inner">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="grid grid-cols-3 p-4 text-xs font-semibold">
                    <span className="text-slate-400 uppercase tracking-wider">{spec.label}</span>
                    <span className="col-span-2 text-slate-750 font-bold pl-4">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "reviews" && (
            <div className="space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3 justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
                          {rev.userName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{rev.userName}</h4>
                          <span className="text-[10px] text-slate-400 font-bold">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-500 text-xs font-extrabold bg-amber-50 px-2 py-0.5 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-current shrink-0" /> {rev.rating}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-light leading-relaxed pl-1">{rev.comment}</p>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold text-emerald-600 font-mono tracking-wide uppercase mt-3.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> VERIFIED PURCHASE
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">There are no client reviews compiled yet. Be the first to catalog your feedback!</p>
              )}
            </div>
          )}

          {selectedTab === "faqs" && (
            <div className="space-y-4">
              {product.faqs?.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                    <Info className="w-4 h-4 text-blue-600 shrink-0" /> {faq.question}
                  </h4>
                  <p className="text-xs text-slate-500 pl-5 leading-normal">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

      {/* FREQUENTLY BOUGHT TOGETHER VALUE PACK */}
      <section id="frequently-bought-together" className="mt-16 bg-gradient-to-tr from-blue-50/70 via-indigo-50/20 to-white p-6 sm:p-8 rounded-3xl border border-blue-100/60 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Sparkle className="w-5 h-5 text-amber-500 animate-spin" />
          <h2 className="text-xl font-bold font-heading text-slate-900">Frequently Bought Together Value Bundle</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-semibold">
            {/* Primary Item card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 w-64 max-w-full text-left">
              <img src={product.imageUrl} className="w-12 h-12 rounded object-cover" alt="Primary input" referrerPolicy="no-referrer" />
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 truncate">{product.title}</h4>
                <p className="text-slate-500 mt-0.5">{formatPrice(product.price)}</p>
              </div>
            </div>

            <Plus className="w-5 h-5 text-slate-400" />

            {/* Accessory Item card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 w-64 max-w-full text-left relative">
              <img src={pairedProduct.imageUrl} className="w-12 h-12 rounded object-cover" alt="Accessory pair" referrerPolicy="no-referrer" />
              <div className="min-w-0">
                <span className="text-[8px] tracking-wide text-blue-500 font-bold uppercase block">COMPLEMENTARY ITEM</span>
                <h4 className="font-bold text-slate-900 truncate">{pairedProduct.title}</h4>
                <p className="text-slate-500 mt-0.5">{formatPrice(pairedProduct.price)}</p>
              </div>
            </div>
          </div>

          {/* Bundle calculations card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-w-sm w-full text-left">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Combined Value:</span>
              <span className="line-through">{formatPrice(combinedPrice)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-800">Special Bundle Offer:</span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-blue-600">{formatPrice(bundleTotal)}</span>
                <span className="block text-[8px] text-amber-500 font-mono font-bold tracking-wider">SAVE {bundleDiscountPercent}% TOTAL</span>
              </div>
            </div>
            
            <button
              onClick={handleAddBundle}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 text-center cursor-pointer"
            >
              Add Bundle Pack to Cart
            </button>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section id="related-products-list" className="mt-16">
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-8">Related Premium Discoveries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div 
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="relative pt-[100%] bg-slate-50/50">
                  <img src={item.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-102" alt={item.title} referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => onQuickView(item)}
                    className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md text-slate-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quick View"
                  >
                    <Star className="w-4 h-4 fill-current text-blue-600" />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider font-mono">{item.brand}</span>
                  <h3 
                    onClick={() => onViewChange("product", item.id)}
                    className="text-sm font-bold text-slate-900 truncate hover:text-blue-600 transition-colors cursor-pointer mt-0.5"
                  >
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-bold text-slate-900">{formatPrice(item.price)}</span>
                    <button 
                      onClick={() => onViewChange("product", item.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-500"
                    >
                      View Specs &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

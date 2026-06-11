import { useState } from "react";
import { X, Star, ShoppingCart, Heart, Shield, RefreshCw, Truck } from "lucide-react";
import { Product } from "../types";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  return (
    <div id="quick-view-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        id={`quick-view-card-${product.id}`}
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible animate-fade-in-up"
      >
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Panel */}
        <div className="w-full md:w-1/2 p-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center min-h-[250px] max-h-[350px]">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-md transition-all duration-300 transform hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Thumbnails list */}
          {product.additionalImages?.length > 0 && (
            <div className="flex justify-center gap-3 mt-4 overflow-x-auto py-1">
              <button 
                onClick={() => setSelectedImage(product.imageUrl)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === product.imageUrl ? "border-blue-600 scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={product.imageUrl} className="w-full h-full object-cover" alt="Primary" referrerPolicy="no-referrer" />
              </button>
              {product.additionalImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? "border-blue-600 scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Brand and SKU */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider mb-2">
              <span>{product.brand.toUpperCase()}</span>
              <span>SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-3">{product.title}</h2>

            {/* Ratings and Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                {product.rating}
              </div>
              <span className="text-xs text-slate-500 font-medium">({product.reviewCount} organic reviews)</span>
              {product.inStock ? (
                <span className="ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                  {product.stockCount} left in stock
                </span>
              ) : (
                <span className="ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-500">
                  Sold Out
                </span>
              )}
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-5 p-3 rounded-2xl bg-slate-50">
              <span className="text-3xl font-bold text-slate-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-600">
                    {product.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <span className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Select Accent Tone:</span>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-xl border-1.5 transition-all text-xs font-medium ${selectedColor === col ? "border-blue-600 bg-blue-50/50 text-blue-700 font-semibold" : "border-slate-200 text-slate-650 hover:bg-slate-50"}`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <span className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Select Dimension/Size:</span>
                <div className="flex items-center gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-10 h-10 rounded-xl border-1.5 transition-all text-[11px] font-semibold flex items-center justify-center ${selectedSize === sz ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brief description */}
            <div className="mb-4">
              <span className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">Overview:</span>
              <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Highlights/Features */}
            <div className="mb-5 border-t border-slate-100 pt-3 text-xs text-slate-500 space-y-1">
              {product.features.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold shrink-0">&bull;</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Key Technical specifications */}
            <div className="mb-5 grid grid-cols-2 gap-3 p-3 bg-slate-50/70 rounded-xl text-xs">
              {product.specifications.slice(0, 4).map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium uppercase">{spec.label}</span>
                  <span className="font-semibold text-slate-700 truncate">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Operations */}
          <div className="border-t border-slate-100 pt-4 mt-auto">
            <div className="flex items-center justify-between gap-4">
              
              {/* Quantity selectors */}
              {product.inStock && (
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-slate-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3.5 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Add to Cart CTA */}
              <button
                id="modal-add-to-cart-cta"
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className={`flex-grow py-3 px-6 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-all shadow-md ${product.inStock ? "bg-blue-600 text-white hover:bg-blue-500 cursor-pointer active:scale-98" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
              >
                <ShoppingCart className="w-4 h-4" />
                {product.inStock ? "Add directly to Cart" : "Currently Out of Stock"}
              </button>

              {/* Wishlist toggle */}
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-2xl border transition-all shrink-0 ${isWishlisted ? "border-rose-100 bg-rose-50 text-rose-500" : "border-slate-200 text-slate-450 hover:bg-slate-50"}`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>

            </div>
            
            {/* Quick trust flags */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-slate-400 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Free Shipping $150+
              </div>
              <div className="flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-blue-500 shrink-0" /> 30-Day Free Return
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0" /> 2-Yr Warranty
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

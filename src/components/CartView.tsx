import React, { useState } from "react";
import { 
  Trash2, ShoppingBag, ArrowRight, Percent, ShieldCheck, 
  Truck, ArrowLeft, RefreshCw, Sparkles, Tag 
} from "lucide-react";
import { CartItem, Coupon } from "../types";
import { formatPrice } from "../utils/currency";

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onApplyCoupon: (code: string) => void;
  activeCoupon?: Coupon;
  onViewChange: (view: string, param?: any) => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  activeCoupon,
  onViewChange,
}: CartViewProps) {
  const [couponCodeInput, setCouponCodeInput] = useState("");

  // Calculate cart sums
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const discountAmount = activeCoupon ? Math.round(subtotal * (activeCoupon.discountPercent / 100)) : 0;
  
  // Free Shipping boundary $150+
  const shippingThreshold = 150;
  const isShippingFree = subtotal >= shippingThreshold;
  const shippingCharge = subtotal === 0 ? 0 : isShippingFree ? 0 : 15;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.08); // 8% mock VAT
  const totalAmount = subtotal === 0 ? 0 : subtotal - discountAmount + shippingCharge + taxAmount;

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    onApplyCoupon(couponCodeInput.trim());
    setCouponCodeInput("");
  };

  if (cartItems.length === 0) {
    return (
      <div id="empty-cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6 text-slate-400 border border-slate-200">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-slate-900">Your shopping basket is empty</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto font-light leading-relaxed">
          It looks like you haven&apos;t added any luxury items to your checkout cart. Check out our active seasonal promotions!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => onViewChange("shop")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-md cursor-pointer transition-colors"
          >
            Explore Catalog Arrivals
          </button>
          <button 
            onClick={() => onViewChange("offers")}
            className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer"
          >
            Claim Active Coupons
          </button>
        </div>
      </div>
    );
  }

  // Free shipping balance tracking progress calculation
  const missingForFreeShipping = shippingThreshold - subtotal;
  const freeShippingProgress = Math.min(100, (subtotal / shippingThreshold) * 100);

  return (
    <div id="cart-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left">
      
      {/* Page Title */}
      <div className="mb-8">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono">Your Basket</span>
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 mt-1">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT TWO-COLUMNS: ADDED ITEMS LIST & FREE SHIPPING PROGRESS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Free Shipping Alert & Progress bar */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-left">
            <div className="flex items-start gap-3.5 mb-3.5">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                <Truck className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-sm">
                <h4 className="font-bold text-slate-900">
                  {isShippingFree ? (
                    "Congratulations! Over-night Delivery is 100% Free!"
                  ) : (
                    `Spend ${formatPrice(missingForFreeShipping)} more to unlock Free Over-night Shipping`
                  )}
                </h4>
                <p className="text-slate-400 text-xs mt-0.5 font-light leading-normal">
                  Our regional distribution centers pack and ship overnight once orders clear ₹12,450.
                </p>
              </div>
            </div>
            
            {/* Minimal tracker bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-1">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
            {!isShippingFree && (
              <span className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">{formatPrice(subtotal)} of {formatPrice(150)} limit reached</span>
            )}
          </div>

          {/* Cart items list */}
          <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-100 shadow-sm overflow-hidden">
            {cartItems.map((item) => (
              <div 
                key={item.product.id}
                id={`cart-item-${item.product.id}`}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
              >
                {/* Media thumbnail */}
                <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-slate-100">
                  <img src={item.product.imageUrl} className="max-h-full max-w-full object-contain" alt={item.product.title} />
                </div>

                {/* Details layout */}
                <div className="flex-grow text-left">
                  <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">{item.product.brand}</span>
                  <h3 
                    onClick={() => onViewChange("product", item.product.id)}
                    className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors mt-0.5 cursor-pointer line-clamp-1"
                  >
                    {item.product.title}
                  </h3>
                  
                  {/* Selected configurations badges */}
                  <div className="flex gap-2.5 mt-2">
                    {item.selectedColor && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        Color: {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        Size: {item.selectedSize}
                      </span>
                    )}
                  </div>
                </div>

                {/* Counter & Pricing */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50 shrink-0">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden scale-90">
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold text-slate-800">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.stockCount, item.quantity + 1))}
                      className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="block text-sm font-bold text-slate-900">{formatPrice(item.product.price * item.quantity)}</span>
                    {item.quantity > 1 && (
                      <span className="block text-[10px] text-slate-400 font-medium">({formatPrice(item.product.price)} each)</span>
                    )}
                  </div>

                  <button 
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          <button 
            onClick={() => onViewChange("shop")}
            className="inline-flex items-center gap-1.5 py-2 px-3 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>

        </div>

        {/* RIGHT ONE-COLUMN: PRICE SUMMARY & PROMO INPUTS */}
        <div className="space-y-6">
          
          {/* Active Promo input panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left">
            <h3 className="font-bold text-sm text-slate-900 mb-3.5 flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-amber-500" /> Apply Corporate Coupons
            </h3>
            <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
              <input
                id="cart-coupon-field"
                type="text"
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value)}
                placeholder="SOLSTICE40"
                className="flex-grow py-2 px-3 text-xs border border-slate-200 outline-none focus:border-blue-500 rounded-xl"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
              >
                Apply
              </button>
            </form>

            {/* Active Coupon Code indicator */}
            {activeCoupon && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <div className="font-semibold text-emerald-800 leading-none">
                    <span>{activeCoupon.code} applied</span>
                    <span className="block text-[10px] text-emerald-600 font-medium font-sans mt-0.5">{activeCoupon.discountPercent}% Price Slashed</span>
                  </div>
                </div>
                <button 
                  onClick={() => onApplyCoupon("")} 
                  className="p-1 rounded bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label="Remove coupon"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0 text-slate-400 hover:text-rose-600" />
                </button>
              </div>
            )}
          </div>

          {/* Checkout total box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-left space-y-4">
            <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">Order Estimation Sum</h3>
            
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {activeCoupon && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Deduction ({activeCoupon.discountPercent}%):</span>
                  <span>-${formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Over-night shipping:</span>
                <span>{shippingCharge === 0 ? "FREE" : formatPrice(shippingCharge)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated VAT Tax (8%):</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-slate-900">
              <span className="text-sm font-bold">Total Estimated:</span>
              <span className="text-2xl font-extrabold text-blue-600">{formatPrice(totalAmount)}</span>
            </div>

            {/* Checkout CTA triggers */}
            <button
              id="cart-checkout-direct-btn"
              onClick={() => onViewChange("checkout")}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-blue-500/10 active:scale-98 cursor-pointer mt-6"
            >
              Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee notes */}
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl text-[10px] text-slate-400 mt-2">
              <ShieldCheck className="w-4.5 h-4.5 text-blue-600 shrink-0" />
              <span>Full SSL layered payments routing securely with Zentrova standard locks.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

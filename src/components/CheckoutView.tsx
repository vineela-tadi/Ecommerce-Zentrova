import { useState } from "react";
import { 
  Check, CreditCard, ShieldCheck, Mail, MapPin, 
  Truck, ArrowRight, ArrowLeft, Star, ShoppingBag, Eye, Award 
} from "lucide-react";
import { CartItem, Coupon, Order, UserProfile } from "../types";
import { formatPrice } from "../utils/currency";

interface CheckoutViewProps {
  cartItems: CartItem[];
  activeCoupon?: Coupon;
  user: UserProfile;
  onClearCart: () => void;
  onAddOrder: (order: Order) => void;
  onViewChange: (view: string, param?: any) => void;
}

export default function CheckoutView({
  cartItems,
  activeCoupon,
  user,
  onClearCart,
  onAddOrder,
  onViewChange,
}: CheckoutViewProps) {
  // Step tracker
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Address State
  const [shippingAddress, setShippingAddress] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    street: user.addresses[0]?.street || "",
    city: user.addresses[0]?.city || "",
    state: user.addresses[0]?.state || "",
    zipCode: user.addresses[0]?.zipCode || "",
  });

  // Delivery state
  const [deliveryMethod, setDeliveryMethod] = useState<"overnight" | "standard" | "economy">("overnight");

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "**** **** **** 4242",
    expiry: "12/28",
    cvv: "***",
    cardHolder: user.name,
  });

  // Calculations
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const discountAmount = activeCoupon ? Math.round(subtotal * (activeCoupon.discountPercent / 100)) : 0;
  
  const deliveryCharges = {
    overnight: subtotal >= 150 ? 0 : 25,
    standard: subtotal >= 150 ? 0 : 15,
    economy: 0,
  };
  const shippingCharge = deliveryCharges[deliveryMethod];
  const taxAmount = Math.round((subtotal - discountAmount) * 0.08); // 8% mock VAT
  const totalAmount = subtotal - discountAmount + shippingCharge + taxAmount;

  // Final Order placement details
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const handleNextStep = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as any);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  const handlePlaceOrder = () => {
    const generatedId = "ZT-" + Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = "ZV-TRK" + Math.floor(1000000 + Math.random() * 9000000);
    
    // Create new Order struct
    const newOrder: Order = {
      id: generatedId,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      items: cartItems.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
      subtotal,
      discount: discountAmount,
      shipping: shippingCharge,
      total: totalAmount,
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
      },
      paymentMethod: paymentMethod === "card" ? "Credit Card ending 4242" : paymentMethod === "upi" ? "UPI account" : "Cash on Delivery",
      trackingNumber,
    };

    onAddOrder(newOrder); // Register order to memory state
    setPlacedOrder(newOrder);
    onClearCart(); // Clear active basket
    setStep(5); // Advance to absolute success layout
  };

  return (
    <div id="checkout-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left">
      
      {/* Title block */}
      <div className="mb-8">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono">Operations Pipeline</span>
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 mt-1">Zentrova Check-out</h1>
      </div>

      {step < 5 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT TWO COLS: ACQUISITION STAGES */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step Indicators row */}
            <div className="grid grid-cols-4 gap-2 bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
              {[1, 2, 3, 4].map((num) => (
                <div 
                  key={num}
                  className={`py-2 text-center rounded-xl text-xs font-bold transition-all ${
                    step === num 
                      ? "bg-blue-600 text-white" 
                      : step > num 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                        : "bg-slate-50 text-slate-400"
                  }`}
                >
                  <span className="hidden sm:inline">Step {num}: </span>
                  {num === 1 && "Address"}
                  {num === 2 && "Transit"}
                  {num === 3 && "Billing"}
                  {num === 4 && "Review"}
                </div>
              ))}
            </div>

            {/* STEP 1: SHIPPING ADDRESS */}
            {step === 1 && (
              <div id="checkout-step-1" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <MapPin className="w-5 h-5 text-blue-600" /> 1. Shipping Destination Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="space-y-1">
                    <label className="text-slate-400">Recipient Legal Name</label>
                    <input
                      type="text"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      className="w-full py-2.5 px-3 border border-slate-200 focus:border-blue-500 rounded-xl outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Recipient Phone Contact</label>
                    <input
                      type="text"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full py-2.5 px-3 border border-slate-200 focus:border-blue-500 rounded-xl outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-slate-400">Street Address / Building / Chamber</label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full py-2.5 px-3 border border-slate-200 focus:border-blue-500 rounded-xl outline-none"
                      placeholder="Line 1"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full py-2.5 px-3 border border-slate-200 focus:border-blue-500 rounded-xl outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">State / Region</label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full py-2.5 px-3 border border-slate-200 focus:border-blue-500 rounded-xl outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Postal Zip Index</label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="w-full py-2.5 px-3 border border-slate-200 focus:border-blue-500 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleNextStep}
                    disabled={!shippingAddress.street || !shippingAddress.city}
                    className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow disabled:bg-slate-200 disabled:text-slate-400"
                  >
                    Continue to Transit options <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: TRANSIT DELIVERIES */}
            {step === 2 && (
              <div id="checkout-step-2" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Truck className="w-5 h-5 text-blue-600" /> 2. Selected Delivery Speed
                </h3>

                <div className="space-y-3">
                  {[
                    { key: "overnight", title: "Zentrova Overnight Express", charge: deliveryCharges.overnight, desc: "Arives tomorrow morning before noon. Speed-compiled and packed." },
                    { key: "standard", title: "Standard Ground Delivery", charge: deliveryCharges.standard, desc: "Delivered within 2 - 3 business days, fully traceable." },
                    { key: "economy", title: "Economy Shipping (No cost)", charge: 0, desc: "Delivered within 5 - 7 business days via global logistics layers." },
                  ].map((option) => (
                    <label 
                      key={option.key} 
                      onClick={() => setDeliveryMethod(option.key as any)}
                      className={`p-4 rounded-2xl border-1.5 flex items-start gap-3.5 cursor-pointer transition-all ${deliveryMethod === option.key ? "border-blue-600 bg-blue-50/20" : "border-slate-200"}`}
                    >
                      <input
                        type="radio"
                        checked={deliveryMethod === option.key}
                        onChange={() => {}}
                        className="w-4.5 h-4.5 text-blue-600 mt-1"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <h4 className="font-extrabold text-sm text-slate-900">{option.title}</h4>
                          <span className="text-sm font-extrabold text-slate-900">
                            {option.charge === 0 ? "FREE" : formatPrice(option.charge)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-405 leading-normal mt-1 font-light">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={handlePrevStep} className="py-2.5 px-4 text-xs font-extrabold text-slate-500 hover:text-slate-800 flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Destination
                  </button>
                  <button onClick={handleNextStep} className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow">
                    Continue to Payment Routing <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: BILLING INFO */}
            {step === 3 && (
              <div id="checkout-step-3" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <CreditCard className="w-5 h-5 text-blue-600" /> 3. Verified Billing Channel
                </h3>

                <div className="flex gap-4 border-b border-slate-100 pb-4">
                  {[
                    { key: "card", title: "Credit Card / Banks" },
                    { key: "upi", title: "UPI Payment Mode" },
                    { key: "cod", title: "Cash On Delivery (COD)" },
                  ].map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setPaymentMethod(m.key as any)}
                      className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${paymentMethod === m.key ? "bg-blue-600 text-white shadow" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
                    >
                      {m.title}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-slate-400">Cardholder Legal Name</label>
                      <input
                        type="text"
                        value={cardInfo.cardHolder}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardHolder: e.target.value })}
                        className="w-full py-2.5 px-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Card Index Number</label>
                      <input
                        type="text"
                        value={cardInfo.cardNumber}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                        className="w-full py-2.5 px-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-400">Expiration</label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="w-full py-2.5 px-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400">CVC CVV</label>
                        <input
                          type="text"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="w-full py-2.5 px-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-2 text-xs font-semibold max-w-sm">
                    <label className="text-slate-400">Enter your UPI VPA Address</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="zentrova@ybl"
                        className="w-full py-2.5 px-3 border border-slate-200 rounded-xl outline-none"
                      />
                      <button type="button" className="px-4 py-2 bg-slate-900 rounded-xl text-white font-bold">Verify ID</button>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-2.5 text-xs text-amber-700 leading-relaxed font-semibold">
                    <Check className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Cash on Delivery active. Please prepare standard cash value matching final summation values at doorstep. Standard shipping charge limits apply.</span>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button onClick={handlePrevStep} className="py-2.5 px-4 text-xs font-extrabold text-slate-500 hover:text-slate-800 flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Transit Speed
                  </button>
                  <button onClick={handleNextStep} className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow">
                    Continue to Order recap <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL RECO REVIEWS */}
            {step === 4 && (
              <div id="checkout-step-4" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
                  4. Review Order & Confirm Submission
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-left">
                  <div className="space-y-1.5 p-4 bg-slate-50 rounded-2xl">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Destination Address</span>
                    <p className="font-extrabold text-slate-900">{shippingAddress.name}</p>
                    <p className="text-slate-500">{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                    <p className="text-slate-500">Contact: {shippingAddress.phone}</p>
                  </div>
                  <div className="space-y-1.5 p-4 bg-slate-50 rounded-2xl">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payment Channel & Shipping</span>
                    <p className="font-semibold text-slate-700">Billing: <span className="font-extrabold text-slate-900 uppercase">{paymentMethod}</span></p>
                    <p className="font-semibold text-slate-700">Transit Courier: <span className="font-extrabold text-slate-900 uppercase">{deliveryMethod}</span></p>
                    <p className="text-slate-500 italic mt-2">Verified securely under SSL locks</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-50">
                  <button onClick={handlePrevStep} className="py-2.5 px-4 text-xs font-extrabold text-slate-500 hover:text-slate-800 flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Payment Detail
                  </button>
                  <button 
                    onClick={handlePlaceOrder} 
                    className="py-3 px-8 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Place Verified Order Now
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT ONE-COLUMN: ESTIMATE BASKET SUMMARY */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left font-sans space-y-4">
            <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-50">Estimated Item list ({cartItems.length})</h3>
            
            <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-3 text-xs items-center">
                  <img src={item.product.imageUrl} className="w-9 h-9 rounded bg-slate-50 object-cover" alt="recap" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">{item.product.title}</h4>
                    <p className="text-slate-450 mt-0.5">Qty: {item.quantity} &bull; {formatPrice(item.product.price)}</p>
                  </div>
                  <span className="font-bold text-slate-800 shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-slate-500">
                <span>Basket Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {activeCoupon && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon {activeCoupon.code}:</span>
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

            <div className="border-t border-slate-150 pt-4 flex justify-between items-center text-slate-900">
              <span className="text-xs font-bold text-slate-500">Total Sum:</span>
              <span className="text-xl font-extrabold text-blue-600">{formatPrice(totalAmount)}</span>
            </div>
          </div>

        </div>
      ) : (
        
        /* ORDER ABSOLUTE SUCCESS LAYOUT */
        <div id="checkout-success" className="max-w-xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl text-center space-y-6 animate-fade-in-up">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-100">
            <Check className="w-6 h-6" />
          </div>
          
          <div className="space-y-1">
            <span className="text-emerald-600 text-xs font-extrabold tracking-wider uppercase font-mono">Verified Order Success</span>
            <h2 className="text-2xl font-bold font-heading text-slate-900">Thank you for your purchase!</h2>
            <p className="text-slate-400 text-sm font-light">Your order has been compiled and is on its way to your destination.</p>
          </div>

          {placedOrder && (
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2 text-xs text-left font-sans">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400 uppercase font-bold">Order ID:</span>
                <span className="font-extrabold text-slate-900">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400 uppercase font-bold">Transit Tracking Index:</span>
                <span className="font-semibold text-slate-700">{placedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400 uppercase font-bold">Total Paid Amount:</span>
                <span className="font-extrabold text-blue-600">{formatPrice(placedOrder.total)}</span>
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => onViewChange("dashboard")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-md cursor-pointer transition-colors"
            >
              Track Order inside Dashboard
            </button>
            <button 
              onClick={() => onViewChange("shop")}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-705 rounded-xl text-sm font-semibold cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono pt-4 border-t border-slate-100">
            <ShieldCheck className="w-4 h-4 text-slate-400" /> SECURED DATA PROTECTED
          </div>
        </div>
      )}

    </div>
  );
}

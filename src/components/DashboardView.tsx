import React, { useState } from "react";
import { 
  User, MapPin, Heart, ShoppingBag, Eye, Check, 
  Trash2, ShieldCheck, Mail, Phone, Award, Package, Clock, Truck 
} from "lucide-react";
import { Product, Order, UserProfile } from "../types";
import { PRODUCTS } from "../data/products";
import { formatPrice } from "../utils/currency";

interface DashboardViewProps {
  user: UserProfile;
  orders: Order[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateUserProfile: (updatedUser: UserProfile) => void;
  onViewChange: (view: string, param?: any) => void;
  onQuickView: (product: Product) => void;
}

type TabType = "orders" | "wishlist" | "profile" | "addresses";

export default function DashboardView({
  user,
  orders,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onUpdateUserProfile,
  onViewChange,
  onQuickView,
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("orders");

  // Profile Form States
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profilePhone, setProfilePhone] = useState(user.phone);

  // Address States
  const [addresses, setAddresses] = useState(user.addresses);
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // Resolve Wishlisted product items
  const wishlistItems = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserProfile({
      ...user,
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      addresses,
    });
    alert("Success: Your profile details have been securely synchronized with our backend servers.");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newState || !newZip) return;
    const added = [
      ...addresses,
      {
        id: "addr-" + Date.now(),
        street: newStreet,
        city: newCity,
        state: newState,
        zipCode: newZip,
        isDefault: addresses.length === 0,
      }
    ];
    setAddresses(added);
    onUpdateUserProfile({ ...user, addresses: added });
    
    // reset form fields
    setNewStreet("");
    setNewCity("");
    setNewState("");
    setNewZip("");
    setIsAddingAddress(false);
  };

  const handleRemoveAddress = (addressId: string) => {
    const updated = addresses.filter((a) => a.id !== addressId);
    setAddresses(updated);
    onUpdateUserProfile({ ...user, addresses: updated });
  };

  const getOrderStatusColor = (status: string) => {
    if (status === "Delivered") return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    if (status === "Shipped") return "bg-blue-50 text-blue-600 border border-blue-100";
    return "bg-amber-50 text-amber-600 border border-amber-100";
  };

  return (
    <div id="dashboard-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left">
      
      {/* Dashboard Top welcome board */}
      <section id="user-welcome-card" className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden mb-10 shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-650/15 rounded-full blur-3xl"></div>
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-18 h-18 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center font-extrabold text-2xl text-white">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/25 rounded-md text-[10px] font-bold tracking-wider font-mono">
              <Award className="w-3 h-3 text-blue-400" /> ZENTROVA PREMIUM MEMBER
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">Welcome back, {user.name}</h2>
            <p className="text-slate-400 text-xs font-light">Monitor active transits, claim wishlist discounts, and update billing parameters.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDE BAR NAVIGATION */}
        <aside className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2 shrink-0 self-start">
          {[
            { key: "orders", title: "Orders & Transits", count: orders.length, icon: Package },
            { key: "wishlist", title: "My Wishlist", count: wishlistIds.length, icon: Heart },
            { key: "profile", title: "Profile Security", count: null, icon: User },
            { key: "addresses", title: "Delivery Addresses", count: addresses.length, icon: MapPin },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`w-full py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between text-left ${isSelected ? "bg-blue-600 text-white font-extrabold shadow-md" : "text-slate-650 hover:bg-slate-50"}`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent className="w-4.5 h-4.5 shrink-0" />
                  <span>{tab.title}</span>
                </div>
                {tab.count !== null && (
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* WORK CONTENT CONTAINER */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: ORDERS & TRANSITS */}
          {activeTab === "orders" && (
            <div id="dashboard-tab-orders" className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-4">Your Purchases & Tracking Log</h3>
              
              {orders.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-105 shadow-sm text-center max-w-sm mx-auto">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h4 className="font-bold text-slate-900 mb-1">No Orders Logged</h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">You haven&apos;t completed any checkout flows yet. Browse our signature collections today!</p>
                  <button onClick={() => onViewChange("shop")} className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow cursor-pointer">
                    Start Shopping &rarr;
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => {
                    const progress = order.status === "Delivered" ? 100 : order.status === "Shipped" ? 65 : 30;
                    return (
                      <div 
                        key={order.id}
                        id={`order-log-${order.id}`}
                        className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-5 text-left"
                      >
                        
                        {/* Summary details row */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                          <div className="text-xs space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">ORDER ID CODE</span>
                            <h4 className="font-extrabold text-sm text-slate-900">{order.id}</h4>
                          </div>
                          <div className="text-xs space-y-1 text-center sm:text-left">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Date Placed</span>
                            <p className="font-semibold text-slate-700">{order.date}</p>
                          </div>
                          <div className="text-xs space-y-1 text-right">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Charge Sum</span>
                            <p className="font-extrabold text-blue-600">{formatPrice(order.total)}</p>
                          </div>

                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${getOrderStatusColor(order.status)}`}>
                            {order.status}
                          </div>
                        </div>

                        {/* Shipment timeline graphics */}
                        <div className="space-y-4 py-2">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                            <span className={progress >= 30 ? "text-blue-600 font-bold" : ""}>
                              <Clock className="w-4 h-4 inline-block mr-1 shrink-0" /> Processing
                            </span>
                            <span className={progress >= 65 ? "text-blue-600 font-bold" : ""}>
                              <Truck className="w-4 h-4 inline-block mr-1 shrink-0" /> Out for Transit
                            </span>
                            <span className={progress >= 100 ? "text-emerald-600 font-bold" : ""}>
                              <Check className="w-4 h-4 inline-block mr-1 shrink-0" /> Delivered Safe
                            </span>
                          </div>
                          
                          {/* tracker timeline container */}
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-7000 ${order.status === "Delivered" ? "bg-emerald-500" : "bg-blue-600"}`} 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-405">
                            <span>TRANSIT CODE: {order.trackingNumber}</span>
                            <span>Destination: {order.shippingAddress.city}, {order.shippingAddress.state}</span>
                          </div>
                        </div>

                        {/* Order items nested preview */}
                        <div className="bg-slate-50 rounded-2xl p-4 divide-y divide-slate-150 text-xs">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between py-2 first:pt-0 last:pb-0 items-center">
                              <div className="text-left font-semibold text-slate-800">
                                {it.title}
                                {it.selectedColor && (
                                  <span className="text-[10px] font-medium text-slate-400 ml-1">({it.selectedColor})</span>
                                )}
                              </div>
                              <div className="font-mono text-slate-500 shrink-0">
                                {it.quantity} x {formatPrice(it.price)}
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY WISHLIST */}
          {activeTab === "wishlist" && (
            <div id="dashboard-tab-wishlist">
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-6">Saved Item Collection</h3>
              
              {wishlistItems.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-110 shadow-sm text-center max-w-sm mx-auto">
                  <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h4 className="font-bold text-slate-900 mb-1">Wishlist is Empty</h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">You haven&apos;t registered any items yet. Bookmark products from the catalog view.</p>
                  <button onClick={() => onViewChange("shop")} className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow cursor-pointer">
                    Explore Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((p) => (
                    <div 
                      key={p.id}
                      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-transform flex flex-col justify-between"
                    >
                      <div className="relative pt-[100%] bg-slate-50/50">
                        <img src={p.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-102" alt={p.title} referrerPolicy="no-referrer" />
                        
                        {/* Remove from wishlist */}
                        <button
                          onClick={() => onToggleWishlist(p.id)}
                          className="absolute top-2.5 right-2.5 p-2 bg-rose-500 text-white rounded-full shadow-md"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-4 text-left flex-grow flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase font-bold font-mono tracking-wider">{p.brand}</span>
                          <h4 
                            onClick={() => onViewChange("product", p.id)}
                            className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer mt-0.5 truncate"
                          >
                            {p.title}
                          </h4>
                          <span className="text-sm font-extrabold text-blue-600 mt-1 block">{formatPrice(p.price)}</span>
                        </div>

                        <div className="flex gap-2 pt-3 border-t border-slate-50 mt-4">
                          <button
                            onClick={() => onQuickView(p)}
                            className="p-2 border border-slate-205 text-slate-650 rounded-xl hover:bg-slate-50 cursor-pointer"
                            title="Quick view details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onAddToCart(p, 1)}
                            className="flex-grow py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                          >
                            Add to Basket
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE SECURITY */}
          {activeTab === "profile" && (
            <div id="dashboard-tab-profile" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-bold font-heading text-slate-900 pb-3 border-b border-slate-100">Profile Security Details</h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs font-semibold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-450">Legal Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full py-2.5 pl-10 pr-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-455">Primary Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full py-2.5 pl-10 pr-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-450">Telephone Contact</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full py-2.5 pl-10 pr-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-50">
                  <button 
                    type="submit"
                    className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    Save & Synchronize Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: ADDRESSES */}
          {activeTab === "addresses" && (
            <div id="dashboard-tab-addresses" className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-xl font-bold font-heading text-slate-900">Registered Addresses</h3>
                <button 
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="py-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-sm"
                >
                  {isAddingAddress ? "Cancel" : "Add New Location"}
                </button>
              </div>

              {/* Add form toggler */}
              {isAddingAddress && (
                <form onSubmit={handleAddAddress} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 text-xs font-semibold animate-fade-in-up">
                  <h4 className="font-bold text-sm text-slate-900">New Destination Parameters</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-slate-400">Street / Suite / Chamber</label>
                      <input
                        type="text"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        placeholder="Suite 500"
                        className="w-full py-2 px-3 border border-slate-200 rounded-xl bg-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-slate-405">City</label>
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full py-2 px-3 border border-slate-200 rounded-xl bg-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">State / Region</label>
                      <input
                        type="text"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="w-full py-2 px-3 border border-slate-200 rounded-xl bg-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Postal Zip Code</label>
                      <input
                        type="text"
                        value={newZip}
                        onChange={(e) => setNewZip(e.target.value)}
                        className="w-full py-2 px-3 border border-slate-200 rounded-xl bg-white outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="submit" className="py-2 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer">
                      Save Location
                    </button>
                  </div>
                </form>
              )}

              {/* Addresses List display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm relative flex flex-col justify-between"
                  >
                    <div className="space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 bg-blue-50 border border-blue-105 text-blue-600 rounded text-[9px] font-extrabold tracking-wider uppercase font-mono">
                            DEFAULT DESTINATION
                          </span>
                        )}
                      </div>
                      <p className="font-extrabold text-slate-900 pt-2">{user.name}</p>
                      <p className="text-slate-500 font-medium leading-normal">{addr.street}, {addr.city}, {addr.state} {addr.zipCode}</p>
                    </div>

                    <div className="pt-4 flex justify-end border-t border-slate-50 mt-5">
                      <button 
                        onClick={() => handleRemoveAddress(addr.id)}
                        className="text-[10px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

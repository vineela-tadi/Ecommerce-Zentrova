import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ShopView from "./components/ShopView";
import ProductDetailView from "./components/ProductDetailView";
import OffersView from "./components/OffersView";
import CartView from "./components/CartView";
import CheckoutView from "./components/CheckoutView";
import DashboardView from "./components/DashboardView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import AiChatbot from "./components/AiChatbot";
import QuickViewModal from "./components/QuickViewModal";

import { Product, CartItem, Order, UserProfile, Coupon } from "./types";
import { PRODUCTS, OFFERS } from "./data/products";

export default function App() {
  // 1. ROUTING STATES
  const [currentView, setCurrentView] = useState<string>("home");
  const [activeProductId, setActiveProductId] = useState<string>("p1");
  const [shopFilters, setShopFilters] = useState<{ search?: string; category?: string }>({});

  // 2. CORE STORAGE E-COMMERCE STATES
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(["p1", "p3"]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | undefined>(undefined);
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // 3. SECURE REGISTERED USER PROFILE STATE
  const [user, setUser] = useState<UserProfile>({
    name: "James Sterling",
    email: "james.sterling@zentrova.club",
    phone: "+1 (555) 019-2831",
    addresses: [
      {
        id: "addr-1",
        label: "Primary Residence",
        street: "742 Evergreen Plaza, Penthouse B",
        city: "New York",
        state: "NY",
        zipCode: "10021",
        isDefault: true,
      }
    ],
    paymentMethods: [
      {
        id: "pm-1",
        type: "Card",
        label: "Visa ending in 4242",
        expiry: "12/28",
        isDefault: true
      }
    ],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    loyaltyPoints: 450,
  });

  // 4. VERIFIED HISTORIC ORDERS STATE
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ZT-804192",
      date: "2026-06-08",
      status: "Delivered",
      items: [
        {
          productId: "p1",
          title: "Aethera Chroma ANC Headphones",
          price: 299,
          quantity: 1,
          selectedColor: "Midnight Charcoal",
          selectedSize: "Standard",
        }
      ],
      subtotal: 299,
      discount: 0,
      shipping: 0,
      total: 323,
      shippingAddress: {
        street: "742 Evergreen Plaza, Penthouse B",
        city: "New York",
        state: "NY",
        zipCode: "10021",
      },
      paymentMethod: "Credit Card ending 4242",
      trackingNumber: "ZV-TRK9048123"
    },
    {
      id: "ZT-509182",
      date: "2026-06-10",
      status: "Shipped",
      items: [
        {
          productId: "p3",
          title: "Sloane Acetate Sunglasses",
          price: 180,
          quantity: 1,
          selectedColor: "Honey Tortoise",
          selectedSize: "Medium",
        }
      ],
      subtotal: 180,
      discount: 20,
      shipping: 0,
      total: 173,
      shippingAddress: {
        street: "742 Evergreen Plaza, Penthouse B",
        city: "New York",
        state: "NY",
        zipCode: "10021",
      },
      paymentMethod: "Credit Card ending 4242",
      trackingNumber: "ZV-TRK2049103"
    }
  ]);

  // Load and sync cache of cart items from client localStorage to persist user choices
  useEffect(() => {
    const cachedCart = localStorage.getItem("zentrova_cart");
    const cachedWish = localStorage.getItem("zentrova_wishlist");
    if (cachedCart) {
      try {
        setCartItems(JSON.parse(cachedCart));
      } catch (e) {
        console.error("Cart cache invalid", e);
      }
    }
    if (cachedWish) {
      try {
        setWishlistIds(JSON.parse(cachedWish));
      } catch (e) {
        console.error("Wishlist cache invalid", e);
      }
    }
  }, []);

  const saveCartCache = (items: CartItem[]) => {
    localStorage.setItem("zentrova_cart", JSON.stringify(items));
  };

  const saveWishCache = (ids: string[]) => {
    localStorage.setItem("zentrova_wishlist", JSON.stringify(ids));
  };

  // 5. CALLBACK HANDLERS
  const handleAddToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedColor === color && 
          item.selectedSize === size
      );

      let updated: CartItem[];
      if (existingIdx > -1) {
        updated = [...prev];
        updated[existingIdx].quantity += quantity;
      } else {
        updated = [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }

      saveCartCache(updated);
      return updated;
    });

    // Elegant toast or trigger alert feedback
    const variantStr = (color || size) ? ` (${[color, size].filter(Boolean).join(" / ")})` : "";
    alert(`Added: ${quantity} x ${product.title}${variantStr} successfully joined your shopping basket.`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      saveCartCache(updated);
      return updated;
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      saveCartCache(updated);
      return updated;
    });
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const isWish = prev.includes(productId);
      const updated = isWish 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId];
      
      saveWishCache(updated);
      return updated;
    });
  };

  const handleApplyCoupon = (code: string) => {
    if (!code) {
      setActiveCoupon(undefined);
      return;
    }
    const matched = OFFERS.find((o) => o.couponCode.toLowerCase() === code.toLowerCase());
    if (matched) {
      setActiveCoupon({
        code: matched.couponCode,
        discountPercent: matched.discountPercent,
      });
    } else {
      alert("Invalid Code: This coupon is unrecognized or has expired.");
    }
  };

  const handleAddOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("zentrova_cart");
  };

  const handleUpdateUserProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  // State-driven routing router switch
  const handleViewChange = (view: string, param?: any) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (view === "product" && typeof param === "string") {
      setActiveProductId(param);
    }

    if (view === "shop" && param) {
      setShopFilters(param);
    } else if (view === "shop") {
      setShopFilters({});
    }
  };

  const activeProduct = PRODUCTS.find((p) => p.id === activeProductId) || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* GLOBAL NAVBAR HEADER */}
      <Navbar 
        currentView={currentView}
        onViewChange={handleViewChange}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        wishlistCount={wishlistIds.length}
        user={user}
      />

      {/* CENTRAL SWITCHED ROUTER STAGE */}
      <main className="flex-grow">
        
        {currentView === "home" && (
          <HomeView 
            onViewChange={handleViewChange}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === "shop" && (
          <ShopView 
            initialSearch={shopFilters.search}
            initialCategory={shopFilters.category}
            onViewChange={handleViewChange}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === "product" && (
          <ProductDetailView 
            productId={activeProductId}
            onViewChange={handleViewChange}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === "offers" && (
          <OffersView 
            onApplyCoupon={handleApplyCoupon}
            activeCouponCode={activeCoupon?.code}
            onViewChange={handleViewChange}
          />
        )}

        {currentView === "cart" && (
          <CartView 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onApplyCoupon={handleApplyCoupon}
            activeCoupon={activeCoupon}
            onViewChange={handleViewChange}
          />
        )}

        {currentView === "checkout" && (
          <CheckoutView 
            cartItems={cartItems}
            activeCoupon={activeCoupon}
            user={user}
            onClearCart={handleClearCart}
            onAddOrder={handleAddOrder}
            onViewChange={handleViewChange}
          />
        )}

        {currentView === "dashboard" && (
          <DashboardView 
            user={user}
            orders={orders}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onUpdateUserProfile={handleUpdateUserProfile}
            onViewChange={handleViewChange}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === "about" && <AboutView />}

        {currentView === "contact" && <ContactView />}

      </main>

      {/* FLOAT SMART CONVERSATIONAL AI ASSISTANT ZENE */}
      <AiChatbot 
        currentPage={currentView}
        currentProduct={currentView === "product" ? activeProduct : undefined}
        cartItems={cartItems}
        onViewChange={handleViewChange}
        onAddToCart={handleAddToCart}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* QUICK VIEW DETAILS PORTAL OVERLAY */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(quickViewProduct.id)}
        />
      )}

      {/* GLOBAL FOOTER FOOTNOTE */}
      <Footer 
        onViewChange={handleViewChange} 
        onSubscribe={(email) => {
          alert(`Subscribed: ${email} has been successfully added to our premium newsletter newsletter list!`);
        }}
      />

    </div>
  );
}

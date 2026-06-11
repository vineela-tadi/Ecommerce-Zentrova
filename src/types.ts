export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  verified: boolean;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: "Electronics" | "Fashion" | "Accessories" | "Lifestyle" | "Beauty";
  subCategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  additionalImages: string[];
  description: string;
  features: string[];
  specifications: Specification[];
  sku: string;
  inStock: boolean;
  stockCount: number;
  colors?: string[];
  sizes?: string[]; // e.g. ["S", "M", "L"] or dimensions
  discountPercent?: number;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  isTrending?: boolean;
  reviews: Review[];
  faqs: { question: string; answer: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  minPurchase?: number;
  expiryDate: string;
}

export interface UserProfile {
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  addresses: {
    id: string;
    label: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }[];
  paymentMethods: {
    id: string;
    type: "Card" | "UPI" | "Wallet";
    label: string;
    expiry?: string;
    isDefault: boolean;
  }[];
  loyaltyPoints: number;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
}

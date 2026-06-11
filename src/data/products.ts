import { Product } from "../types";

export const PRODUCTS: Product[] = [
  // ELECTRONICS
  {
    id: "elec-1",
    title: "Aethera ANC Wireless Headphones",
    brand: "Zentrova Sound",
    category: "Electronics",
    subCategory: "Headphones",
    price: 249,
    originalPrice: 349,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 312,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Experience absolute acoustic perfection. The Aethera headphones combine next-generation Hybrid Active Noise Cancellation (38dB depth) with custom-tuned 40mm bio-cellulose drivers for rich bass and crystal-clear highs.",
    features: [
      "Advanced Hybrid Active Noise Cancelling up to 38dB",
      "Up to 55-hour Battery Life with Speed Charge (10 mins = 5 hrs)",
      "Premium memory-foam protein leather ear cushions",
      "High-Resolution Wireless Audio certification",
      "Multi-point connection for seamless output swapping"
    ],
    specifications: [
      { label: "Driver Size", value: "40 mm Bio-Cellulose" },
      { label: "Frequency Range", value: "4Hz - 40kHz (Hi-Res)" },
      { label: "Bluetooth Version", value: "Bluetooth 5.3" },
      { label: "Charging Interface", value: "Type-C" },
      { label: "Weight", value: "250g" }
    ],
    sku: "ZV-ELEC-HP401",
    inStock: true,
    stockCount: 42,
    colors: ["Space Gray", "Midnight Blue", "Platinum White"],
    isBestSeller: true,
    isTrending: true,
    reviews: [
      { id: "rev-1-1", userName: "Marcus Vance", rating: 5, date: "2026-05-18", comment: "Absolutely incredible! The soundstage is vast and the ANC completely blocks my noisy office. Battery life has easily surpassed 50 hours.", verified: true },
      { id: "rev-1-2", userName: "Elena Rostova", rating: 4, date: "2026-05-24", comment: "Extremely comfortable for long flights. Dynamic bass boost is rich but not overpowering. Highly recommended.", verified: true }
    ],
    faqs: [
      { question: "Is a carrying case included?", answer: "Yes, a premium hard-shell thermoformed case is included with every Aethera purchase." },
      { question: "Do these support wired connections?", answer: "Yes, a 3.5mm premium audio cable is in the box for high-resolution passive listening." }
    ]
  },
  {
    id: "elec-2",
    title: "Quantum Chronos Smartwatch v3",
    brand: "Zentrova Wear",
    category: "Electronics",
    subCategory: "Smart Watches",
    price: 189,
    originalPrice: 229,
    discountPercent: 17,
    rating: 4.6,
    reviewCount: 148,
    imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The peak of wearable excellence. Track biometric statistics, synchronize communications, and navigate using standalone GPS. Its vibrant AMOLED screen is visible under absolute sunlight.",
    features: [
      "Always-On Retina AMOLED with 1000 nits peak brightness",
      "Real-time ECG monitor & Blood Oxygen Tracking",
      "Standalone multi-band dual-frequency GPS navigation",
      "Water resistant up to 50 meters (5 ATM)",
      "Custom widgets & over 150 designer watchfaces"
    ],
    specifications: [
      { label: "Display Size", value: "1.43 inch AMOLED" },
      { label: "Case Material", value: "Aerospace titanium with sapphire glass" },
      { label: "Battery Life", value: "7 days normal usage, 14 days economy" },
      { label: "Sensors", value: "9-axis IMU, ECG tracker, optical SpO2" }
    ],
    sku: "ZV-ELEC-SW902",
    inStock: true,
    stockCount: 15,
    colors: ["Titanium Silver", "Obsidian Black", "Gold Bronze"],
    isFlashSale: true,
    reviews: [
      { id: "rev-2-1", userName: "Derek G.", rating: 5, date: "2026-06-02", comment: "The titanium finish is stellar. It tracks my runs with high precision and handles water effortlessly when swimming.", verified: true }
    ],
    faqs: [
      { question: "Does this connect with iOS?", answer: "Yes, the Zentrova Companion App is compatible with both iOS 15+ and Android 9+." }
    ]
  },
  {
    id: "elec-3",
    title: "Vertex Pro 14\" M3 Laptop",
    brand: "Zentrova Tech",
    category: "Electronics",
    subCategory: "Laptops",
    price: 1399,
    rating: 4.9,
    reviewCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496181130204-755241524eab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Designed for content creators and elite program developers. Packed with custom processors, 32GB high-speed memory, ultra-fast SSD storage, and an incomparable Liquid Pro-Motion display.",
    features: [
      "14.2-inch Liquid Pro-Motion display with 120Hz adaptive refresh rate",
      "Up to 22 hours of incredible battery longevity",
      "6-speaker spatial audio system with deep subwoofers",
      "Studio quality 1080p webcam and triple microphone array",
      "Integrated secure fingerprint sensor"
    ],
    specifications: [
      { label: "Processor", value: "Zentrova Core Z3 Ultra" },
      { label: "Unified Memory", value: "32GB High-Speed" },
      { label: "Storage", value: "1TB PCIe NVMe SSD" },
      { label: "Screen Resolution", value: "3024 x 1964 pixels" }
    ],
    sku: "ZV-ELEC-LP881",
    inStock: true,
    stockCount: 8,
    colors: ["Space Black", "Carbon Gray"],
    isBestSeller: true,
    reviews: [
      { id: "rev-3-1", userName: "Sarah Jenkins", rating: 5, date: "2026-05-30", comment: "Compiles code within seconds. It literally does not heat up or make fan noise even during heavy Docker runs. An elegant investment.", verified: true }
    ],
    faqs: [
      { question: "What is the warranty period?", answer: "We provide a 2-year comprehensive global hardware warranty on all Vertex Laptops." }
    ]
  },
  {
    id: "elec-4",
    title: "Aethera Chroma Wireless Soundbar",
    brand: "Zentrova Sound",
    category: "Electronics",
    subCategory: "Spakers",
    price: 159,
    originalPrice: 219,
    discountPercent: 27,
    rating: 4.7,
    reviewCount: 64,
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1608248597481-496100c80836?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Elevate your cinematic and musical home soundscape. The Aethera Soundbar packs dual high-excursion smart woofers, clean Dolby Atmos multi-directional acoustic virtualization, and multi-mode wireless casting.",
    features: [
      "Dolby Atmos spatial high-fidelity sound virtualization",
      "Integrated AirPlay 2, Spotify Connect, and Bluetooth 5.2",
      "Dual bass ports for explosive lows and crisp crystal dialogues",
      "Supports coaxial, optical, and HDMI eARC inputs"
    ],
    specifications: [
      { label: "Audio Output", value: "120W Peak Cinematic Output" },
      { label: "Channels", value: "3.1 Dedicated Surround Layout" },
      { label: "Dimensions", value: "36 x 3.2 x 2.8 inches" }
    ],
    sku: "ZV-ELEC-SB303",
    inStock: true,
    stockCount: 14,
    colors: ["Slate Charcoal", "Nordic Ash White"],
    isTrending: true,
    reviews: [
      { id: "rev-12-1", userName: "Clancy Miller", rating: 5, date: "2026-06-03", comment: "Remarkable vocal separation. Completely changed my home theatre vibe. Looks stunning under the television.", verified: true }
    ],
    faqs: [
      { question: "Is a wall mounting kit included?", answer: "Absolutely. Soundbar comes with precise heavy-duty wall anchors, alignment templates, and guidelines." }
    ]
  },

  // FASHION
  {
    id: "fash-1",
    title: "Verdant Suede Biker Jacket",
    brand: "Zentrova Atelier",
    category: "Fashion",
    subCategory: "Men's Wear",
    price: 145,
    originalPrice: 195,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 94,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5b504?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Indulge in tactile luxury. Expertly tailored in top-grain faux-suede, this custom motorcycle jacket features asymmetric heavy zippers and adjustable waistband buckles for an effortlessly cool, modern silhouette.",
    features: [
      "Ultra-soft, waterproof top-grain faux-suede fabric",
      "Heavy duty YKK hardware and zippers",
      "Concealed inner passport/smartphone pockets",
      "Smooth inner lining for non-frictional layering",
      "Modern tailored active-fit silhouette"
    ],
    specifications: [
      { label: "Material", value: "92% polyester, 8% spandex premium suede" },
      { label: "Lining", value: "100% Breathable Satin Lining" },
      { label: "Fit Type", value: "Athletic Tailored Fit" },
      { label: "Care Instructions", value: "Professional dry clean only" }
    ],
    sku: "ZV-FASH-BT801",
    inStock: true,
    stockCount: 22,
    colors: ["Emerald Green", "Earth Brown", "Classic Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    isTrending: true,
    reviews: [
      { id: "rev-4-1", userName: "Ethan Cross", rating: 5, date: "2026-04-12", comment: "The emerald color is phenomenal. Swaps easily between smart-casual and casual nightlife styles. Soft but has structure.", verified: true }
    ],
    faqs: [
      { question: "What are the washing instructions?", answer: "We highly recommend dry cleaning to preserve the soft fiber layout of the premium suede texture." }
    ]
  },
  {
    id: "fash-2",
    title: "Aura Breathable Linen Trench",
    brand: "Zentrova Atelier",
    category: "Fashion",
    subCategory: "Women's Wear",
    price: 115,
    rating: 4.5,
    reviewCount: 61,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "An incredibly versatile, draping light outerwear masterpiece. Blended with premium organic flax and standard rayon, this trench adds effortless structure and sun protection to any summer outfit.",
    features: [
      "Breathable organic flax linen blend",
      "Relaxed oversized silhouette with smart tie waistbelts",
      "Spacious flap patch pockets",
      "Elegant wide lapels"
    ],
    specifications: [
      { label: "Material", value: "70% Organic Flax Linen, 30% Rayon" },
      { label: "Length", value: "Below-knee draping cut" },
      { label: "Care", value: "Gentle cold water wash, flat dry" }
    ],
    sku: "ZV-FASH-TC312",
    inStock: true,
    stockCount: 14,
    colors: ["Sand Oat", "Onyx Black", "Soft Sage"],
    sizes: ["XS", "S", "M", "L"],
    reviews: [
      { id: "rev-5-1", userName: "Victoria L.", rating: 5, date: "2026-05-19", comment: "Perfect for layering on warm days when you still want to look polished. Fabric is heavy but extremely breathable.", verified: true }
    ],
    faqs: [
      { question: "Does it shrink in wash?", answer: "As with all natural linen, there may be extremely marginal shrinkage under heat. Please strictly use low-temperature delicate wash cycles and hang dry." }
    ]
  },
  {
    id: "fash-3",
    title: "Atelier Knit Merino Sweater",
    brand: "Zentrova Atelier",
    category: "Fashion",
    subCategory: "Knitwear",
    price: 89,
    originalPrice: 119,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 38,
    imageUrl: "https://files.catbox.moe/hfrc6x.jpg",
    additionalImages: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574164904299-3a102b110380?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Wrap yourself in cloud-like warmth. Spun from ultra-fine certified Australian Merino Wool, this crewneck sweater is lightweight, thermo-regulating, and incredibly soft against the skin.",
    features: [
      "100% Certified Australian Merino Wool construction",
      "Reinforced ribbed collar, cuffs, and hem detailing",
      "Natural elasticity and high anti-microbial odor resistance",
      "Advanced climate-adaptive lightweight density"
    ],
    specifications: [
      { label: "Fiber Size", value: "19.5 Micron Superfine Merino" },
      { label: "Weight", value: "280g Lightweight thermal knit" },
      { label: "Ethical Standards", value: "Responsible Wool Standard (RWS) certified" }
    ],
    sku: "ZV-FASH-MW102",
    inStock: true,
    stockCount: 22,
    colors: ["Oatmeal Heather", "Classic Indigo", "Slate Gray"],
    sizes: ["S", "M", "L"],
    reviews: [
      { id: "rev-31-1", userName: "Oliver Benson", rating: 5, date: "2026-06-01", comment: "This is easily the highest quality wool sweater I have owned. It is soft, fits tailored beautifully, and doesn't itch even slightly.", verified: true }
    ],
    faqs: [
      { question: "Does it pill easily?", answer: "Merino fibers are tightly spun to minimize pilling. Simply hand wash or cool-dry-clean to keep fibers pristine." }
    ]
  },

  // ACCESSORIES
  {
    id: "acc-1",
    title: "Sloane Eclipse Acetate Sunglasses",
    brand: "Zentrova Shades",
    category: "Accessories",
    subCategory: "Sunglasses",
    price: 79,
    originalPrice: 120,
    discountPercent: 34,
    rating: 4.8,
    reviewCount: 202,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sculpted for the bold. Featuring solid hand-polished bio-acetate frames and premium polarized nylon lenses with complete UV400 absorption, the Sloane glasses represent high-profile style combined with maximum eyesight preservation.",
    features: [
      "Handcrafted biodegradable Italian cellulose acetate frames",
      "Polarized category 3 lenses with anti-scratch coating",
      "Reinforced 5-barrel custom metal hinges",
      "Complete UVA and UVB UV400 wave block"
    ],
    specifications: [
      { label: "Lens Width", value: "52 mm" },
      { label: "Bridge Size", value: "20 mm" },
      { label: "Temple Length", value: "145 mm" },
      { label: "Warranty", value: "1 Year scratch-replacement warranty" }
    ],
    sku: "ZV-ACC-SL202",
    inStock: true,
    stockCount: 50,
    colors: ["Tortoise Honey", "Crystal Amber", "Deep Amber Jet"],
    isBestSeller: true,
    isFlashSale: true,
    reviews: [
      { id: "rev-6-1", userName: "Sophia Kim", rating: 5, date: "2026-05-09", comment: "Absolutely beautifully crafted. Fits snugly but with zero temple pressure. The glare reduction is stellar near sandy shores.", verified: true }
    ],
    faqs: [
      { question: "Are they unisex?", answer: "Yes, the Sloane geometry is balanced expertly to suit diverse facial structures." }
    ]
  },
  {
    id: "acc-2",
    title: "Voyager Full-Grain Leather Duffel",
    brand: "Zentrova Leathercraft",
    category: "Accessories",
    subCategory: "Bags",
    price: 195,
    originalPrice: 275,
    discountPercent: 29,
    rating: 4.9,
    reviewCount: 77,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1554342597-99f813d10539?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The classic weekender bag redesigned for modern professionals. Hand-built from vegetable-tanned full-grain cowhide leather, it ages uniquely with an elegant, custom patina over extensive travel.",
    features: [
      "Vegetable-tanned premium full-grain leather outer body",
      "Padded safe internal laptop sleeve fitting up to 15-inch systems",
      "Separated internal waterproof compartment for athletic footwear",
      "Adjustable custom padded leather shoulder strap"
    ],
    specifications: [
      { label: "Dimensions", value: "21.5 x 11.5 x 10.5 inches" },
      { label: "Capacity", value: "42 Liters" },
      { label: "Weight", value: "1.8 kg" },
      { label: "Hardware", value: "Aged solid brass fasteners" }
    ],
    sku: "ZV-ACC-VG909",
    inStock: true,
    stockCount: 10,
    colors: ["Cognac Tan", "Vintage Espresso", "Stealth Onyx"],
    isTrending: true,
    reviews: [
      { id: "rev-7-1", userName: "Thomas Moore", rating: 5, date: "2026-06-01", comment: "This is a masterpiece. The leather smells pristine and has structured gravity. Perfectly satisfies carry-on boundaries on international flights.", verified: true }
    ],
    faqs: [
      { question: "Is the leather water resistant?", answer: "The duffel has a hydrophobic wax finish to repel rain instantly, but we recommend avoiding heavy water saturation." }
    ]
  },
  {
    id: "acc-3",
    title: "Sloane Saffiano Travel Folio",
    brand: "Zentrova Leathercraft",
    category: "Accessories",
    subCategory: "Business Travel",
    price: 69,
    originalPrice: 95,
    discountPercent: 27,
    rating: 4.8,
    reviewCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507206130418-dfa3c58a2d15?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The peak of sleek executive lifestyle organization. Crafted in scratch-resistant premium Saffiano cross-grain leather, this travel folio secures passports, bank cards, flight passes, and an iPad Mini seamlessly.",
    features: [
      "Premium Saffiano cross-grain scratch-preventive calfskin leather",
      "Polished heavy metal gunmetal-finish YKK wrap zipper",
      "6 RFID-blocking card bays and dedicated passport sleeves",
      "Suede fabric inner divider layer keeping hardware secure"
    ],
    specifications: [
      { label: "Materials", value: "Full Saffiano Leather, Suede lining" },
      { label: "Pocket Slots", value: "1 main tab sleeve, 1 passport slot, 6 card bays, 1 boarding pass slider" },
      { label: "Closure Structure", value: "Heavy-gauge wrap-around double zipper" }
    ],
    sku: "ZV-ACC-SF451",
    inStock: true,
    stockCount: 19,
    colors: ["Classic Amber", "Executive Cobalt", "Stealth Charcoal Onyx"],
    reviews: [
      { id: "rev-33-1", userName: "Aris G. Patel", rating: 5, date: "2026-05-27", comment: "No more disorganization when boarding! Secure closures, looks highly executive. Slips neatly inside my backpack or portfolio briefcase.", verified: true }
    ],
    faqs: [
      { question: "Does it block wireless skimming?", answer: "Yes, the outer walls are lined with aerospace-grade Faraday lining shielding RFID and NFC waves entirely." }
    ]
  },

  // BEAUTY
  {
    id: "beau-1",
    title: "Glow Hydra-Luminate Face Serum",
    brand: "Zentrova Organics",
    category: "Beauty",
    subCategory: "Skincare",
    price: 42,
    originalPrice: 55,
    discountPercent: 23,
    rating: 4.7,
    reviewCount: 420,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248597481-496100c80836?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Unravel radiating brilliance. Driven by multi-weight hyaluronic acid complexes, bio-peptides, and certified organic wild rose hip distillates, this high-absorption serum plumps dehydrated cells.",
    features: [
      "Multi-molecular weight matrix of pure Hyaluronic Acid",
      "Intensified with skin barrier supportive Ceramides",
      "100% Vegan, Cruelty-Free, and fragrance-free formulation",
      "Dermatologically tested and optimized for all skin formats"
    ],
    specifications: [
      { label: "Size", value: "50 ml (1.7 fl oz)" },
      { label: "Key Ingredients", value: "Hyaluronic Acid, Vitamin B5, Peptide matrix" },
      { label: "pH Level", value: "5.5 balanced optimal skin pH" },
      { label: "Format", value: "Airless pump bottle technology" }
    ],
    sku: "ZV-BEAU-GH202",
    inStock: true,
    stockCount: 120,
    isBestSeller: true,
    reviews: [
      { id: "rev-8-1", userName: "Amanda Cruz", rating: 5, date: "2026-05-22", comment: "My hyperpigmentation and dryness vanished within 3 weeks of morning application. Skin looks incredibly dewy and feels plump.", verified: true }
    ],
    faqs: [
      { question: "Can I use this under makeup?", answer: "Absolutely. Its water-gel texture absorbs completely within 1 minute, forming an excellent non-peeling base." }
    ]
  },
  {
    id: "beau-2",
    title: "Infuse Argan Cold-Pressed Hair Oil",
    brand: "Zentrova Organics",
    category: "Beauty",
    subCategory: "Haircare",
    price: 36,
    rating: 4.6,
    reviewCount: 155,
    imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526413232644-8a409774953a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Rehabilitate split-ends. This single-origin cold-pressed pure Moroccan argan oil is enriched with custom rosemary distillates to fuel hydration, strengthen roots, and install silky radiance.",
    features: [
      "100% Certified Organic Cold-Pressed Argan Seed Oil",
      "Fortified with clean rosemary leaf extract to promote follicle health",
      "Non-greasy, fast absorption layout",
      "Sulfate-free, paraben-free and synthetic color-free"
    ],
    specifications: [
      { label: "Volume", value: "100 ml" },
      { label: "Source", value: "Cooperative farms of Morocco" },
      { label: "Recommended Hair Format", value: "Dry, colored, or damaged hair" }
    ],
    sku: "ZV-BEAU-AO102",
    inStock: true,
    stockCount: 85,
    reviews: [
      { id: "rev-9-1", userName: "Julianne S.", rating: 5, date: "2026-05-14", comment: "Controls my rebellious frizz perfectly. Smells wonderfully clean and natural.", verified: true }
    ],
    faqs: [
      { question: "How often should I apply this?", answer: "For premium results, apply a daily portion following twice-weekly wash cycles." }
    ]
  },

  // LIFESTYLE & HOME
  {
    id: "life-1",
    title: "Nordic Minimalist Ceramic Vase Set",
    brand: "Zentrova Home",
    category: "Lifestyle",
    subCategory: "Home Decor",
    price: 64,
    originalPrice: 85,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 110,
    imageUrl: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581881067280-9280d0d8fb48?w=800&auto=format&fit=crop&q=80"
    ],
    description: "A harmonious trio of textured stoneware. Kiln-fired using traditional methods and coated with natural matte volcanic ash glazes, these organic shapes bring absolute wabi-sabi elegance to desktops.",
    features: [
      "Kiln-fired earthenware ceramic construction",
      "Matte sandstone textured glaze finish",
      "Balanced weights to support tall floral structural layouts",
      "Set of 3 distinct matching geometries"
    ],
    specifications: [
      { label: "Vase Sizes", value: "Tall (10 inches), Medium (7 inches), Round (5 inches)" },
      { label: "Color", value: "Sand Clay Matte Sandstone" },
      { label: "Material", value: "Stoneware clay" }
    ],
    sku: "ZV-LIFE-NV404",
    inStock: true,
    stockCount: 30,
    isTrending: true,
    reviews: [
      { id: "rev-10-1", userName: "Eleanor Vance", rating: 5, date: "2026-04-20", comment: "Exquisite craftsmanship! The texture is incredibly premium. It adds a subtle organic energy on my modern oak fireplace mantle.", verified: true }
    ],
    faqs: [
      { question: "Are they waterproof internally?", answer: "Yes, the interior has an advanced glossy glass glaze to withstand liquid flower feeds securely." }
    ]
  },
  {
    id: "life-2",
    title: "Fortis Organic Cork Exercise Mat",
    brand: "Zentrova Fitness",
    category: "Lifestyle",
    subCategory: "Fitness",
    price: 85,
    rating: 4.7,
    reviewCount: 45,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Earth-minded, durable fitness support. Blending authentic Portuguese organic oak cork with standard natural rubber, this mat provides high-traction friction that increases with sweat moisture.",
    features: [
      "Natural premium cork top with high grip traction",
      "Sustainable biological natural rubber base (no chemical smells)",
      "Naturally antimicrobial, resistant to sweat mildew",
      "6mm safety cushion padding"
    ],
    specifications: [
      { label: "Size", value: "72 x 26 inches" },
      { label: "Thickness", value: "6 mm dynamic cushioning" },
      { label: "Weight", value: "2.3 kg stable weighting" }
    ],
    sku: "ZV-LIFE-FM201",
    inStock: true,
    stockCount: 19,
    reviews: [
      { id: "rev-11-1", userName: "Landon B.", rating: 5, date: "2026-06-05", comment: "No slipping during complex yoga practices. No plastic synthetic smell. Absolute top tier.", verified: true }
    ],
    faqs: [
      { question: "How do I clean cork?", answer: "A quick wipe down with a damp cloth and natural lavender water keeps the mat fresh." }
    ]
  },
  {
    id: "elec-5",
    title: "Aethera Mechanical Backlit Keyboard",
    brand: "Zentrova Tech",
    category: "Electronics",
    subCategory: "Keyboards",
    price: 129,
    originalPrice: 159,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 92,
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Type with supreme satisfaction. The Aethera Mechanical Keyboard features hand-lubricated silent linear switches, customized sound-dampening foam, and full spectrum dynamic ambient layout lighting.",
    features: [
      "Hot-swappable 5-pin key switch sockets",
      "High-density PBT double-shot designer keycaps",
      "Double-level gasket design with silicon dampening cushions",
      "Tri-mode connectivity: Bluetooth 5.1, 2.4Ghz dongle, or Type-C"
    ],
    specifications: [
      { label: "Form Factor", value: "75% compact executive layout" },
      { label: "Switches", value: "Custom pre-lubed Linear Cream switches" },
      { label: "Battery Volume", value: "4000mAh up to 200 hours without lighting" }
    ],
    sku: "ZV-ELEC-KB752",
    inStock: true,
    stockCount: 24,
    colors: ["Space Charcoal", "Nordic Glacier White"],
    isTrending: true,
    reviews: [
      { id: "rev-50-1", userName: "Arjun Rao", rating: 5, date: "2026-06-03", comment: "The tactile feedback works beautifully. The keystrokes emit a soft marbly thock sound. Superb finish.", verified: true }
    ],
    faqs: [
      { question: "Is this keyboard compatible with macOS?", answer: "Yes, it has a dedicated system switch and includes keycaps for both Windows and Mac in the package." }
    ]
  },
  {
    id: "fash-4",
    title: "Aura Premium Chelsea Leather Boots",
    brand: "Zentrova Atelier",
    category: "Fashion",
    subCategory: "Footwear",
    price: 169,
    originalPrice: 219,
    discountPercent: 22,
    rating: 4.9,
    reviewCount: 110,
    imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Designed for seamless style and comfort. Hand-styled in Italy from supreme weather-resistant oiled leather, these boots feature flexible elastic panels and premium reinforced heels.",
    features: [
      "Handcrafted top-grain oiled nubuck leather",
      "Comfort-fitting elasticated side gussets and pull tabs",
      "Anti-skid custom synthetic outsoles",
      "Ortholite triple-cushioning memory insoles"
    ],
    specifications: [
      { label: "Material", value: "100% Genuine Italian Nubuck Leather" },
      { label: "Heel Height", value: "1.2 inch block heels" },
      { label: "Origin", value: "Designed in Milan, Handcrafted in Tuscany" }
    ],
    sku: "ZV-FASH-CB991",
    inStock: true,
    stockCount: 15,
    colors: ["Cognac Amber", "Stealth Charcoal Onyx"],
    sizes: ["7", "8", "9", "10", "11"],
    isBestSeller: true,
    reviews: [
      { id: "rev-51-1", userName: "Liam Fletcher", rating: 5, date: "2026-05-29", comment: "These boots fit true to size. There is almost no break-in period required, the leather is astonishingly supple yet solid.", verified: true }
    ],
    faqs: [
      { question: "Are they waterproof?", answer: "The oiled nubuck is water-resistant against moderate snow and rain, though we recommend applying leather spray yearly for full lock." }
    ]
  },
  {
    id: "acc-4",
    title: "Sloane Hand-Stitched Passport Wallet",
    brand: "Zentrova Leathercraft",
    category: "Accessories",
    subCategory: "Business Travel",
    price: 49,
    originalPrice: 69,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 34,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Durable luxury for global nomads. Built with vegetable-tanned full-grain leather, this passport sleeve carries boarding passes, banknotes, and cards securely while fitting perfectly into breast pockets.",
    features: [
      "Secured space for passport and ticket files",
      "RFID signal blocking lining",
      "Saddle-stitched by hand using high strength waxed threat"
    ],
    specifications: [
      { label: "Dimensions", value: "5.5 x 3.9 inches compact format" },
      { label: "Bays", value: "1 passport section, 1 boarding ticket slot, 4 credit card spaces" }
    ],
    sku: "ZV-ACC-PW110",
    inStock: true,
    stockCount: 35,
    colors: ["Classic Brown", "Midnight Charcoal"],
    reviews: [
      { id: "rev-52-1", userName: "Nadia Volkov", rating: 5, date: "2026-06-01", comment: "Beautiful textures. It keeps all my crucial papers organized in a single location.", verified: true }
    ],
    faqs: [
      { question: "Can standard cards fit in the slots?", answer: "Yes, the slots are custom carved to perfectly snug international credit cards, driver licenses and badges." }
    ]
  },
  {
    id: "beau-3",
    title: "Atelier Lavender Botanical Night Cream",
    brand: "Zentrova Organics",
    category: "Beauty",
    subCategory: "Skincare",
    price: 52,
    originalPrice: 65,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 128,
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Awaken your skin's vibrant radiance. Powered by natural retinol alternatives, custom French lavender distillate, and skin-enriching peptide structures to reconstruct cellular layout while sleeping.",
    features: [
      "Accelerated nighttime lipid layer restoration",
      "Fortified with clean cold-pressed rosehip concentrates",
      "Cruelty-free, vegan, dermatologist verified hypoallergenic"
    ],
    specifications: [
      { label: "Volume", value: "50 ml (1.7 fl oz)" },
      { label: "Key Essential", value: "French Lavender Distillate & Bio-retinol blend" }
    ],
    sku: "ZV-BEAU-LN440",
    inStock: true,
    stockCount: 65,
    isTrending: true,
    reviews: [
      { id: "rev-53-1", userName: "Camila Ortiz", rating: 5, date: "2026-05-24", comment: "Extremely rich body and lovely scent. Waking up with deeply hydrated glowing skin.", verified: true }
    ],
    faqs: [
      { question: "Is this suitable for oily skin types?", answer: "Yes, the formula is non-comedogenic and lightweight enough that it balances natural sebum during the evening." }
    ]
  },
  {
    id: "life-3",
    title: "Aero Diffuser CleanAir Mist",
    brand: "Zentrova Home",
    category: "Lifestyle",
    subCategory: "Home Decor",
    price: 59,
    rating: 4.6,
    reviewCount: 41,
    imageUrl: "https://images.unsplash.com/photo-1595131978512-ef9cd0b115ea?w=800&auto=format&fit=crop&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Calm your senses. The Aero Diffuser creates a cool micro-fine mist of aromatherapy while emitting warm, comforting wellness light waves for premium relaxation.",
    features: [
      "Quiet dynamic ultrasonic wave tech",
      "Auto shutoff safeguards with multi-hour timer selections",
      "Ambient luxury glow LED strips"
    ],
    specifications: [
      { label: "Water Basin Capacity", value: "300 ml" },
      { label: "Output Duration", value: "Up to 8 hours clean continuous operation" }
    ],
    sku: "ZV-LIFE-AD120",
    inStock: true,
    stockCount: 40,
    reviews: [
      { id: "rev-54-1", userName: "Marcus Vance", rating: 5, date: "2026-06-08", comment: "Extremely compact and runs entirely silently. A beautiful addition to standard home workspaces.", verified: true }
    ],
    faqs: [
      { question: "Can I use standard tap water?", answer: "Yes, the filter layout comfortably handles standard tap water, although purified or distilled water is recommended to keep mineral buildup low." }
    ]
  }
];

export const OFFERS = [
  {
    id: "off-1",
    title: "Summer Solstice Sale",
    description: "Get up to 40% off on all premium Electronics & Accessories this season.",
    discountText: "UP TO 40% OFF",
    couponCode: "SOLSTICE40",
    discountPercent: 40,
    bannerUrl: "https://images.unsplash.com/photo-1472851294608-062f824d296e?w=1200&auto=format&fit=crop&q=80",
    expiryCountdown: "02d 14h 32m"
  },
  {
    id: "off-2",
    title: "Atelier Wardrobe Essential Combo",
    description: "Redefine your lifestyle. Buy any 2 apparel pieces from Zentrova Atelier and unlock an extra 20% discount.",
    discountText: "FLAT 20% OFF",
    couponCode: "ATELIER20",
    discountPercent: 20,
    bannerUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80",
    expiryCountdown: "05d 08h 12m"
  },
  {
    id: "off-3",
    title: "First Purchase Greeting Code",
    description: "Welcome to Zentrova. Join the futuristic loyalty program and unlock discount credits on your debut purchase.",
    discountText: "10% PRICE REDUCTION",
    couponCode: "WELCOME10",
    discountPercent: 10,
    bannerUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1200&auto=format&fit=crop&q=80",
    expiryCountdown: "No Expirations"
  }
];

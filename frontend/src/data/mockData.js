// Mock data for phones
export const mockPhones = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    sku: "IP15PM256GB",
    price: 32990000,
    originalPrice: 34990000,
    discount: 6,
    stock: 50,
    status: "active",
    specifications: {
      display: {
        size: "6.7 inch",
        resolution: "2796 x 1290",
        technology: "Super Retina XDR OLED",
        refreshRate: "120Hz"
      },
      camera: {
        rear: {
          main: "48MP",
          ultraWide: "12MP",
          telephoto: "12MP",
          features: ["Night mode", "Portrait mode", "ProRAW"]
        },
        front: "12MP",
        video: "4K@60fps"
      },
      performance: {
        chipset: "Apple A17 Pro",
        ram: "8GB",
        storage: "256GB",
        os: "iOS 17"
      },
      battery: {
        capacity: "4441 mAh",
        charging: "27W Fast Charging",
        wireless: true
      },
      connectivity: {
        network: ["5G", "4G LTE"],
        wifi: "WiFi 6E",
        bluetooth: "Bluetooth 5.3",
        ports: ["USB-C"]
      },
      design: {
        dimensions: "159.9 x 76.7 x 8.25 mm",
        weight: "221g",
        colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
        material: "Titanium"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
    description: "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP chuyên nghiệp và thiết kế Titanium cao cấp.",
    shortDescription: "iPhone 15 Pro Max 256GB - Flagship mới nhất từ Apple",
    tags: ["flagship", "gaming", "camera", "premium"],
    category: "smartphones",
    subcategory: "flagship",
    averageRating: 4.8,
    reviewCount: 128
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 256GB",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    sku: "SGS24U256GB",
    price: 29990000,
    originalPrice: 31990000,
    discount: 6,
    stock: 35,
    status: "active",
    specifications: {
      display: {
        size: "6.8 inch",
        resolution: "3120 x 1440",
        technology: "Dynamic AMOLED 2X",
        refreshRate: "120Hz"
      },
      camera: {
        rear: {
          main: "200MP",
          ultraWide: "12MP",
          telephoto: "10MP",
          features: ["Night mode", "Portrait mode", "Space Zoom 100x"]
        },
        front: "12MP",
        video: "8K@30fps"
      },
      performance: {
        chipset: "Snapdragon 8 Gen 3",
        ram: "12GB",
        storage: "256GB",
        os: "Android 14"
      },
      battery: {
        capacity: "5000 mAh",
        charging: "45W Fast Charging",
        wireless: true
      },
      connectivity: {
        network: ["5G", "4G LTE"],
        wifi: "WiFi 7",
        bluetooth: "Bluetooth 5.3",
        ports: ["USB-C"]
      },
      design: {
        dimensions: "162.3 x 79.0 x 8.6 mm",
        weight: "232g",
        colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
        material: "Titanium"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
    description: "Galaxy S24 Ultra với camera 200MP, S Pen tích hợp và hiệu năng mạnh mẽ cho người dùng chuyên nghiệp.",
    shortDescription: "Galaxy S24 Ultra 256GB - Flagship Android hàng đầu",
    tags: ["flagship", "camera", "s-pen", "android"],
    category: "smartphones",
    subcategory: "flagship",
    averageRating: 4.7,
    reviewCount: 95
  },
  {
    id: 3,
    name: "Xiaomi 14 Ultra 512GB",
    brand: "Xiaomi",
    model: "Xiaomi 14 Ultra",
    sku: "XM14U512GB",
    price: 24990000,
    originalPrice: 26990000,
    discount: 7,
    stock: 25,
    status: "active",
    specifications: {
      display: {
        size: "6.73 inch",
        resolution: "3200 x 1440",
        technology: "LTPO AMOLED",
        refreshRate: "120Hz"
      },
      camera: {
        rear: {
          main: "50MP",
          ultraWide: "50MP",
          telephoto: "50MP",
          features: ["Leica lens", "Night mode", "Portrait mode"]
        },
        front: "32MP",
        video: "8K@24fps"
      },
      performance: {
        chipset: "Snapdragon 8 Gen 3",
        ram: "16GB",
        storage: "512GB",
        os: "MIUI 15"
      },
      battery: {
        capacity: "5300 mAh",
        charging: "90W Fast Charging",
        wireless: true
      },
      connectivity: {
        network: ["5G", "4G LTE"],
        wifi: "WiFi 7",
        bluetooth: "Bluetooth 5.4",
        ports: ["USB-C"]
      },
      design: {
        dimensions: "161.4 x 75.3 x 9.2 mm",
        weight: "224g",
        colors: ["Black", "White", "Blue"],
        material: "Ceramic"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
    description: "Xiaomi 14 Ultra với hệ thống camera Leica chuyên nghiệp và sạc nhanh 90W.",
    shortDescription: "Xiaomi 14 Ultra 512GB - Camera Leica chuyên nghiệp",
    tags: ["flagship", "camera", "leica", "fast-charging"],
    category: "smartphones",
    subcategory: "flagship",
    averageRating: 4.6,
    reviewCount: 78
  },
  {
    id: 4,
    name: "Oppo Find X7 Ultra 256GB",
    brand: "Oppo",
    model: "Find X7 Ultra",
    sku: "OPFX7U256GB",
    price: 22990000,
    originalPrice: 24990000,
    discount: 8,
    stock: 30,
    status: "active",
    specifications: {
      display: {
        size: "6.82 inch",
        resolution: "3168 x 1440",
        technology: "LTPO AMOLED",
        refreshRate: "120Hz"
      },
      camera: {
        rear: {
          main: "50MP",
          ultraWide: "50MP",
          telephoto: "50MP",
          features: ["Hasselblad", "Night mode", "Portrait mode"]
        },
        front: "32MP",
        video: "4K@60fps"
      },
      performance: {
        chipset: "Snapdragon 8 Gen 3",
        ram: "12GB",
        storage: "256GB",
        os: "ColorOS 14"
      },
      battery: {
        capacity: "5000 mAh",
        charging: "100W Fast Charging",
        wireless: true
      },
      connectivity: {
        network: ["5G", "4G LTE"],
        wifi: "WiFi 7",
        bluetooth: "Bluetooth 5.4",
        ports: ["USB-C"]
      },
      design: {
        dimensions: "164.3 x 76.2 x 9.5 mm",
        weight: "221g",
        colors: ["Black", "White", "Orange"],
        material: "Ceramic"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
    description: "Oppo Find X7 Ultra với camera Hasselblad và sạc nhanh 100W siêu tốc.",
    shortDescription: "Oppo Find X7 Ultra 256GB - Camera Hasselblad",
    tags: ["flagship", "camera", "hasselblad", "fast-charging"],
    category: "smartphones",
    subcategory: "flagship",
    averageRating: 4.5,
    reviewCount: 62
  },
  {
    id: 5,
    name: "Samsung Galaxy A55 5G 128GB",
    brand: "Samsung",
    model: "Galaxy A55 5G",
    sku: "SGA55128GB",
    price: 8990000,
    originalPrice: 9990000,
    discount: 10,
    stock: 100,
    status: "active",
    specifications: {
      display: {
        size: "6.6 inch",
        resolution: "2340 x 1080",
        technology: "Super AMOLED",
        refreshRate: "120Hz"
      },
      camera: {
        rear: {
          main: "50MP",
          ultraWide: "12MP",
          telephoto: "5MP",
          features: ["Night mode", "Portrait mode"]
        },
        front: "32MP",
        video: "4K@30fps"
      },
      performance: {
        chipset: "Exynos 1480",
        ram: "8GB",
        storage: "128GB",
        os: "Android 14"
      },
      battery: {
        capacity: "5000 mAh",
        charging: "25W Fast Charging",
        wireless: false
      },
      connectivity: {
        network: ["5G", "4G LTE"],
        wifi: "WiFi 6",
        bluetooth: "Bluetooth 5.3",
        ports: ["USB-C"]
      },
      design: {
        dimensions: "161.1 x 77.4 x 8.2 mm",
        weight: "213g",
        colors: ["Awesome Iceblue", "Awesome Lilac", "Awesome Navy"],
        material: "Glass"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
    description: "Galaxy A55 5G với camera 50MP, màn hình Super AMOLED và pin 5000mAh.",
    shortDescription: "Galaxy A55 5G 128GB - Mid-range chất lượng cao",
    tags: ["mid-range", "5g", "camera", "amoled"],
    category: "smartphones",
    subcategory: "mid-range",
    averageRating: 4.3,
    reviewCount: 156
  },
  {
    id: 6,
    name: "Redmi Note 13 Pro+ 256GB",
    brand: "Xiaomi",
    model: "Redmi Note 13 Pro+",
    sku: "RN13PP256GB",
    price: 7990000,
    originalPrice: 8990000,
    discount: 11,
    stock: 80,
    status: "active",
    specifications: {
      display: {
        size: "6.67 inch",
        resolution: "2712 x 1220",
        technology: "AMOLED",
        refreshRate: "120Hz"
      },
      camera: {
        rear: {
          main: "200MP",
          ultraWide: "8MP",
          telephoto: "2MP",
          features: ["Night mode", "Portrait mode"]
        },
        front: "16MP",
        video: "4K@30fps"
      },
      performance: {
        chipset: "MediaTek Dimensity 7200 Ultra",
        ram: "12GB",
        storage: "256GB",
        os: "MIUI 14"
      },
      battery: {
        capacity: "5000 mAh",
        charging: "120W Fast Charging",
        wireless: false
      },
      connectivity: {
        network: ["5G", "4G LTE"],
        wifi: "WiFi 6",
        bluetooth: "Bluetooth 5.3",
        ports: ["USB-C"]
      },
      design: {
        dimensions: "161.4 x 74.2 x 8.9 mm",
        weight: "204g",
        colors: ["Midnight Black", "Aurora Purple", "Ocean Blue"],
        material: "Glass"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
    description: "Redmi Note 13 Pro+ với camera 200MP và sạc nhanh 120W siêu tốc.",
    shortDescription: "Redmi Note 13 Pro+ 256GB - Camera 200MP",
    tags: ["mid-range", "camera", "fast-charging", "value"],
    category: "smartphones",
    subcategory: "mid-range",
    averageRating: 4.4,
    reviewCount: 203
  }
];

// Mock data for brands
export const mockBrands = [
  { id: 1, name: "Apple", logo: "🍎", slug: "apple" },
  { id: 2, name: "Samsung", logo: "📱", slug: "samsung" },
  { id: 3, name: "Xiaomi", logo: "⚡", slug: "xiaomi" },
  { id: 4, name: "Oppo", logo: "🔵", slug: "oppo" },
  { id: 5, name: "Vivo", logo: "🟢", slug: "vivo" },
  { id: 6, name: "Realme", logo: "🟡", slug: "realme" }
];

// Mock data for categories
export const mockCategories = [
  { id: 1, name: "Flagship", slug: "flagship", description: "Điện thoại cao cấp" },
  { id: 2, name: "Mid-range", slug: "mid-range", description: "Điện thoại tầm trung" },
  { id: 3, name: "Budget", slug: "budget", description: "Điện thoại giá rẻ" },
  { id: 4, name: "Gaming", slug: "gaming", description: "Điện thoại chơi game" },
  { id: 5, name: "Camera", slug: "camera", description: "Điện thoại chụp ảnh" }
];

// Mock data for cart
export const mockCartItems = [
  {
    id: 1,
    phoneId: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 32990000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300"
  },
  {
    id: 2,
    phoneId: 5,
    name: "Samsung Galaxy A55 5G 128GB",
    price: 8990000,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300"
  }
];

// Utility functions
export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

export const getDiscountPercentage = (originalPrice, currentPrice) => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

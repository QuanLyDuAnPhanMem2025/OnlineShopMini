const mongoose = require('mongoose');
const Phone = require('../models/Phone');
require('dotenv').config();

// Mock data for phones (60 products)
const phonesData = [
  {
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
        colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
        material: "Titanium"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
    description: "Samsung Galaxy S24 Ultra với camera 200MP, S Pen và hiệu năng mạnh mẽ.",
    shortDescription: "Galaxy S24 Ultra 256GB - Flagship Android hàng đầu",
    tags: ["flagship", "camera", "s-pen", "android"],
    category: "smartphones",
    subcategory: "flagship",
    averageRating: 4.7,
    reviewCount: 95
  },
  {
    name: "iPhone 15 Pro 128GB",
    brand: "Apple",
    model: "iPhone 15 Pro",
    sku: "IP15P128GB",
    price: 27990000,
    originalPrice: 29990000,
    discount: 7,
    stock: 40,
    status: "active",
    specifications: {
      display: {
        size: "6.1 inch",
        resolution: "2556 x 1179",
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
        storage: "128GB",
        os: "iOS 17"
      },
      battery: {
        capacity: "3274 mAh",
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
        dimensions: "146.6 x 70.6 x 8.25 mm",
        weight: "187g",
        colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
        material: "Titanium"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
    description: "iPhone 15 Pro với chip A17 Pro và thiết kế Titanium cao cấp.",
    shortDescription: "iPhone 15 Pro 128GB - Pro mới nhất từ Apple",
    tags: ["flagship", "pro", "camera", "premium"],
    category: "smartphones",
    subcategory: "flagship",
    averageRating: 4.6,
    reviewCount: 87
  },
  {
    name: "Samsung Galaxy S24+ 256GB",
    brand: "Samsung",
    model: "Galaxy S24+",
    sku: "SGS24P256GB",
    price: 22990000,
    originalPrice: 24990000,
    discount: 8,
    stock: 30,
    status: "active",
    specifications: {
      display: {
        size: "6.7 inch",
        resolution: "3120 x 1440",
        technology: "Dynamic AMOLED 2X",
        refreshRate: "120Hz"
      },
      camera: {
        rear: {
          main: "50MP",
          ultraWide: "12MP",
          telephoto: "10MP",
          features: ["Night mode", "Portrait mode", "Space Zoom 30x"]
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
        capacity: "4900 mAh",
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
        dimensions: "158.5 x 75.9 x 7.7 mm",
        weight: "196g",
        colors: ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow"],
        material: "Aluminum"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
    description: "Samsung Galaxy S24+ với camera 50MP và hiệu năng mạnh mẽ.",
    shortDescription: "Galaxy S24+ 256GB - Plus mới nhất từ Samsung",
    tags: ["flagship", "camera", "android", "plus"],
    category: "smartphones",
    subcategory: "flagship",
    averageRating: 4.5,
    reviewCount: 72
  },
  {
    name: "iPhone 15 128GB",
    brand: "Apple",
    model: "iPhone 15",
    sku: "IP15128GB",
    price: 21990000,
    originalPrice: 23990000,
    discount: 8,
    stock: 60,
    status: "active",
    specifications: {
      display: {
        size: "6.1 inch",
        resolution: "2556 x 1179",
        technology: "Super Retina XDR OLED",
        refreshRate: "60Hz"
      },
      camera: {
        rear: {
          main: "48MP",
          ultraWide: "12MP",
          features: ["Night mode", "Portrait mode"]
        },
        front: "12MP",
        video: "4K@60fps"
      },
      performance: {
        chipset: "Apple A16 Bionic",
        ram: "6GB",
        storage: "128GB",
        os: "iOS 17"
      },
      battery: {
        capacity: "3349 mAh",
        charging: "20W Fast Charging",
        wireless: true
      },
      connectivity: {
        network: ["5G", "4G LTE"],
        wifi: "WiFi 6",
        bluetooth: "Bluetooth 5.3",
        ports: ["USB-C"]
      },
      design: {
        dimensions: "147.6 x 71.6 x 7.80 mm",
        weight: "171g",
        colors: ["Pink", "Yellow", "Green", "Blue", "Black"],
        material: "Aluminum"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
    description: "iPhone 15 với camera 48MP và chip A16 Bionic mạnh mẽ.",
    shortDescription: "iPhone 15 128GB - iPhone mới nhất từ Apple",
    tags: ["mainstream", "camera", "ios", "usb-c"],
    category: "smartphones",
    subcategory: "mainstream",
    averageRating: 4.4,
    reviewCount: 156
  }
];

// Generate more phones to reach 60 total
const generateMorePhones = () => {
  const brands = ["Apple", "Samsung", "Xiaomi", "OPPO", "Vivo", "OnePlus", "Google", "Huawei"];
  const models = {
    Apple: ["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13"],
    Samsung: ["Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy A54", "Galaxy A34", "Galaxy Z Fold 5"],
    Xiaomi: ["Mi 14 Pro", "Mi 14", "Redmi Note 13 Pro", "Redmi Note 13", "POCO X6 Pro", "POCO F5"],
    OPPO: ["Find X7 Ultra", "Find X7", "Reno 11 Pro", "Reno 11", "A98", "A78"],
    Vivo: ["X100 Pro", "X100", "V30 Pro", "V30", "Y100", "Y78"],
    OnePlus: ["12 Pro", "12", "11 Pro", "11", "Nord 3", "Nord CE 3"],
    Google: ["Pixel 8 Pro", "Pixel 8", "Pixel 7a", "Pixel 6a"],
    Huawei: ["P60 Pro", "P60", "Mate 60 Pro", "Mate 60", "Nova 11", "Nova 11 Pro"]
  };

  const additionalPhones = [];
  
  for (let i = 6; i < 60; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[brand][Math.floor(Math.random() * models[brand].length)];
    const storage = ["128GB", "256GB", "512GB"][Math.floor(Math.random() * 3)];
    const ram = ["8GB", "12GB", "16GB"][Math.floor(Math.random() * 3)];
    
    const basePrice = Math.floor(Math.random() * 20000000) + 5000000; // 5M - 25M
    const originalPrice = Math.floor(basePrice * 1.1);
    const discount = Math.floor(Math.random() * 15) + 5; // 5-20%
    
    additionalPhones.push({
      name: `${model} ${storage}`,
      brand: brand,
      model: model,
      sku: `${brand.toUpperCase().substring(0,2)}${i}${storage}`,
      price: basePrice,
      originalPrice: originalPrice,
      discount: discount,
      stock: Math.floor(Math.random() * 100) + 10,
      status: "active",
      specifications: {
        display: {
          size: `${6 + Math.random() * 1.5} inch`,
          resolution: "2340 x 1080",
          technology: "OLED",
          refreshRate: "120Hz"
        },
        camera: {
          rear: {
            main: `${Math.floor(Math.random() * 100) + 50}MP`,
            ultraWide: "12MP",
            telephoto: "8MP",
            features: ["Night mode", "Portrait mode"]
          },
          front: "32MP",
          video: "4K@30fps"
        },
        performance: {
          chipset: "Snapdragon 8 Gen 2",
          ram: ram,
          storage: storage,
          os: brand === "Apple" ? "iOS 17" : "Android 14"
        },
        battery: {
          capacity: `${Math.floor(Math.random() * 2000) + 4000} mAh`,
          charging: "65W Fast Charging",
          wireless: true
        },
        connectivity: {
          network: ["5G", "4G LTE"],
          wifi: "WiFi 6",
          bluetooth: "Bluetooth 5.3",
          ports: ["USB-C"]
        },
        design: {
          dimensions: "160 x 75 x 8 mm",
          weight: `${Math.floor(Math.random() * 50) + 180}g`,
          colors: ["Black", "White", "Blue", "Green"],
          material: "Glass"
        }
      },
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
      ],
      thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
      description: `${model} với camera chuyên nghiệp và hiệu năng mạnh mẽ.`,
      shortDescription: `${model} ${storage} - ${brand} flagship mới nhất`,
      tags: ["flagship", "camera", "gaming", "premium"],
      category: "smartphones",
      subcategory: i % 2 === 0 ? "flagship" : "mainstream",
      averageRating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 200) + 50
    });
  }
  
  return additionalPhones;
};

const seedPhones = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing phones
    await Phone.deleteMany({});
    console.log('Cleared existing phones');

    // Generate all phones
    const allPhones = [...phonesData, ...generateMorePhones()];
    
    // Insert phones
    const phones = await Phone.insertMany(allPhones);
    console.log(`Seeded ${phones.length} phones successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding phones:', error);
    process.exit(1);
  }
};

// Run the seed function
seedPhones();

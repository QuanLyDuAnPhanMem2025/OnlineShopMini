const API_BASE_URL = 'http://localhost:3000/api';

// Mock data fallback - Simple array format
const mockPhones = [
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
        colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
        material: "Titanium"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
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
    id: 3,
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
    id: 4,
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
    id: 5,
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

const mockBrands = [
  { id: "Apple", name: "Apple" },
  { id: "Samsung", name: "Samsung" },
  { id: "Xiaomi", name: "Xiaomi" },
  { id: "OPPO", name: "OPPO" },
  { id: "Vivo", name: "Vivo" },
  { id: "OnePlus", name: "OnePlus" },
  { id: "Google", name: "Google" },
  { id: "Huawei", name: "Huawei" }
];

const mockCategories = [
  { id: "flagship", name: "Flagship", slug: "flagship" },
  { id: "mainstream", name: "Mainstream", slug: "mainstream" },
  { id: "budget", name: "Budget", slug: "budget" },
  { id: "gaming", name: "Gaming", slug: "gaming" }
];

// Check if backend is available
const isBackendAvailable = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/phones?limit=1`, {
      method: 'GET',
      timeout: 3000
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Phone API service
export const phoneService = {
  // Get all phones with filters and pagination
  getPhones: async (params = {}) => {
    try {
      const {
        page = 1,
        limit = 20,
        brand,
        category,
        minPrice,
        maxPrice,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder
      });

      if (brand) queryParams.append('brand', brand);
      if (category) queryParams.append('category', category);
      if (minPrice) queryParams.append('minPrice', minPrice.toString());
      if (maxPrice) queryParams.append('maxPrice', maxPrice.toString());
      if (search) queryParams.append('search', search);

      const response = await fetch(`${API_BASE_URL}/phones?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch phones');
      }

      return await response.json();
    } catch (error) {
      console.log('Using mock data for phones');
      // Fallback to mock data
      const {
        page = 1,
        limit = 20,
        search: searchParam,
        brand: brandParam,
        category: categoryParam,
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = params;
      
      const searchTerm = searchParam || '';
      const brandFilter = brandParam || '';
      const categoryFilter = categoryParam || '';
      const minPriceFilter = minPriceParam || 0;
      const maxPriceFilter = maxPriceParam || 50000000;
      
      let filtered = mockPhones.filter(phone => {
        const matchesSearch = !searchTerm || phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             phone.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = !brandFilter || phone.brand === brandFilter;
        const matchesCategory = !categoryFilter || phone.subcategory === categoryFilter;
        const matchesPrice = phone.price >= minPriceFilter && phone.price <= maxPriceFilter;

        return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
      });

      // Sort
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.averageRating;
            bValue = b.averageRating;
            break;
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'createdAt':
          default:
            aValue = a.id;
            bValue = b.id;
            break;
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      // Pagination
      const startIndex = (page - 1) * limit;
      const paginatedPhones = filtered.slice(startIndex, startIndex + limit);
      const totalPages = Math.ceil(filtered.length / limit);

      return {
        success: true,
        data: {
          phones: paginatedPhones,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: filtered.length,
            totalPages: totalPages
          }
        }
      };
    }
  },

  // Get single phone by ID
  getPhone: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/phones/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch phone');
      }

      return await response.json();
    } catch (error) {
      console.log('Using mock data for phone');
      const phone = mockPhones.find(p => p.id === parseInt(id));
      if (!phone) {
        throw new Error('Phone not found');
      }
      
      // Get related phones (same brand, different id)
      const relatedPhones = mockPhones
        .filter(p => p.id !== parseInt(id) && p.brand === phone.brand)
        .slice(0, 4);
      
      return {
        success: true,
        data: { phone, relatedPhones }
      };
    }
  },

  // Search phones
  searchPhones: async (query, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({ q: query });
      
      if (Object.keys(filters).length > 0) {
        queryParams.append('filters', JSON.stringify(filters));
      }

      const response = await fetch(`${API_BASE_URL}/phones/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to search phones');
      }

      return await response.json();
    } catch (error) {
      console.log('Using mock data for search');
      const filtered = mockPhones.filter(phone => 
        phone.name.toLowerCase().includes(query.toLowerCase()) ||
        phone.brand.toLowerCase().includes(query.toLowerCase())
      );
      return {
        success: true,
        data: filtered
      };
    }
  },

  // Compare phones
  comparePhones: async (ids) => {
    try {
      const queryParams = new URLSearchParams({ ids: ids.join(',') });
      
      const response = await fetch(`${API_BASE_URL}/phones/compare?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to compare phones');
      }

      return await response.json();
    } catch (error) {
      console.log('Using mock data for compare');
      const phones = mockPhones.filter(phone => ids.includes(phone.id.toString()));
      return {
        success: true,
        data: phones
      };
    }
  }
};

// Brands API service
export const brandService = {
  getBrands: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/brands`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }

      return await response.json();
    } catch (error) {
      console.log('Using mock data for brands');
      return {
        success: true,
        data: mockBrands
      };
    }
  }
};

// Categories API service
export const categoryService = {
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      return await response.json();
    } catch (error) {
      console.log('Using mock data for categories');
      return {
        success: true,
        data: mockCategories
      };
    }
  }
};

// Utility functions
export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

export const getDiscountPercentage = (originalPrice, currentPrice) => {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

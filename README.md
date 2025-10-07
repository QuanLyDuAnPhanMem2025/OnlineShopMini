# 📱 Online Shop Mini - Trang Web Bán Điện Thoại

Dự án fullstack cho trang web bán điện thoại với React (Frontend) và Node.js (Backend).

## 🎯 Tính năng chính

### Frontend (React + JavaScript)
- ✅ **Trang chủ**: Hero section, sản phẩm nổi bật, thương hiệu, danh mục
- ✅ **Danh sách sản phẩm**: Grid layout, filter, sort, pagination
- ✅ **Chi tiết sản phẩm**: Image gallery, specifications, reviews, related products
- ✅ **Giỏ hàng**: Add/remove items, quantity update, order summary
- ✅ **Responsive Design**: Mobile-first, tối ưu cho mọi thiết bị

### Backend (Node.js + Express + JavaScript)
- ✅ **Authentication**: JWT, register/login, role-based access
- ✅ **Product Management**: CRUD operations, search, filter
- ✅ **Order Management**: Create orders, status tracking
- ✅ **User Management**: Profile, addresses, order history
- ✅ **Security**: Helmet, CORS, rate limiting, input validation

## 🚀 Cách chạy dự án

### Backend
```bash
cd backend
npm install
npm run dev
# Server chạy tại: http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App chạy tại: http://localhost:5173
```

## 📁 Cấu trúc dự án

```
OnlineShopMini/
├── backend/                    # Node.js Backend
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Auth, error handling
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   └── index.js           # Main server file
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── data/             # Mock data
│   │   ├── App.jsx           # Main app
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── README.md
└── README.md                  # This file
```

## 🎨 Giao diện Demo

### Trang chủ
- Hero section với search bar
- Sản phẩm nổi bật (6 sản phẩm)
- Thương hiệu nổi bật (4 brands)
- Danh mục sản phẩm (5 categories)
- Footer với thông tin liên hệ

### Danh sách sản phẩm
- Sidebar filters: brand, category, price range
- Sort options: name, price, rating
- Grid layout với pagination
- Product cards với image, price, rating

### Chi tiết sản phẩm
- Image gallery với thumbnails
- Product info với price, rating
- Color selection
- Quantity selector
- Specifications tab
- Related products

### Giỏ hàng
- Cart items với quantity controls
- Order summary với totals
- Shipping calculator
- Checkout button

## 📊 Dữ liệu mẫu

### Sản phẩm (6 điện thoại)
- iPhone 15 Pro Max 256GB - 32,990,000đ
- Samsung Galaxy S24 Ultra 256GB - 29,990,000đ
- Xiaomi 14 Ultra 512GB - 24,990,000đ
- Oppo Find X7 Ultra 256GB - 22,990,000đ
- Samsung Galaxy A55 5G 128GB - 8,990,000đ
- Redmi Note 13 Pro+ 256GB - 7,990,000đ

### Thương hiệu (6 brands)
- Apple, Samsung, Xiaomi, Oppo, Vivo, Realme

### Danh mục (5 categories)
- Flagship, Mid-range, Budget, Gaming, Camera

## 🔧 Công nghệ sử dụng

### Frontend
- **React 19.1.1** - UI library
- **Vite** - Build tool
- **JavaScript** - Programming language
- **CSS3** - Styling
- **Responsive Design** - Mobile-first

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Development
- **ESLint** - Code linting
- **Jest** - Testing
- **Docker** - Containerization
- **Git** - Version control

## 🎯 Tính năng đã implement

### ✅ Hoàn thành
- [x] Cấu trúc dự án monorepo
- [x] Backend API với Express + MongoDB
- [x] Frontend React với Vite
- [x] Authentication system (JWT)
- [x] Product management
- [x] Shopping cart functionality
- [x] Responsive UI design
- [x] Mock data cho demo
- [x] Error handling
- [x] Security middleware

### 🚧 Cần phát triển thêm
- [ ] Real database integration
- [ ] Payment gateway integration
- [ ] User registration/login forms
- [ ] Admin panel
- [ ] Order tracking
- [ ] Email notifications
- [ ] Search functionality
- [ ] Product reviews
- [ ] Wishlist feature
- [ ] Product comparison

## 🚀 Deployment

### Backend (AWS ECS Fargate)
```bash
# Build Docker image
docker build -t onlineshop-backend .

# Push to ECR
docker tag onlineshop-backend:latest <account>.dkr.ecr.<region>.amazonaws.com/onlineshop-backend:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/onlineshop-backend:latest

# Deploy to ECS
# (Configure ECS service with ALB, VPC, Security Groups)
```

### Frontend (AWS S3 + CloudFront)
```bash
# Build production
npm run build

# Upload to S3
aws s3 sync dist/ s3://onlineshop-frontend-bucket

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id <distribution-id> --paths "/*"
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Thông tin user

### Products
- `GET /api/phones` - Danh sách điện thoại
- `GET /api/phones/:id` - Chi tiết điện thoại
- `GET /api/phones/search` - Tìm kiếm
- `GET /api/phones/compare` - So sánh

### Orders
- `GET /api/orders` - Danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Chi tiết đơn hàng

## 🎨 UI Components

### Reusable Components
- `Header` - Navigation và search
- `ProductCard` - Product display card
- `ProductGrid` - Grid layout cho products
- `FilterSidebar` - Product filters
- `CartItem` - Cart item display

### Pages
- `HomePage` - Trang chủ
- `ProductListPage` - Danh sách sản phẩm
- `ProductDetailPage` - Chi tiết sản phẩm
- `CartPage` - Giỏ hàng

## 🔒 Security Features

- JWT authentication
- Password hashing với bcrypt
- CORS configuration
- Rate limiting
- Input validation
- Security headers với Helmet
- SQL injection protection

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Performance

- Lazy loading images
- Code splitting
- Optimized bundle size
- CDN delivery
- Caching strategies

## 📞 Support

Để được hỗ trợ, vui lòng liên hệ:
- Email: support@onlineshop.com
- Phone: 1900-1234
- Website: https://onlineshop.com

---

**Phát triển bởi**: Online Shop Team  
**Phiên bản**: 1.0.0  
**Ngày tạo**: 2024
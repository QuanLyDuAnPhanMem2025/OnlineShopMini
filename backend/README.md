# Backend - Online Shop Mini (JavaScript)

Backend API cho trang web bán điện thoại sử dụng Node.js + Express + MongoDB.

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình environment
```bash
# Copy file env.example thành .env
copy env.example .env

# Hoặc tạo file .env với nội dung:
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/onlineshop
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Chạy server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📁 Cấu trúc thư mục

```
src/
├── controllers/     # Business logic
│   ├── auth.js     # Authentication
│   ├── phones.js   # Phone management
│   ├── orders.js   # Order management
│   └── users.js    # User management
├── middleware/     # Custom middleware
│   ├── auth.js     # JWT authentication
│   ├── errorHandler.js
│   └── notFound.js
├── models/         # MongoDB models
│   ├── User.js     # User schema
│   └── Phone.js    # Phone schema
├── routes/         # API routes
│   ├── auth.js
│   ├── phones.js
│   ├── orders.js
│   └── users.js
├── scripts/        # Utility scripts
├── tests/         # Test files
├── utils/         # Helper functions
└── index.js       # Main server file
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Phones
- `GET /api/phones` - Danh sách điện thoại
- `GET /api/phones/:id` - Chi tiết điện thoại
- `GET /api/phones/search` - Tìm kiếm điện thoại
- `GET /api/phones/compare` - So sánh điện thoại
- `POST /api/phones` - Tạo điện thoại (Admin)
- `PUT /api/phones/:id` - Cập nhật điện thoại (Admin)
- `DELETE /api/phones/:id` - Xóa điện thoại (Admin)

### Orders
- `GET /api/orders` - Danh sách đơn hàng (Admin)
- `GET /api/orders/my-orders` - Đơn hàng của user
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `PUT /api/orders/:id/status` - Cập nhật trạng thái (Admin)

### Users
- `GET /api/users` - Danh sách users (Admin)
- `GET /api/users/:id` - Chi tiết user (Admin)
- `PUT /api/users/:id` - Cập nhật user (Admin)
- `DELETE /api/users/:id` - Xóa user (Admin)
- `GET /api/users/profile` - Profile của user hiện tại
- `PUT /api/users/profile` - Cập nhật profile

## 🧪 Testing

```bash
# Chạy tests
npm test

# Chạy tests với coverage
npm run test:coverage

# Chạy tests watch mode
npm run test:watch
```

## 🐳 Docker

```bash
# Build Docker image
docker build -t onlineshop-backend .

# Chạy container
docker run -p 3000:3000 --env-file .env onlineshop-backend
```

## 📝 Scripts có sẵn

- `npm run dev` - Chạy development server với nodemon
- `npm start` - Chạy production server
- `npm test` - Chạy tests
- `npm run test:watch` - Chạy tests watch mode
- `npm run test:coverage` - Chạy tests với coverage report
- `npm run seed` - Chạy seed data (coming soon)

## 🔧 Cấu hình MongoDB

### Local MongoDB
```bash
# Cài đặt MongoDB
# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb

# Start MongoDB service
mongod

# Kết nối: mongodb://localhost:27017/onlineshop
```

### MongoDB Atlas (Cloud)
```bash
# Tạo cluster tại https://cloud.mongodb.com
# Lấy connection string và cập nhật MONGODB_URI trong .env
```

## 🚨 Lưu ý quan trọng

1. **JWT_SECRET**: Thay đổi trong production
2. **MONGODB_URI**: Sử dụng MongoDB Atlas cho production
3. **CORS_ORIGIN**: Cập nhật domain frontend
4. **Rate Limiting**: Điều chỉnh theo nhu cầu

## 📊 Health Check

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2025-01-07T14:44:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

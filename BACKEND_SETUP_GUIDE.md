# Hướng dẫn setup Backend

## Vấn đề đã sửa

### 1. Rate Limiting trả về plain text thay vì JSON ✅
**Vấn đề**: Rate limiter trả về message dạng plain text, gây lỗi "Unexpected token 'T', "Too many r"... is not valid JSON"

**Giải pháp**: Sửa rate limiter trong `backend/src/index.js`:
```javascript
// CŨ
message: 'Too many requests from this IP, please try again later.'

// MỚI  
message: {
  success: false,
  error: 'Too many requests from this IP, please try again later.'
}
```

### 2. JWT_EXPIRES_IN không khớp với .env ✅
**Vấn đề**: Code sử dụng `JWT_EXPIRES_IN` nhưng .env có `JWT_EXPIRE`

**Giải pháp**: Sửa trong `backend/src/controllers/auth.js`:
```javascript
// CŨ
expiresIn: process.env.JWT_EXPIRES_IN || '15m'

// MỚI
expiresIn: process.env.JWT_EXPIRE || '30d'
```

## Setup Backend

### 1. Tạo file .env
Tạo file `.env` trong thư mục `backend/` với nội dung:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/onlineshop?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=30d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:5175

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000

# Server
PORT=3000
NODE_ENV=development
```

### 2. Cài đặt dependencies
```bash
cd backend
npm install
```

### 3. Chạy backend
```bash
npm start
# hoặc
node src/index.js
```

### 4. Kiểm tra
- Backend chạy trên: http://localhost:3000
- Health check: http://localhost:3000/health
- API docs: http://localhost:3000/api

## Lưu ý

### Rate Limiting
- **Window**: 15 phút (900000ms)
- **Max requests**: 1000 requests per IP per window
- **Message**: Trả về JSON format thay vì plain text

### JWT Token
- **Expire time**: 30 ngày (có thể thay đổi trong .env)
- **Secret**: Phải là chuỗi dài và random

### Google OAuth
- Cần setup Google OAuth credentials
- Redirect URI: `http://localhost:3000/api/auth/google/callback`

## Troubleshooting

### Lỗi "Too many requests"
- Tăng `RATE_LIMIT_MAX_REQUESTS` trong .env
- Hoặc tăng `RATE_LIMIT_WINDOW_MS` để mở rộng window

### Lỗi JWT
- Kiểm tra `JWT_SECRET` có đủ dài và random
- Kiểm tra `JWT_EXPIRE` format đúng

### Lỗi MongoDB
- Kiểm tra `MONGODB_URI` có đúng format
- Kiểm tra network connection
- Kiểm tra credentials

# OnlineShopMini - Phone Store

## 🚀 Quick Start

### 1. Backend Setup (Mock Data - No Database Required!)
```bash
cd backend
npm install
npm run dev     # Chạy server trên port 3000
```

**Hoặc sử dụng script:**
- **Windows**: `start.bat`
- **Linux/Mac**: `./start.sh`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev     # Chạy frontend trên port 5173
```

## 📋 Features

### ✅ Completed
- **Frontend**: React với Vite
- **Backend**: Node.js + Express + MongoDB
- **CRUD API**: Đầy đủ cho phones
- **Pagination**: 20 sản phẩm/trang
- **Filtering**: Brand, category, price range
- **Search**: Tìm kiếm theo tên và brand
- **Sorting**: Theo giá, rating, tên
- **Responsive**: Mobile-friendly
- **Fallback**: Sử dụng mock data khi backend không có

### 🔧 API Endpoints
- `GET /api/phones` - Lấy danh sách phones với filter/pagination
- `GET /api/phones/:id` - Lấy chi tiết phone
- `POST /api/phones` - Tạo phone mới
- `PUT /api/phones/:id` - Cập nhật phone
- `DELETE /api/phones/:id` - Xóa phone
- `GET /api/phones/search` - Tìm kiếm phones
- `GET /api/phones/compare` - So sánh phones

## 🛠️ Troubleshooting

### Lỗi "Failed to fetch" hoặc "search is not defined"
1. **Kiểm tra backend có chạy không:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Kiểm tra port:**
   - Backend chạy trên port 3000 (không phải 5000)
   - Frontend chạy trên port 5173

3. **Frontend tự động fallback:**
   - Nếu backend không chạy, frontend sẽ tự động sử dụng mock data
   - Không cần lo lỗi "Failed to fetch"
   - Tất cả tính năng vẫn hoạt động bình thường

### Không cần:
- ❌ MongoDB installation
- ❌ Database setup
- ❌ Environment variables
- ❌ Seed scripts

## 📁 Project Structure
```
OnlineShopMini/
├── backend/
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── scripts/      # Seed scripts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── data/         # Mock data
│   └── package.json
└── README.md
```

## 🎯 Next Steps
- [ ] Authentication (Login/Register)
- [ ] Shopping Cart
- [ ] Order Management
- [ ] Payment Integration
- [ ] Admin Dashboard
- [ ] Product Reviews
- [ ] Wishlist
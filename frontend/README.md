# Frontend - Online Shop Mini (JavaScript)

Frontend cho trang web bán điện thoại sử dụng React + Vite + JavaScript.

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```
App sẽ chạy tại: `http://localhost:5173`

### 3. Build production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

## 📁 Cấu trúc thư mục

```
src/
├── components/     # React components
├── pages/         # Page components
├── hooks/         # Custom hooks
├── store/         # Zustand state management
├── utils/         # Helper functions
├── services/      # API services
├── assets/        # Static assets
├── App.jsx        # Main App component
└── main.jsx       # Entry point
```

## 📦 Dependencies chính

### Core
- **React 19.1.1** - UI library
- **React DOM** - DOM rendering
- **Vite** - Build tool và dev server

### Routing
- **React Router DOM** - Client-side routing

### State Management
- **Zustand** - Lightweight state management

### Data Fetching
- **Axios** - HTTP client
- **TanStack React Query** - Server state management

### Forms
- **React Hook Form** - Form handling

## 🔧 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run clean` - Xóa thư mục dist

## 🎨 Tính năng sẽ có

### Trang chủ
- Hero section với banner điện thoại hot
- Danh sách điện thoại nổi bật
- Categories theo brand
- Search bar

### Catalog điện thoại
- Danh sách điện thoại với pagination
- Filter theo: brand, giá, RAM, ROM, camera
- Sort theo: giá, rating, mới nhất
- Grid/List view toggle

### Chi tiết sản phẩm
- Image gallery với zoom
- Specifications chi tiết
- Reviews và ratings
- Related products
- Add to cart

### Giỏ hàng & Checkout
- Cart management
- Shipping calculator
- Payment integration
- Order tracking

### User Account
- Login/Register
- Profile management
- Order history
- Wishlist

### Admin Panel
- Product management
- Order management
- User management
- Analytics dashboard

## 🔗 API Integration

Frontend sẽ tích hợp với backend API:

- **Base URL**: `http://localhost:3000/api`
- **Authentication**: JWT tokens
- **Endpoints**:
  - `/auth/*` - Authentication
  - `/phones/*` - Phone management
  - `/orders/*` - Order management
  - `/users/*` - User management

## 📱 Responsive Design

- **Mobile First**: Tối ưu cho mobile
- **Breakpoints**:
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+

## 🚨 Lưu ý quan trọng

1. **API Base URL**: Cập nhật trong config khi deploy
2. **Environment Variables**: Sử dụng `.env` cho config
3. **CORS**: Backend phải allow frontend origin
4. **JWT Storage**: Sử dụng secure storage cho tokens

## 🔧 Development Tips

### Hot Reload
Vite hỗ trợ hot reload tự động khi save file.

### ESLint
Code sẽ được lint tự động, fix errors với:
```bash
npm run lint:fix
```

### State Management
Sử dụng Zustand cho global state:
```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  phones: [],
  setPhones: (phones) => set({ phones }),
}))
```

### API Calls
Sử dụng React Query cho server state:
```javascript
import { useQuery } from '@tanstack/react-query'

const { data, isLoading } = useQuery({
  queryKey: ['phones'],
  queryFn: fetchPhones
})
```
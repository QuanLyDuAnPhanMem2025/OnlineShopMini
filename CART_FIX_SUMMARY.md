# Sửa lỗi giỏ hàng bị reset khi click logo

## Vấn đề
Khi user đăng nhập và thêm sản phẩm vào giỏ hàng, sau đó click vào logo "PhoneStore" trên header để về trang chủ, giỏ hàng bị reset và mất hết sản phẩm đã thêm.

## Nguyên nhân
1. **Logo sử dụng `<a href="/">` thay vì React Router**: Điều này khiến trang bị reload hoàn toàn, làm mất state của React Context.
2. **CartContext không có persistence**: Giỏ hàng chỉ lưu trong memory, không được lưu vào localStorage.

## Giải pháp đã thực hiện

### 1. Sửa Header.jsx
- Thay thế `<a href="/">` bằng `<button onClick={() => navigate('/')}>`
- Sử dụng React Router's `navigate()` để điều hướng mà không reload trang
- Giữ nguyên styling bằng cách thêm inline styles

### 2. Thêm localStorage persistence cho CartContext
- **Load cart từ localStorage**: Thêm function `getInitialCart()` để load cart đã lưu khi khởi tạo
- **Save cart vào localStorage**: Thêm `useEffect` để tự động lưu cart mỗi khi state thay đổi
- **Clear cart khi logout**: Thêm logic để clear cart khi user đăng xuất, tránh conflict giữa các user

## Code changes

### Header.jsx
```jsx
// Trước
<a href="/" className="logo">
  PhoneStore
</a>

// Sau
<button 
  className="logo" 
  onClick={() => navigate('/')}
  style={{ 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    color: 'inherit'
  }}
>
  PhoneStore
</button>
```

### CartContext.jsx
```jsx
// Thêm import useEffect
import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

// Load cart từ localStorage
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [] };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: [] };
  }
};

// Save cart vào localStorage
useEffect(() => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}, [state]);

// Clear cart khi logout
useEffect(() => {
  if (!isAuthenticated) {
    dispatch({ type: 'CLEAR_CART' });
  }
}, [isAuthenticated]);
```

## Kết quả
- ✅ Giỏ hàng không bị mất khi click logo để về trang chủ
- ✅ Giỏ hàng được lưu vào localStorage, persist qua các lần reload trang
- ✅ Giỏ hàng được clear khi user logout để tránh conflict
- ✅ Navigation mượt mà không reload trang
- ✅ Giữ nguyên UI/UX như cũ

## Test cases
1. Đăng nhập → Thêm sản phẩm vào giỏ → Click logo → Giỏ hàng vẫn còn
2. Đăng nhập → Thêm sản phẩm vào giỏ → Reload trang → Giỏ hàng vẫn còn
3. Đăng nhập → Thêm sản phẩm vào giỏ → Logout → Giỏ hàng bị clear
4. Đăng nhập user khác → Giỏ hàng riêng biệt

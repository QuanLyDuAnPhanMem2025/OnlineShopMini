# Giỏ hàng riêng biệt theo từng user

## Tính năng mới
Mỗi user sẽ có giỏ hàng riêng biệt, được lưu theo user ID. Khi user đăng nhập lại, giỏ hàng của họ sẽ được khôi phục.

## Cách hoạt động

### 1. Lưu trữ giỏ hàng
- **Trước**: Tất cả user dùng chung `localStorage.getItem('cart')`
- **Sau**: Mỗi user có key riêng `localStorage.getItem('cart_${userId}')`

### 2. Khi user đăng nhập
- Load giỏ hàng từ `cart_${userId}`
- Nếu chưa có giỏ hàng, tạo mới với `{ items: [] }`

### 3. Khi user đăng xuất
- Clear giỏ hàng hiện tại
- Giỏ hàng của user vẫn được lưu trong localStorage

### 4. Khi chuyển đổi user
- User A đăng nhập → Load giỏ hàng của User A
- User B đăng nhập → Load giỏ hàng của User B
- Mỗi user chỉ thấy giỏ hàng của mình

## Code changes

### CartContext.jsx
```javascript
// Load cart based on user ID
const getInitialCart = () => {
  if (!user?.id) return { items: [] };
  const cartKey = `cart_${user.id}`;
  const savedCart = localStorage.getItem(cartKey);
  return savedCart ? JSON.parse(savedCart) : { items: [] };
};

// Save cart based on user ID
useEffect(() => {
  if (user?.id) {
    const cartKey = `cart_${user.id}`;
    localStorage.setItem(cartKey, JSON.stringify(state));
  }
}, [state, user?.id]);

// Load user's cart when user changes
useEffect(() => {
  if (user?.id && user.id !== previousUser?.id) {
    const cartKey = `cart_${user.id}`;
    const savedCart = localStorage.getItem(cartKey);
    const cartData = savedCart ? JSON.parse(savedCart) : { items: [] };
    dispatch({ type: 'LOAD_CART', payload: cartData });
  }
}, [isAuthenticated, user, previousUser]);
```

### Cart Reducer
```javascript
case 'LOAD_CART':
  return {
    ...state,
    items: action.payload.items || [],
  };
```

## Ví dụ sử dụng

### User A (ID: 123)
- Thêm iPhone vào giỏ → Lưu vào `cart_123`
- Đăng xuất → Giỏ hàng vẫn lưu trong `cart_123`
- Đăng nhập lại → Load giỏ hàng từ `cart_123`

### User B (ID: 456)
- Thêm Samsung vào giỏ → Lưu vào `cart_456`
- Không thấy iPhone của User A
- Chỉ thấy Samsung của mình

### Admin (ID: 789)
- Có giỏ hàng riêng `cart_789`
- Không ảnh hưởng đến giỏ hàng của user khác

## Lợi ích

1. **Riêng tư**: Mỗi user chỉ thấy giỏ hàng của mình
2. **Persistent**: Giỏ hàng được lưu khi đăng xuất
3. **Multi-user**: Nhiều user có thể sử dụng cùng lúc
4. **Admin support**: Admin có giỏ hàng riêng
5. **Data isolation**: Không bị conflict giữa các user

## Lưu ý

- Giỏ hàng được lưu trong localStorage của browser
- Nếu user xóa browser data, giỏ hàng sẽ mất
- Mỗi user có thể có tối đa 1 giỏ hàng
- Giỏ hàng không sync giữa các thiết bị khác nhau

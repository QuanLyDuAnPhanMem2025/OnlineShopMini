# Sửa lỗi giỏ hàng bị mất khi đăng xuất

## Vấn đề
Khi user đăng xuất, giỏ hàng bị mất hoàn toàn. Điều này không hợp lý vì giỏ hàng nên được giữ lại cho user đó khi họ đăng nhập lại.

## Nguyên nhân
Trong `CartContext.jsx`, có logic clear cart khi `!isAuthenticated`:

```javascript
// Clear cart when user logs out
useEffect(() => {
  if (!isAuthenticated) {
    dispatch({ type: 'CLEAR_CART' });
  }
}, [isAuthenticated]);
```

Vấn đề là logic này sẽ clear cart trong 2 trường hợp:
1. **Khi app khởi động** - user chưa đăng nhập (`isAuthenticated = false`)
2. **Khi user logout** - user đã đăng nhập trước đó rồi logout

Điều này khiến giỏ hàng bị mất ngay cả khi user chỉ đăng xuất tạm thời.

## Giải pháp đã thực hiện

### 1. Thêm state tracking user ✅
```javascript
const [previousUser, setPreviousUser] = useState(null);
```

### 2. Sửa logic clear cart ✅
Thay thế logic cũ:
```javascript
// CŨ - Clear cart khi không authenticated
useEffect(() => {
  if (!isAuthenticated) {
    dispatch({ type: 'CLEAR_CART' });
  }
}, [isAuthenticated]);
```

Bằng logic mới:
```javascript
// MỚI - Chỉ clear cart khi user thực sự logout
useEffect(() => {
  if (previousUser && !isAuthenticated) {
    // User logged out - clear cart
    dispatch({ type: 'CLEAR_CART' });
  }
  setPreviousUser(user);
}, [isAuthenticated, user, previousUser]);
```

## Logic hoạt động

### Trước khi sửa:
- **App khởi động**: `isAuthenticated = false` → Clear cart ❌
- **User login**: `isAuthenticated = true` → Không clear cart ✅
- **User logout**: `isAuthenticated = false` → Clear cart ❌

### Sau khi sửa:
- **App khởi động**: `previousUser = null`, `isAuthenticated = false` → Không clear cart ✅
- **User login**: `previousUser = null`, `isAuthenticated = true` → Không clear cart ✅
- **User logout**: `previousUser = user`, `isAuthenticated = false` → Clear cart ✅

## Kết quả

### ✅ **Giỏ hàng được giữ lại khi:**
- App khởi động (user chưa đăng nhập)
- User đăng nhập
- User refresh trang
- User navigate giữa các trang

### ✅ **Giỏ hàng chỉ bị clear khi:**
- User thực sự đăng xuất (logout)

### ✅ **Tính năng khác vẫn hoạt động:**
- localStorage persistence
- Cart state management
- Add/remove/update items
- Selection management

## Lưu ý
- Giỏ hàng vẫn được lưu vào localStorage
- Khi user đăng nhập lại, giỏ hàng sẽ được load từ localStorage
- Chỉ khi user logout thì giỏ hàng mới bị clear
- Logic này đảm bảo user experience tốt hơn

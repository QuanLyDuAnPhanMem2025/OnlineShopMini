# Sửa lỗi giỏ hàng biến mất khi logout/login lại

## Vấn đề
Khi user logout rồi login lại, giỏ hàng biến mất mặc dù đã được lưu trong localStorage.

## Nguyên nhân
Logic load cart chỉ chạy khi `user.id !== previousUser?.id`, nhưng khi logout rồi login lại cùng user thì `user.id` giống nhau, nên không load cart.

## Giải pháp

### Trước khi sửa:
```javascript
} else if (user?.id && user.id !== previousUser?.id) {
  // Chỉ load cart khi user ID thay đổi
  // Vấn đề: Cùng user logout/login lại thì ID không đổi
}
```

### Sau khi sửa:
```javascript
} else if (user?.id && isAuthenticated) {
  // Load cart khi user đã authenticated
  // Bất kể là user mới hay user cũ login lại
}
```

## Logic hoạt động

### Khi user đăng nhập:
1. `isAuthenticated = true`
2. `user.id` có giá trị
3. Load cart từ `cart_${user.id}`
4. Hiển thị giỏ hàng đã lưu

### Khi user đăng xuất:
1. `isAuthenticated = false`
2. Clear cart hiện tại
3. Giỏ hàng vẫn lưu trong localStorage

### Khi user login lại:
1. `isAuthenticated = true` (trigger useEffect)
2. `user.id` có giá trị
3. Load cart từ localStorage
4. Hiển thị giỏ hàng cũ

## Test case

### Scenario 1: Cùng user logout/login
1. User A đăng nhập → Thêm sản phẩm → Giỏ hàng: [iPhone]
2. User A logout → Giỏ hàng clear (nhưng lưu trong localStorage)
3. User A login lại → Load cart từ localStorage → Giỏ hàng: [iPhone] ✅

### Scenario 2: Chuyển đổi user
1. User A đăng nhập → Thêm iPhone → Giỏ hàng: [iPhone]
2. User A logout → User B đăng nhập → Thêm Samsung → Giỏ hàng: [Samsung]
3. User B logout → User A login lại → Load cart của User A → Giỏ hàng: [iPhone] ✅

## Kết quả
- ✅ Giỏ hàng persistent khi logout/login lại
- ✅ Mỗi user có giỏ hàng riêng
- ✅ Không bị mất dữ liệu khi chuyển đổi user
- ✅ Hoạt động với cả user thường và admin

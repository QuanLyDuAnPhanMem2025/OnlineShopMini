# Debug Google OAuth Authentication

## Vấn đề hiện tại
Google authentication trả về lỗi "Google authentication failed" khi user đăng nhập.

## Các bước debug

### 1. Kiểm tra Google OAuth Credentials
Đảm bảo file `.env` có đầy đủ thông tin:
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

### 2. Kiểm tra Google Console
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project của bạn
3. Vào **APIs & Services** > **Credentials**
4. Kiểm tra **OAuth 2.0 Client IDs**
5. Đảm bảo **Authorized redirect URIs** có:
   - `http://localhost:3000/api/auth/google/callback`

### 3. Restart Backend với Logging
```bash
cd backend
npm start
```

### 4. Test Google Login
1. Mở browser và truy cập: `http://localhost:3000/api/auth/google`
2. Đăng nhập với Google account
3. Xem console backend để debug

### 5. Kiểm tra Console Logs
Backend sẽ hiển thị các log sau:
```
Google OAuth Profile: { id: '...', email: '...', name: '...' }
User found/created: user@example.com
Google Callback - Error: null
Google Callback - User: user@example.com
Generated token for user: user@example.com
Redirecting to: http://localhost:5173/auth/success?token=...
```

## Các lỗi thường gặp

### 1. "redirect_uri_mismatch"
- **Nguyên nhân**: Redirect URI trong Google Console không khớp
- **Giải pháp**: Thêm `http://localhost:3000/api/auth/google/callback` vào Authorized redirect URIs

### 2. "invalid_client"
- **Nguyên nhân**: GOOGLE_CLIENT_ID hoặc GOOGLE_CLIENT_SECRET sai
- **Giải pháp**: Kiểm tra lại credentials trong .env

### 3. "access_denied"
- **Nguyên nhân**: User từ chối permission
- **Giải pháp**: User cần accept permission khi đăng nhập

### 4. Database Error
- **Nguyên nhân**: Lỗi khi tạo/find user trong database
- **Giải pháp**: Kiểm tra MongoDB connection và User model

## Test với Postman
```bash
GET http://localhost:3000/api/auth/google
```

## Test Callback trực tiếp
```bash
GET http://localhost:3000/api/auth/google/callback?code=...
```

## Lưu ý
- Đảm bảo backend đang chạy trên port 3000
- Đảm bảo frontend đang chạy trên port 5173
- Kiểm tra CORS settings
- Kiểm tra rate limiting không chặn requests

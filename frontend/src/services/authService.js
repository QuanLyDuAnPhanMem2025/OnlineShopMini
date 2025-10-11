const API_BASE_URL = 'http://localhost:3000/api';

// Auth API service
export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      return data;
    } catch (error) {
      console.error('Auth service error:', error);
      console.log('Using mock auth for login');
      // Mock login for development
      if (email === 'admin@phonestore.com' && password === '123456') {
        return {
          success: true,
          data: {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: '1',
              email: 'admin@phonestore.com',
              firstName: 'Admin',
              lastName: 'User',
              role: 'admin'
            }
          }
        };
      } else if (email === 'user@phonestore.com' && password === '123456') {
        return {
          success: true,
          data: {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: '2',
              email: 'user@phonestore.com',
              firstName: 'John',
              lastName: 'Doe',
              role: 'user'
            }
          }
        };
      } else {
        throw new Error('Email hoặc mật khẩu không đúng');
      }
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }

      return data;
    } catch (error) {
      console.log('Using mock auth for register');
      // Mock register for development
      return {
        success: true,
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: Date.now().toString(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'user'
          }
        }
      };
    }
  },

  // Get current user
  getMe: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, using mock auth for getMe');
        return {
          success: true,
          data: {
            user: {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              role: 'user'
            }
          }
        };
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể lấy thông tin người dùng');
      }

      return data;
    } catch (error) {
      console.log('Using mock auth for getMe');
      // Mock getMe for development
      const token = localStorage.getItem('token');
      if (token && token.includes('mock-jwt-token')) {
        return {
          success: true,
          data: {
            user: {
              id: '1',
              email: 'user@phonestore.com',
              firstName: 'John',
              lastName: 'Doe',
              role: 'user'
            }
          }
        };
      } else {
        throw new Error('Token không hợp lệ');
      }
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể làm mới token');
      }

      return data;
    } catch (error) {
      console.log('Using mock auth for refreshToken');
      // Mock refresh token for development
      return {
        success: true,
        data: {
          token: 'mock-jwt-token-' + Date.now()
        }
      };
    }
  },

  // Google OAuth login
  googleLogin: () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  // Handle Google OAuth success
  handleGoogleSuccess: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google/success?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Google đăng nhập thất bại');
      }

      return data;
    } catch (error) {
      console.error('Google OAuth error:', error);
      throw error;
    }
  }
};

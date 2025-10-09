import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import LoginModal from './LoginModal';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const cartItemCount = getTotalItems();

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    navigate('/cart');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="/" className="logo">
            PhoneStore
          </a>
          
              <div className="header-actions">
                <button className="cart-btn" onClick={handleCartClick}>
              <span className="cart-text">Giỏ hàng</span>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="user-menu">
                <button 
                  className="user-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <span className="user-avatar">
                    {user?.firstName?.charAt(0) || 'U'}
                  </span>
                  <span className="user-name">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <div className="user-email">{user?.email}</div>
                      <div className="user-role">
                        {user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                        <button 
                          className="dropdown-item"
                          onClick={() => navigate('/profile')}
                        >
                          Tài khoản của tôi
                        </button>
                        <button className="dropdown-item">
                          Đơn hàng
                        </button>
                    {user?.role === 'admin' && (
                      <button className="dropdown-item">
                        Quản trị
                      </button>
                    )}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-btn" onClick={handleLogin}>
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </header>
  );
};

export default Header;
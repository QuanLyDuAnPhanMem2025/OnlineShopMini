import { useState } from 'react';
import { mockCartItems } from '../data/mockData';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = mockCartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // TODO: Implement search functionality
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="/" className="logo">
            PhoneStore
          </a>
          
          <div className="header-actions">
            <form onSubmit={handleSearch} className="search-box">
              <input
                type="text"
                placeholder="Tìm kiếm điện thoại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Tìm</button>
            </form>

            <button className="cart-btn">
              <span className="cart-text">Giỏ hàng</span>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
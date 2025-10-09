import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    toggleSelection,
    selectAll,
    unselectAll,
    removeSelected,
    getSelectedItems,
    getSelectedItemsCount,
    getSelectedTotalPrice,
    clearCart 
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      updateQuantity(cartItemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
      return;
    }
    navigate('/checkout');
  };

  const selectedItems = getSelectedItems();
  const selectedCount = getSelectedItemsCount();
  const selectedTotal = getSelectedTotalPrice();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="app">
          <Header />
          <div className="cart-page">
            <div className="container">
              <div className="cart-header">
                <h1>Giỏ hàng của bạn</h1>
                <p>Quản lý các sản phẩm trong giỏ hàng</p>
              </div>
              
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h2>Giỏ hàng trống</h2>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/')}
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="app">
        <Header />
        <div className="cart-page">
          <div className="container">
            <div className="cart-header">
              <h1>Giỏ hàng của bạn</h1>
              <p>Quản lý các sản phẩm trong giỏ hàng</p>
            </div>

            <div className="cart-content">
              <div className="cart-items">
                <div className="cart-items-header">
                  <div className="cart-header-left">
                    <label className="select-all-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === items.length && items.length > 0}
                        onChange={() => {
                          if (selectedItems.length === items.length) {
                            unselectAll();
                          } else {
                            selectAll();
                          }
                        }}
                      />
                      <span>Chọn tất cả ({items.length})</span>
                    </label>
                  </div>
                  <div className="cart-header-actions">
                    {selectedItems.length > 0 && (
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={removeSelected}
                      >
                        Xóa đã chọn ({selectedItems.length})
                      </button>
                    )}
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={clearCart}
                    >
                      Xóa tất cả
                    </button>
                  </div>
                </div>

                <div className="cart-items-list">
                  {items.map((item) => (
                    <div key={item.cartItemId} className={`cart-item ${!item.selected ? 'unselected' : ''}`}>
                      <div className="cart-item-checkbox">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleSelection(item.cartItemId)}
                        />
                      </div>
                      <div className="cart-item-image">
                        <img 
                          src={item.thumbnail || item.image || '/api/placeholder/150/150'} 
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA0MEM4NS41IDQwIDk0IDQ4LjUgOTQgNTlDOTQgNjkuNSA4NS41IDc4IDc1IDc4QzY0LjUgNzggNTYgNjkuNSA1NiA1OUM1NiA0OC41IDY0LjUgNDAgNzUgNDBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik03NSA2MkM3OC44NjYgNjIgODIgNTguODY2IDgyIDU1QzgyIDUxLjEzNCA3OC44NjYgNDggNzUgNDhDNzEuMTM0IDQ4IDY4IDUxLjEzNCA2OCA1NUM2OCA1OC44NjYgNzEuMTM0IDYyIDc1IDYyWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>

                      <div className="cart-item-info">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-brand">{item.brand}</p>
                        <div className="cart-item-specs">
                          <span>{item.specifications?.performance?.storage || item.model}</span>
                          {item.specifications?.design?.colors && (
                            <span> • {item.specifications.design.colors[0]}</span>
                          )}
                        </div>
                      </div>

                      <div className="cart-item-quantity">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-price">
                        <div className="current-price">{formatPrice(item.price || item.currentPrice)}</div>
                        {item.originalPrice && item.originalPrice > (item.price || item.currentPrice) && (
                          <div className="original-price">{formatPrice(item.originalPrice)}</div>
                        )}
                      </div>

                      <div className="cart-item-total">
                        <div className="total-price">
                          {formatPrice((item.price || item.currentPrice) * item.quantity)}
                        </div>
                      </div>

                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.cartItemId)}
                        title="Xóa sản phẩm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart-summary">
                <div className="summary-card">
                  <h3>Tóm tắt đơn hàng</h3>
                  
                  {selectedItems.length > 0 ? (
                    <>
                      <div className="summary-info">
                        <span>Đã chọn {selectedCount} sản phẩm</span>
                      </div>
                      
                      <div className="summary-row">
                        <span>Tạm tính:</span>
                        <span>{formatPrice(selectedTotal)}</span>
                      </div>
                      
                      <div className="summary-row">
                        <span>Phí vận chuyển:</span>
                        <span className={selectedTotal >= 500000 ? 'free-shipping' : ''}>
                          {selectedTotal >= 500000 ? 'Miễn phí' : formatPrice(30000)}
                        </span>
                      </div>
                      
                      <div className="summary-divider"></div>
                      
                      <div className="summary-row total">
                        <span>Tổng cộng:</span>
                        <span>{formatPrice(selectedTotal + (selectedTotal >= 500000 ? 0 : 30000))}</span>
                      </div>
                    </>
                  ) : (
                    <div className="no-selection">
                      <p>Vui lòng chọn sản phẩm để thanh toán</p>
                    </div>
                  )}

                  <button 
                    className="btn btn-primary btn-full checkout-btn"
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                  >
                    Thanh toán ({selectedCount})
                  </button>

                  <button 
                    className="btn btn-outline btn-full"
                    onClick={() => navigate('/')}
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/api';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';

const CheckoutPage = () => {
  const { selectedItems, selectedTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    district: '',
    ward: '',
    note: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validation
    const requiredFields = ['firstName', 'lastName', 'phone', 'street', 'city', 'district', 'ward'];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setError(`Vui lòng nhập ${getFieldLabel(field)}`);
        setLoading(false);
        return;
      }
    }

    try {
      // Prepare order data
      const orderData = {
        items: selectedItems.map(item => ({
          phoneId: item.id || item._id,
          quantity: item.quantity
        })),
        shippingAddress: formData,
        paymentMethod,
        notes: formData.note
      };

      console.log('Creating order with data:', orderData);

      // Call API to create order
      const response = await orderService.createOrder(orderData);
      
      console.log('Order creation response:', response);
      
      if (response.success) {
        // Clear cart and redirect
        clearCart();
        alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
        navigate('/profile?tab=orders');
      } else {
        throw new Error('Failed to create order');
      }
      
    } catch (err) {
      console.error('Order creation error:', err);
      setError(err.message || 'Có lỗi xảy ra khi đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  const getFieldLabel = (field) => {
    const labels = {
      firstName: 'họ',
      lastName: 'tên',
      phone: 'số điện thoại',
      street: 'địa chỉ',
      city: 'thành phố',
      district: 'quận/huyện',
      ward: 'phường/xã'
    };
    return labels[field] || field;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const subtotal = selectedTotalPrice;
  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  if (selectedItems.length === 0) {
    return (
      <ProtectedRoute>
        <div className="app">
          <Header />
          <div className="checkout-page">
            <div className="container">
              <div className="empty-cart">
                <h2>Không có sản phẩm được chọn</h2>
                <p>Bạn cần chọn ít nhất một sản phẩm để thanh toán.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/cart')}
                >
                  Quay lại giỏ hàng
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
        <div className="checkout-page">
          <div className="container">
            <div className="checkout-header">
              <h1>Thanh toán</h1>
              <p>Hoàn tất đơn hàng của bạn</p>
            </div>

            <div className="checkout-content">
              <div className="checkout-form-section">
                <form onSubmit={handleSubmit} className="checkout-form">
                  {/* Shipping Information */}
                  <div className="form-section">
                    <h2>Thông tin giao hàng</h2>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">Họ *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Tên *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Số điện thoại *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="street">Địa chỉ *</label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="Số nhà, tên đường"
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city">Thành phố *</label>
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Chọn thành phố</option>
                          <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                          <option value="Hà Nội">Hà Nội</option>
                          <option value="Đà Nẵng">Đà Nẵng</option>
                          <option value="Cần Thơ">Cần Thơ</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="district">Quận/Huyện *</label>
                        <input
                          type="text"
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="ward">Phường/Xã *</label>
                      <input
                        type="text"
                        id="ward"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="note">Ghi chú</label>
                      <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Ghi chú thêm cho đơn hàng..."
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="form-section">
                    <h2>Phương thức thanh toán</h2>
                    <div className="payment-methods">
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className="payment-info">
                          <span className="payment-name">Thanh toán khi nhận hàng (COD)</span>
                          <span className="payment-desc">Thanh toán bằng tiền mặt khi nhận hàng</span>
                        </div>
                      </label>

                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank_transfer"
                          checked={paymentMethod === 'bank_transfer'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className="payment-info">
                          <span className="payment-name">Chuyển khoản ngân hàng</span>
                          <span className="payment-desc">Chuyển khoản trước khi giao hàng</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <div className="checkout-actions">
                    <button 
                      type="button" 
                      className="btn btn-outline"
                      onClick={() => navigate('/cart')}
                    >
                      Quay lại giỏ hàng
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-card">
                  <h3>Tóm tắt đơn hàng</h3>
                  
                  <div className="order-items">
                    {selectedItems.map((item) => (
                      <div key={item.cartItemId} className="order-item">
                        <img 
                          src={item.thumbnail || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'} 
                          alt={item.name}
                          className="item-image"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300';
                          }}
                        />
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p>{item.brand}</p>
                          <span className="item-quantity">x{item.quantity}</span>
                        </div>
                        <div className="item-price">
                          {formatPrice((item.price || item.currentPrice) * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span className={shippingFee === 0 ? 'free-shipping' : ''}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPage;

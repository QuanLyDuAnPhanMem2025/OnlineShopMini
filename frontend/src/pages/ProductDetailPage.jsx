import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import { phoneService, formatPrice } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);
  const [relatedPhones, setRelatedPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSpecTab, setSelectedSpecTab] = useState('overview');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadPhoneDetail();
  }, [id]);

  const loadPhoneDetail = async () => {
    try {
      setLoading(true);
      const response = await phoneService.getPhone(id);
      
      if (response.success) {
        setPhone(response.data.phone);
        setRelatedPhones(response.data.relatedPhones || []);
      } else {
        setError('Không tìm thấy sản phẩm');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    try {
      addToCart(phone);
      alert(`Đã thêm ${phone.name} vào giỏ hàng!`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBuyNow = () => {
    console.log('Buy now:', phone.name);
    alert(`Mua ngay ${phone.name}!`);
  };

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  if (error || !phone) {
    return (
      <div className="app">
        <Header />
        <div className="error">Lỗi: {error || 'Không tìm thấy sản phẩm'}</div>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const discount = phone.originalPrice > phone.price 
    ? Math.round(((phone.originalPrice - phone.price) / phone.originalPrice) * 100)
    : 0;

  return (
    <div className="app">
      <Header />
      
      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-link">
            Trang chủ
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{phone.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="product-detail">
          <div className="product-detail-grid">
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <img 
                  src={phone.images[selectedImageIndex] || phone.thumbnail} 
                  alt={phone.name}
                  className="product-detail-image"
                />
                {discount > 0 && (
                  <div className="discount-badge-large">
                    Giảm {discount}%
                  </div>
                )}
              </div>
              
              {phone.images.length > 1 && (
                <div className="thumbnail-images">
                  {phone.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${phone.name} ${index + 1}`}
                      className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-brand">{phone.brand}</div>
              <h1 className="product-title">{phone.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  ⭐ {phone.averageRating.toFixed(1)}
                </div>
                <span className="rating-text">({phone.reviewCount} đánh giá)</span>
              </div>

              <div className="product-price-section">
                <div className="current-price">{formatPrice(phone.price)}</div>
                {phone.originalPrice > phone.price && (
                  <div className="original-price">{formatPrice(phone.originalPrice)}</div>
                )}
              </div>

              <div className="product-description">
                <h3>Mô tả sản phẩm</h3>
                <p>{phone.description}</p>
              </div>

              <div className="product-actions">
                <button onClick={handleAddToCart} className="btn btn-outline btn-large">
                  Thêm vào giỏ hàng
                </button>
                <button onClick={handleBuyNow} className="btn btn-primary btn-large">
                  Mua ngay
                </button>
              </div>

              <div className="product-features">
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <span>Miễn phí vận chuyển</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔄</span>
                  <span>Đổi trả trong 7 ngày</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <span>Bảo hành chính hãng</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Tabs */}
          <div className="specifications-section">
            <div className="spec-tabs">
              <button 
                className={`spec-tab ${selectedSpecTab === 'overview' ? 'active' : ''}`}
                onClick={() => setSelectedSpecTab('overview')}
              >
                Tổng quan
              </button>
              <button 
                className={`spec-tab ${selectedSpecTab === 'display' ? 'active' : ''}`}
                onClick={() => setSelectedSpecTab('display')}
              >
                Màn hình
              </button>
              <button 
                className={`spec-tab ${selectedSpecTab === 'camera' ? 'active' : ''}`}
                onClick={() => setSelectedSpecTab('camera')}
              >
                Camera
              </button>
              <button 
                className={`spec-tab ${selectedSpecTab === 'performance' ? 'active' : ''}`}
                onClick={() => setSelectedSpecTab('performance')}
              >
                Hiệu năng
              </button>
            </div>

            <div className="spec-content">
              {selectedSpecTab === 'overview' && (
                <div className="spec-grid">
                  <div className="spec-item">
                    <span className="spec-label">Thương hiệu:</span>
                    <span className="spec-value">{phone.brand}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Model:</span>
                    <span className="spec-value">{phone.model}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">SKU:</span>
                    <span className="spec-value">{phone.sku}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Danh mục:</span>
                    <span className="spec-value">{phone.subcategory}</span>
                  </div>
                </div>
              )}

              {selectedSpecTab === 'display' && (
                <div className="spec-grid">
                  <div className="spec-item">
                    <span className="spec-label">Kích thước:</span>
                    <span className="spec-value">{phone.specifications.display.size}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Độ phân giải:</span>
                    <span className="spec-value">{phone.specifications.display.resolution}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Công nghệ:</span>
                    <span className="spec-value">{phone.specifications.display.technology}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Tần số quét:</span>
                    <span className="spec-value">{phone.specifications.display.refreshRate}</span>
                  </div>
                </div>
              )}

              {selectedSpecTab === 'camera' && (
                <div className="spec-grid">
                  <div className="spec-item">
                    <span className="spec-label">Camera chính:</span>
                    <span className="spec-value">{phone.specifications.camera.rear.main}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Camera góc rộng:</span>
                    <span className="spec-value">{phone.specifications.camera.rear.ultraWide}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Camera telephoto:</span>
                    <span className="spec-value">{phone.specifications.camera.rear.telephoto}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Camera trước:</span>
                    <span className="spec-value">{phone.specifications.camera.front}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Quay video:</span>
                    <span className="spec-value">{phone.specifications.camera.video}</span>
                  </div>
                </div>
              )}

              {selectedSpecTab === 'performance' && (
                <div className="spec-grid">
                  <div className="spec-item">
                    <span className="spec-label">Chipset:</span>
                    <span className="spec-value">{phone.specifications.performance.chipset}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">RAM:</span>
                    <span className="spec-value">{phone.specifications.performance.ram}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Bộ nhớ:</span>
                    <span className="spec-value">{phone.specifications.performance.storage}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Hệ điều hành:</span>
                    <span className="spec-value">{phone.specifications.performance.os}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Pin:</span>
                    <span className="spec-value">{phone.specifications.battery.capacity}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Sạc:</span>
                    <span className="spec-value">{phone.specifications.battery.charging}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedPhones.length > 0 && (
            <div className="related-products" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                Sản phẩm liên quan
              </h2>
              <div className="related-products-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1rem' 
              }}>
                {relatedPhones.map(relatedPhone => (
                  <div 
                    key={relatedPhone._id} 
                    className="related-product-card"
                    onClick={() => navigate(`/product/${relatedPhone._id}`)}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: '#fff'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <img 
                      src={relatedPhone.thumbnail} 
                      alt={relatedPhone.name}
                      className="related-product-image"
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: '0.75rem'
                      }}
                    />
                    <div className="related-product-info">
                      <h4 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '500', 
                        marginBottom: '0.5rem',
                        color: '#374151',
                        lineHeight: '1.4'
                      }}>
                        {relatedPhone.name}
                      </h4>
                      <div className="related-product-price" style={{ 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: '#dc2626' 
                      }}>
                        {formatPrice(relatedPhone.price)}
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem'
                      }}>
                        ⭐ {relatedPhone.averageRating.toFixed(1)} ({relatedPhone.reviewCount})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default ProductDetailPage;

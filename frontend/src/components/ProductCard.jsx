import { formatPrice, getDiscountPercentage } from '../data/mockData';

const ProductCard = ({ phone, onAddToCart, onViewDetail }) => {
  const discount = getDiscountPercentage(phone.originalPrice, phone.price);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(phone);
  };

  const handleViewDetail = () => {
    onViewDetail(phone);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="stars">⭐</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="stars">⭐</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="stars">☆</span>);
    }

    return stars;
  };

  return (
    <div className="product-card" onClick={handleViewDetail}>
      <div className="product-image-container">
        <img 
          src={phone.thumbnail} 
          alt={phone.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x280/6366f1/ffffff?text=No+Image';
          }}
        />
        {discount > 0 && (
          <div className="discount-badge">
            -{discount}%
          </div>
        )}
        
        {/* Quick Actions Overlay */}
        <div className="quick-actions" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: '0.5rem',
          opacity: 0,
          transition: 'var(--transition-normal)'
        }}>
          <button
            onClick={handleAddToCart}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '0.5rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            🛒
          </button>
          <button
            onClick={handleViewDetail}
            style={{
              background: 'white',
              color: 'var(--primary-color)',
              border: 'none',
              padding: '0.5rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            👁️
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-brand">{phone.brand}</div>
        <h3 className="product-name">{phone.name}</h3>
        
        <div className="product-specs">
          <div>📱 {phone.specifications.display.size}</div>
          <div>💾 {phone.specifications.performance.ram} / {phone.specifications.performance.storage}</div>
          <div>📷 {phone.specifications.camera.rear.main}</div>
          <div>🔋 {phone.specifications.battery.capacity}</div>
        </div>

        <div className="product-price">
          <span className="current-price">{formatPrice(phone.price)}</span>
          {phone.originalPrice > phone.price && (
            <span className="original-price">{formatPrice(phone.originalPrice)}</span>
          )}
        </div>

        <div className="product-rating">
          <div className="stars">
            {renderStars(phone.averageRating)}
          </div>
          <span className="rating-text">
            ({phone.reviewCount} đánh giá)
          </span>
        </div>

        <div className="product-actions">
          <button 
            className="btn btn-primary"
            onClick={handleAddToCart}
            style={{ flex: 1 }}
          >
            🛒 Thêm vào giỏ
          </button>
          <button 
            className="btn btn-outline"
            onClick={handleViewDetail}
            style={{ flex: 1 }}
          >
            👁️ Chi tiết
          </button>
        </div>

        <div className="product-stock">
          {phone.stock > 0 ? (
            <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              ✅ Còn hàng ({phone.stock} sản phẩm)
            </span>
          ) : (
            <span style={{ color: 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              ❌ Hết hàng
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="product-tags" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.25rem',
          marginTop: '0.75rem'
        }}>
          {phone.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              background: 'var(--gray-100)',
              color: 'var(--gray-600)',
              padding: '0.125rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: '500'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import { useNavigate } from 'react-router-dom';
import { formatPrice, getDiscountPercentage } from '../services/api';

const ProductCard = ({ phone, onAddToCart: _onAddToCart, onViewDetail: _onViewDetail }) => {
  const navigate = useNavigate();
  const discount = getDiscountPercentage(phone.originalPrice, phone.price);

  const handleViewDetail = () => {
    navigate(`/product/${phone._id || phone.id}`);  
  };

  // const _renderStars = (rating) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(<span key={i} className="stars">⭐</span>);
  //   }

  //   if (hasHalfStar) {
  //     stars.push(<span key="half" className="stars">⭐</span>);
  //   }

  //   const emptyStars = 5 - Math.ceil(rating);
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(<span key={`empty-${i}`} className="stars">☆</span>);
  //   }

  //   return stars;
  // };

  return (
    <div className="product-card-new" onClick={handleViewDetail}>
      <div className="product-image-container-new">
        <img 
          src={phone.thumbnail || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'} 
          alt={phone.name}
          className="product-image-new"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300';
          }}
        />
        {discount > 0 && (
          <div className="discount-badge-new">
            Giảm {discount}%
          </div>
        )}
      </div>
      
           <div className="product-info-new">
             <div className="product-brand-new">{phone.brand}</div>
             <h3 className="product-name-new">{phone.name}</h3>

        {/* Specifications */}
        <div className="product-specs-new">
          <div className="spec-item">
            <span className="spec-label">Màn hình:</span>
            <span className="spec-value">{phone.specifications.display.size}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">RAM:</span>
            <span className="spec-value">{phone.specifications.performance.ram}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Camera:</span>
            <span className="spec-value">{phone.specifications.camera.rear.main}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Pin:</span>
            <span className="spec-value">{phone.specifications.battery.capacity}</span>
          </div>
        </div>

        <div className="product-price-new">
          <span className="current-price-new">{formatPrice(phone.price)}</span>
          {phone.originalPrice > phone.price && (
            <span className="original-price-new">{formatPrice(phone.originalPrice)}</span>
          )}
        </div>

             <div className="product-rating-new">
               <div className="stars-new">
                 ⭐ {phone.averageRating.toFixed(1)}
               </div>
               <span className="rating-count">({phone.reviewCount})</span>
             </div>
      </div>
    </div>
  );
};

export default ProductCard;
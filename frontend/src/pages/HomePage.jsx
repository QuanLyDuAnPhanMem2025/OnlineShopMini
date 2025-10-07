import { useState, useMemo } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { mockPhones, mockBrands, mockCategories, formatPrice } from '../data/mockData';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter và sort sản phẩm
  const filteredAndSortedPhones = useMemo(() => {
    let filtered = mockPhones.filter(phone => {
      const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           phone.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = !selectedBrand || phone.brand === selectedBrand;
      const matchesCategory = !selectedCategory || phone.subcategory === selectedCategory;
      const matchesPrice = phone.price >= priceRange.min && phone.price <= priceRange.max;

      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.averageRating;
          bValue = b.averageRating;
          break;
        case 'name':
        default:
          aValue = a.name;
          bValue = b.name;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchQuery, selectedBrand, selectedCategory, priceRange, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPhones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPhones = filteredAndSortedPhones.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (phone) => {
    console.log('Adding to cart:', phone.name);
    alert(`Đã thêm ${phone.name} vào giỏ hàng!`);
  };

  const handleViewDetail = (phone) => {
    console.log('Viewing detail:', phone.name);
    alert(`Xem chi tiết ${phone.name}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBrand('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 50000000 });
    setSortBy('name');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <Header />
      
      {/* Hero Section */}
      <section className="hero" style={{ padding: 'var(--space-12) 0' }}>
        <div className="container">
          <div className="hero-content">
            <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-4)' }}>
              Cửa hàng điện thoại PhoneStore
            </h1>
            <p style={{ fontSize: 'var(--font-size-lg)', opacity: 0.9 }}>
              Khám phá bộ sưu tập điện thoại thông minh với giá tốt nhất
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--gray-800)' }}>
            Tất cả điện thoại ({filteredAndSortedPhones.length} sản phẩm)
          </h2>
          <button 
            onClick={clearFilters}
            className="btn btn-outline"
            style={{ fontSize: 'var(--font-size-sm)' }}
          >
            Xóa bộ lọc
          </button>
        </div>

        <div className="product-list-container">
          {/* Sidebar Filters */}
          <div className="filters-sidebar" style={{
            background: 'white',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--gray-200)',
            height: 'fit-content',
            position: 'sticky',
            top: '120px'
          }}>
            <h3 style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-800)', fontSize: 'var(--font-size-lg)' }}>
              Bộ lọc
            </h3>

            <div className="filter-section" style={{ marginBottom: 'var(--space-6)' }}>
              <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                Tìm kiếm
              </h4>
              <input
                type="text"
                placeholder="Tên điện thoại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  outline: 'none',
                  transition: 'var(--transition-fast)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
              />
            </div>

            <div className="filter-section" style={{ marginBottom: 'var(--space-6)' }}>
              <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                Thương hiệu
              </h4>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  outline: 'none',
                  background: 'white'
                }}
              >
                <option value="">Tất cả thương hiệu</option>
                {mockBrands.map(brand => (
                  <option key={brand.id} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-section" style={{ marginBottom: 'var(--space-6)' }}>
              <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                Danh mục
              </h4>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  outline: 'none',
                  background: 'white'
                }}
              >
                <option value="">Tất cả danh mục</option>
                {mockCategories.map(category => (
                  <option key={category.id} value={category.slug}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-section" style={{ marginBottom: 'var(--space-6)' }}>
              <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                Khoảng giá
              </h4>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-600)' }}>
                  Min: {formatPrice(priceRange.min)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="1000000"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                  style={{ width: '100%', marginTop: 'var(--space-1)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-600)' }}>
                  Max: {formatPrice(priceRange.max)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="1000000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                  style={{ width: '100%', marginTop: 'var(--space-1)' }}
                />
              </div>
            </div>

            <div className="filter-section">
              <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                Sắp xếp
              </h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  outline: 'none',
                  background: 'white',
                  marginBottom: 'var(--space-2)'
                }}
              >
                <option value="name">Tên A-Z</option>
                <option value="price">Giá</option>
                <option value="rating">Đánh giá</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  outline: 'none',
                  background: 'white'
                }}
              >
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {paginatedPhones.length > 0 ? (
              <>
                <div className="products-grid">
                  {paginatedPhones.map(phone => (
                    <ProductCard
                      key={phone.id}
                      phone={phone}
                      onAddToCart={handleAddToCart}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination" style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 'var(--space-2)', 
                    marginTop: 'var(--space-8)',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-outline"
                      style={{ 
                        opacity: currentPage === 1 ? 0.5 : 1,
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      ← Trước
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`btn ${currentPage === pageNum ? 'btn-primary' : 'btn-outline'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="btn btn-outline"
                      style={{ 
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Sau →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: 'var(--space-16)',
                background: 'white',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: 'var(--shadow-md)'
              }}>
                <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-800)' }}>
                  Không tìm thấy sản phẩm nào
                </h3>
                <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-6)' }}>
                  Thử điều chỉnh bộ lọc để tìm sản phẩm phù hợp
                </p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer" style={{ marginTop: 'var(--space-16)' }}>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>PhoneStore</h3>
              <p style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-300)' }}>
                Cửa hàng điện thoại uy tín với giá tốt nhất thị trường.
              </p>
            </div>
            
            <div className="footer-section">
              <h3>Liên hệ</h3>
              <ul>
                <li>Hotline: 1900-1234</li>
                <li>Email: support@phonestore.com</li>
                <li>Địa chỉ: 123 Nguyễn Huệ, Q1, TP.HCM</li>
                <li>Giờ làm việc: 8:00 - 22:00</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Dịch vụ</h3>
              <ul>
                <li><a href="#">Giao hàng miễn phí</a></li>
                <li><a href="#">Bảo hành chính hãng</a></li>
                <li><a href="#">Đổi trả 30 ngày</a></li>
                <li><a href="#">Hỗ trợ 24/7</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 PhoneStore. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
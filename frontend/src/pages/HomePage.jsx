import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { phoneService, formatPrice } from '../services/api';

const HomePage = () => {
  const [phones, setPhones] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPhones, setTotalPhones] = useState(0);
  const itemsPerPage = 20;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Load phones when filters change
  useEffect(() => {
    loadPhones();
  }, [currentPage, selectedBrand, selectedCategory, priceRange, sortBy, sortOrder, debouncedSearchQuery]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadPhones(),
        loadBrands(),
        loadCategories()
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPhones = async () => {
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        brand: selectedBrand || undefined,
        category: selectedCategory || undefined,
        minPrice: priceRange.min || undefined,
        maxPrice: priceRange.max || undefined,
        search: debouncedSearchQuery || undefined,
        sortBy,
        sortOrder
      };

      const response = await phoneService.getPhones(params);
      
      if (response.success) {
        setPhones(response.data.phones);
        setTotalPages(response.data.pagination.totalPages);
        setTotalPhones(response.data.pagination.total);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const loadBrands = async () => {
    try {
      // Chỉ load brands một lần và cache
      if (brands.length > 0) return;
      
      const response = await phoneService.getPhones({ limit: 1000, search: '' });
      if (response.success) {
        const uniqueBrands = [...new Set(response.data.phones.map(phone => phone.brand))]
          .map(brand => ({ id: brand, name: brand }));
        setBrands(uniqueBrands);
      }
    } catch (err) {
      console.error('Error loading brands:', err);
    }
  };

  const loadCategories = async () => {
    try {
      // Chỉ load categories một lần và cache
      if (categories.length > 0) return;
      
      const response = await phoneService.getPhones({ limit: 1000, search: '' });
      if (response.success) {
        const uniqueCategories = [...new Set(response.data.phones.map(phone => phone.subcategory))]
          .map(category => ({ id: category, name: category, slug: category }));
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

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
    setSortBy('createdAt');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <div className="error">Lỗi: {error}</div>
      </div>
    );
  }

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
        {/* Filters Bar */}
        <div className="filters-bar" style={{
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--gray-200)',
          marginBottom: 'var(--space-6)'
        }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 'var(--space-4)', 
            alignItems: 'flex-start'
          }}>
            <div className="filter-item" style={{ minWidth: '180px' }}>
              <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
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

            <div className="filter-item" style={{ minWidth: '140px' }}>
              <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
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
                {brands.map(brand => (
                  <option key={brand.id} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-item" style={{ minWidth: '140px' }}>
              <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
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
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-item" style={{ minWidth: '180px' }}>
              <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                Khoảng giá
              </h4>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
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
                <div style={{ flex: 1 }}>
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
            </div>

            <div className="filter-item" style={{ minWidth: '140px' }}>
              <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-700)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                Sắp xếp
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '100%' }}>
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
                    background: 'white'
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
          </div>
        </div>

        {/* Title and Clear Button */}
        <div className="title-section">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <h2>
              Tất cả điện thoại ({totalPhones} sản phẩm)
            </h2>
            <button 
              onClick={clearFilters}
              className="btn btn-outline"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div>
            {phones.length > 0 ? (
              <>
                <div className="products-grid">
                  {phones.map(phone => (
                    <ProductCard
                      key={phone._id || phone.id}
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
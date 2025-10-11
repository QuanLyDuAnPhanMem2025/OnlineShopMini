import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { orderService, formatPrice } from '../services/api';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';

const ProfilePage = () => {
  const { user, logout: _logout } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Xử lý URL parameter để set tab
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'orders', 'admin'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Load orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    }
  }, [activeTab]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      console.log('Loading orders...');
      const response = await orderService.getUserOrders();
      console.log('Orders response:', response);
      if (response.success) {
        console.log('Orders data:', response.data.orders);
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // const _handleLogout = () => {
  //   logout();
  // };

  return (
    <ProtectedRoute>
      <div className="app">
        <Header />
        
        <div className="profile-page">
          <div className="container">
            <div className="profile-header">
              <h1>Tài khoản của tôi</h1>
              <p>Quản lý thông tin cá nhân và cài đặt tài khoản</p>
            </div>

            <div className="profile-content">
              <div className="profile-sidebar">
                <div className="profile-nav">
                  <button 
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    Thông tin cá nhân
                  </button>
                  <button 
                    className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    Đơn hàng
                  </button>
                  {user?.role === 'admin' && (
                    <button 
                      className={`nav-item ${activeTab === 'admin' ? 'active' : ''}`}
                      onClick={() => setActiveTab('admin')}
                    >
                      Quản trị
                    </button>
                  )}
                </div>
              </div>

              <div className="profile-main">
                {activeTab === 'profile' && (
                  <div className="profile-tab">
                    <h2>Thông tin cá nhân</h2>
                    <div className="profile-info">
                      <div className="info-item">
                        <label>Họ tên:</label>
                        <span>{user?.firstName} {user?.lastName}</span>
                      </div>
                      <div className="info-item">
                        <label>Email:</label>
                        <span>{user?.email}</span>
                      </div>
                      <div className="info-item">
                        <label>Số điện thoại:</label>
                        <span>{user?.phone || 'Chưa cập nhật'}</span>
                      </div>
                      <div className="info-item">
                        <label>Vai trò:</label>
                        <span className={`role-badge ${user?.role}`}>
                          {user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="profile-tab">
                    <h2>Đơn hàng của tôi</h2>
                    {loading ? (
                      <div className="loading">Đang tải...</div>
                    ) : orders.length === 0 ? (
                      <div className="empty-state">
                        <p>Bạn chưa có đơn hàng nào.</p>
                      </div>
                    ) : (
                      <div className="orders-list">
                        {orders.map((order) => (
                          <div key={order.id} className="order-card">
                            <div className="order-header">
                              <div className="order-info">
                                <h3>Đơn hàng #{order.orderNumber}</h3>
                                <p className="order-date">
                                  {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                                </p>
                              </div>
                              <div className="order-status">
                                <span className={`status-badge ${order.orderStatus}`}>
                                  {order.orderStatus === 'pending' && 'Chờ xử lý'}
                                  {order.orderStatus === 'confirmed' && 'Đã xác nhận'}
                                  {order.orderStatus === 'processing' && 'Đang xử lý'}
                                  {order.orderStatus === 'shipped' && 'Đang giao'}
                                  {order.orderStatus === 'delivered' && 'Đã giao'}
                                  {order.orderStatus === 'cancelled' && 'Đã hủy'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="order-items">
                              {order.items.map((item, index) => {
                                console.log('Order item:', item);
                                return (
                                  <div key={index} className="order-item">
                                    <img 
                                      src={item.image || item.phone?.thumbnail || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'} 
                                      alt={item.name}
                                      className="item-image"
                                      onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300';
                                      }}
                                    />
                                    <div className="item-info">
                                      <h4>{item.name}</h4>
                                      <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="item-price">
                                      {formatPrice(item.price * item.quantity)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            
                            <div className="order-footer">
                              <div className="order-total">
                                <strong>Tổng cộng: {formatPrice(order.total)}</strong>
                              </div>
                              <div className="order-actions">
                                <button className="btn btn-outline btn-sm">
                                  Xem chi tiết
                                </button>
                                {order.orderStatus === 'pending' && (
                                  <button className="btn btn-outline btn-sm">
                                    Hủy đơn hàng
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}


                {activeTab === 'admin' && user?.role === 'admin' && (
                  <div className="profile-tab">
                    <h2>Quản trị hệ thống</h2>
                    <div className="admin-panel">
                      <div className="admin-card">
                        <h3>Quản lý sản phẩm</h3>
                        <p>Thêm, sửa, xóa sản phẩm</p>
                        <button className="btn btn-primary">Quản lý sản phẩm</button>
                      </div>
                      <div className="admin-card">
                        <h3>Quản lý đơn hàng</h3>
                        <p>Xem và xử lý đơn hàng</p>
                        <button className="btn btn-primary">Quản lý đơn hàng</button>
                      </div>
                      <div className="admin-card">
                        <h3>Quản lý người dùng</h3>
                        <p>Xem danh sách người dùng</p>
                        <button className="btn btn-primary">Quản lý người dùng</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;

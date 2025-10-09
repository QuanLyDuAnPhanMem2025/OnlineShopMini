import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
  };

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
                    <div className="empty-state">
                      <p>Bạn chưa có đơn hàng nào.</p>
                    </div>
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

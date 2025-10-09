import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin role if required
  if (requireAdmin && user?.role !== 'admin') {
    return (
      <div className="error-container">
        <div className="error">
          <h2>Không có quyền truy cập</h2>
          <p>Bạn cần quyền quản trị viên để truy cập trang này.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

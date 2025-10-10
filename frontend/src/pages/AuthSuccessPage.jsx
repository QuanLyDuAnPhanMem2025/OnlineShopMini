import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthSuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleGoogleSuccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        // Get token from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
          setError('Không tìm thấy token xác thực');
          setLoading(false);
          return;
        }

        // Handle Google OAuth success
        const result = await handleGoogleSuccess(token);
        
        if (result.success) {
          // Redirect to home page after successful login
          navigate('/');
        } else {
          setError(result.error || 'Đăng nhập thất bại');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi xử lý đăng nhập');
        console.error('Auth success error:', err);
      } finally {
        setLoading(false);
      }
    };

    handleAuthSuccess();
  }, [handleGoogleSuccess, navigate]);

  if (loading) {
    return (
      <div className="auth-success-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Đang xử lý đăng nhập...</h2>
          <p>Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-success-page">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>Đăng nhập thất bại</h2>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthSuccessPage;
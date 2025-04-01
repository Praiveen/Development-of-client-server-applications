import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { hasRole, isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children, roles = [] }) => {
  const user = useSelector(state => state.user);
  
  if (!isAuthenticated(user)) {
    return <Navigate to="/auth" replace />;
  }

  if (roles.length > 0 && !hasRole(user, roles)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 
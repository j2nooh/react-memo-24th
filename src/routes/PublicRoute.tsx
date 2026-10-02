import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

function PublicRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to="/memos" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;

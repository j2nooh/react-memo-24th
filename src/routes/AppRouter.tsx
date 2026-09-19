import { Navigate, Route, Routes } from 'react-router-dom';
import MemoPage from '../pages/MemoPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/memos" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/memos" element={<MemoPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/memos" replace />} />
    </Routes>
  );
}

export default AppRouter;

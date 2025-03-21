import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';

// 동적 임포트로 변경
const UserRoutes = React.lazy(() => import('./settings/settings'));
const SystemRoutes = React.lazy(() => import('./system/system'));
const HomeRoutes = React.lazy(() => import('./home/home'));

// 로딩 컴포넌트
const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress />
  </Box>
);

// 새로운 리디렉션 컴포넌트 추가
const RedirectUserToSettings: React.FC = () => {
  const location = useLocation();
  // /user 경로 부분을 /settings로 변경하며, 나머지 경로 및 쿼리스트링 유지
  const newPath = location.pathname.replace(/^\/user/, '/settings');
  return <Navigate to={newPath + location.search} replace />;
};

const App: React.FC = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/*" element={<HomeRoutes />} />
              <Route path="settings/*" element={<UserRoutes />} />
              {/* /user 경로의 뒷부분 유지하며 /settings로 리디렉션 */}
              <Route path="user/*" element={<RedirectUserToSettings />} />
              <Route path="system/*" element={<SystemRoutes />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
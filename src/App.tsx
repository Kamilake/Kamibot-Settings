import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';
import AuthCheck from './components/AuthCheck';
import RedirectUserToSettings from './components/RedirectUserToSettings';

// 동적 임포트로 변경
const SettingsRoutes = React.lazy(() => import('./settings/settings'));
const SystemRoutes = React.lazy(() => import('./system/system'));
const HomeRoutes = React.lazy(() => import('./home/home'));

// 로딩 컴포넌트
const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress />
  </Box>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            {/* AuthCheck 컴포넌트 추가 */}
            <AuthCheck />
            <Routes>
              <Route path="/*" element={<HomeRoutes />} />
              <Route path="settings/*" element={<SettingsRoutes />} />
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
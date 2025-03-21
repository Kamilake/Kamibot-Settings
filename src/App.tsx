import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';

// 동적 임포트로 변경
const UserRoutes = React.lazy(() => import('./user'));
const SystemRoutes = React.lazy(() => import('./system'));
const HomeRoutes = React.lazy(() => import('./home'));

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
            <Routes>
              <Route path="/*" element={<HomeRoutes />} />
              <Route path="user/*" element={<UserRoutes />} />
              <Route path="system/*" element={<SystemRoutes />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
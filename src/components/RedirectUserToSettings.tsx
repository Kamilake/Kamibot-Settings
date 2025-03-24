import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RedirectUserToSettings: React.FC = () => {
  const location = useLocation();
  // /user 경로 부분을 /settings로 변경하며, 나머지 경로 및 쿼리스트링 유지
  const newPath = location.pathname.replace(/^\/user/, '/settings');
  return <Navigate to={newPath + location.search} replace />;
};

export default RedirectUserToSettings;
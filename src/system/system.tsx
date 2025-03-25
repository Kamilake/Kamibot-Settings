import * as React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import SystemSettingsPage from '../system/SystemSettingsPage'; 
import SystemLogsPage from '../system/SystemLogsPage';
import { UserProvider } from '../contexts/User/UserContext';
import FetchUserData from '../contexts/User/FetchUser';

const SystemRoutes: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const paths = ['settings', 'logs'];
    const currentPath = location.pathname.split('/').pop() || '';
    setValue(paths.indexOf(currentPath));
  }, [location]);

  return (
    <>
      <UserProvider>
        <FetchUserData />
        <Routes>
          <Route path="settings" element={<SystemSettingsPage />} />
          <Route path="logs" element={<SystemLogsPage />} />
        </Routes>
      </UserProvider>
    </>
  );
};

export default SystemRoutes;
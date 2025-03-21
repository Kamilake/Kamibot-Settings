import * as React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { UserProvider } from '../contexts/User/UserContext';
import FetchUserData from '../contexts/User/FetchUserData';
import HomePage from '../home/HomePage';

const HomeRoutes: React.FC = () => {
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
          <Route path="/" element={<HomePage />} />
        </Routes>
      </UserProvider>
    </>
  );
};

export default HomeRoutes;
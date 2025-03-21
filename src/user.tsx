import * as React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorageIcon from '@mui/icons-material/Storage';
import GroupsIcon from '@mui/icons-material/Groups';
import HelpIcon from '@mui/icons-material/Help';

// import PersonalSettingsPage from './user/PersonalSettingsPage';
// import ChannelSettingsPage from './user/ChannelSettings/ChannelSettingsPage';
// import GuildSettingsPage from './user/GuildSettingsPage';
// import HelpPage from './user/HelpPage';
// 동적 임포트로 변경

const PersonalSettingsPage = React.lazy(() => import('./user/PersonalSettingsPage'));
const ChannelSettingsPage = React.lazy(() => import('./user/ChannelSettings/ChannelSettingsPage'));
const GuildSettingsPage = React.lazy(() => import('./user/GuildSettingsPage'));
const HelpPage = React.lazy(() => import('./user/HelpPage'));

// 프리로드 유틸리티
const preloadComponents = () => {
  const requestIdleCallback =
    window.requestIdleCallback ||
    ((cb: IdleRequestCallback) => setTimeout(cb, 1));

  requestIdleCallback(() => {
    // 현재 페이지에 표시되지 않은 컴포넌트들 프리로드
    import('./user/PersonalSettingsPage');
    import('./user/ChannelSettings/ChannelSettingsPage');
    import('./user/GuildSettingsPage');
    import('./user/HelpPage');

    // settingsFunctions에 있는 컴포넌트들도 프리로드 가능
    settingsFunctions.forEach(item => {
      if (item.data) {
        // 컴포넌트가 있는 경우에만 프리로드
        import(`./user/${item.data}`).catch(() => { });
      }
    });
  });
};

import settingsFunctions from './user/functions';
import FunctionLocator from './user/components/FunctionLocator';
import { CircularProgress } from '@mui/material';
import FetchUserData from './contexts/User/FetchUserData';
import { UserProvider } from './contexts/User/UserContext';

// 로딩 컴포넌트
const PageLoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
    <CircularProgress />
  </Box>
);

const UserRoutes: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const paths = ['personal', 'channel', 'guild', 'help'];
    // 경로는 상대경로이므로 맨 마지막 요소 비교
    const currentPath = location.pathname.split('/').pop() || '';
    setValue(paths.indexOf(currentPath));
  }, [location]);

  // 첫 렌더링 후 유휴 시간에 나머지 컴포넌트 프리로드
  React.useEffect(() => {
    // 첫 번째 페이지가 로드된 후 3초 후에 프리로드 시작
    const timer = setTimeout(() => {
      preloadComponents();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <UserProvider>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <FetchUserData />
          <Routes>
            <Route path="personal" element={<PersonalSettingsPage />} />
            <Route path="channel" element={<ChannelSettingsPage />} />
            <Route path="guild" element={<GuildSettingsPage />} />
            <Route path="help" element={<HelpPage />} />
            {settingsFunctions.map((Item, index) => (
              <Route
                key={index}
                path={`guild/${Item.url}`}
                element={<FunctionLocator url={Item.url} />}
              />
            ))}
          </Routes>

        </React.Suspense>


        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (newValue === 0) {
              navigate('/user/personal' + location.search);
            }
            if (newValue === 1) {
              navigate('/user/channel' + location.search);
            }
            if (newValue === 2) {
              navigate('/user/guild' + location.search);
            }
            if (newValue === 3) {
              navigate('/user/help' + location.search);
            }
          }}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100
          }}
        >
          <BottomNavigationAction label="개인 설정" icon={<AccountCircleIcon />} />
          <BottomNavigationAction label="채널 설정" icon={<StorageIcon />} />
          <BottomNavigationAction label="서버 설정" icon={<GroupsIcon />} />
          <BottomNavigationAction label="도움말" icon={<HelpIcon />} />
        </BottomNavigation>
        <Box pb={7}></Box>
      </UserProvider>
    </>
  );
};

export default UserRoutes;
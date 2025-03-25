import * as React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorageIcon from '@mui/icons-material/Storage';
import GroupsIcon from '@mui/icons-material/Groups';
import HelpIcon from '@mui/icons-material/Help';

// import PersonalSettingsPage from './PersonalSettingsPage';
// import ChannelSettingsPage from './ChannelSettings/ChannelSettingsPage';
// import GuildSettingsPage from './GuildSettingsPage';
// import HelpPage from './HelpPage';
// 동적 임포트로 변경

const PersonalSettingsPage = React.lazy(() => import('./PersonalSettingsPage'));
const ChannelSettingsPage = React.lazy(() => import('./ChannelSettings/ChannelSettingsPage'));
const GuildSettingsPage = React.lazy(() => import('./GuildSettingsPage'));
const HelpPage = React.lazy(() => import('./HelpPage'));

// 프리로드 유틸리티
const preloadComponents = () => {
  const requestIdleCallback =
    window.requestIdleCallback ||
    ((cb: IdleRequestCallback) => setTimeout(cb, 1));

  requestIdleCallback(() => {
    // 현재 페이지에 표시되지 않은 컴포넌트들 프리로드
    import('./PersonalSettingsPage');
    import('./ChannelSettings/ChannelSettingsPage');
    import('./GuildSettingsPage');
    import('./HelpPage');

    // settingsFunctions에 있는 컴포넌트들도 프리로드 가능
    settingsFunctions.forEach(item => {
      if (item.data) {
        // 컴포넌트가 있는 경우에만 프리로드
        import(`./${item.data}`).catch(() => { });
      }
    });
  });
};

import settingsFunctions from './functions';
import FunctionLocator from './components/FunctionLocator';
import { CircularProgress } from '@mui/material';
import FetchUserData from '../contexts/User/FetchUser';
import { UserProvider } from '../contexts/User/UserContext';
import { ActorProvider } from '../contexts/User/Actors/ActorContext';
import FetchActors from '../contexts/User/Actors/FetchActors';
import { ChannelProvider } from '../contexts/User/Channels/ChannelContext';

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
        <ActorProvider>
          <ChannelProvider>
            <React.Suspense fallback={<PageLoadingFallback />}>
              <FetchUserData />
              <FetchActors />
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
                  navigate('/settings/personal' + location.search);
                }
                if (newValue === 1) {
                  navigate('/settings/channel' + location.search);
                }
                if (newValue === 2) {
                  navigate('/settings/guild' + location.search);
                }
                if (newValue === 3) {
                  navigate('/settings/help' + location.search);
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
          </ChannelProvider>
        </ActorProvider>

      </UserProvider>

    </>
  );
};

export default UserRoutes;
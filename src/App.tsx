import * as React from 'react';

import { useLocation, useNavigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StorageIcon from '@mui/icons-material/Storage';
import HelpIcon from '@mui/icons-material/Help';
import GroupsIcon from '@mui/icons-material/Groups';

import PersonalSettingsPage from './user/PersonalSettingsPage';
import ChannelSettingsPage from './user/ChannelSettingsPage';
import GuildSettingsPage from './user/GuildSettingsPage';
import HelpPage from './user/HelpPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import fetchUserInfoApi from './api/fetchUserInfoApi';
// const userFetchResult = fetchUserInfoApi();

function Copyright(): React.ReactElement {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

import settingsFunctions from './user/functions';
import FunctionLocator from './user/components/FunctionLocator';


function Root(): React.ReactElement {
  const [value, setValue] = React.useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    let pathname = location.pathname;
    let paths = ['/user/personal', '/user/channel','/user/guild', '/user/help'];
    setValue(paths.indexOf(location.pathname));
  }, [location]);
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<PersonalSettingsPage />}></Route>
        <Route path={"/user/personal"} element={<PersonalSettingsPage />}></Route>
        <Route path={"/user/channel"} element={<ChannelSettingsPage />}></Route>
        <Route path={"/user/guild"} element={<GuildSettingsPage />}></Route>
        <Route path={"/user/help"} element={<HelpPage />}></Route>
        {settingsFunctions.map((Item, index) => (
        <Route key={index} path={"/user/guild/"+Item.url} element={<FunctionLocator url={Item.url} />}></Route>
      ))}
      </Routes>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          // Router
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
        <BottomNavigationAction label="개인" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="채널" icon={<StorageIcon />} />
        <BottomNavigationAction label="서버" icon={<GroupsIcon />} />
        <BottomNavigationAction label="도움말" icon={<HelpIcon />} />
      </BottomNavigation>
      <Box pb={7}></Box>

    </div>

  );
}

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
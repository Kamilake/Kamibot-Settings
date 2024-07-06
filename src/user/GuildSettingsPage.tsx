import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { SnackbarProvider } from 'notistack'
import Header from './components/Header';
import ProTip from './components/ProTip';
import Molu from './components/Molu';
import fetchUserInfoApi from '../api/fetchUserInfoApi';
import myDrawer from './components/drawer';
import GridButton from './components/GuildSettingsGrid';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user, loading, error } = fetchUserInfoApi();
  if (error) return <div>Error occurred!
    <br />
    {error.message}
  </div>;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 1 }}>
        <Header title="서버 설정" userAvatarUrl={user.userAvatarUrl} />
        <Divider />
        <br />
        <Typography variant="h4" gutterBottom component="div">
          {loading ? `서버` : user.guildName} 설정
        </Typography>
        <Divider />
        아직 만들고 있는 기능이 많아서 모두 작동하는 건 아니에요. 하지만 작동하는 건 마음껏 사용하세요!<br />
        오작동이나 추가하면 좋을 만한 걸 발견한다면 언제든지 Kamilake에게 알려주세요! <br />
        <br /><br />
        <GridButton></GridButton>
        <ProTip />
        <Molu />
      </Box>
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} />
    </Container >
  );
}

export default Settings;
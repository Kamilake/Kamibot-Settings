import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { SnackbarProvider } from 'notistack'
import Header from './components/Header';
import ProTip from './components/ProTip';
import GridButton from './components/GuildSettingsGrid';
import TwemojiText from '../../utils/twemojiUtil/TwemojiText';
import { useUser } from '../contexts/User/UserContext';
import { useHeader } from '../contexts/HeaderContext';

const Settings: React.FC = () => {

  const { user, isUserLoaded } = useUser();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle(isUserLoaded ? user.guildName + ` 설정` : `서버 설정`);
    return () => setTitle('카미봇');
  }, [setTitle]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 1 }}>
        <Header />
        <Typography variant="h4" gutterBottom component="div">
          <TwemojiText>{isUserLoaded ? user.guildName : `서버`}</TwemojiText> 설정
        </Typography>
        <Divider />
        <br />
        <GridButton></GridButton>
        <ProTip />
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
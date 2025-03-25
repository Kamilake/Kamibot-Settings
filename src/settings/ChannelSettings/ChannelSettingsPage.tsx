import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { SnackbarProvider } from 'notistack';

import NestedChannelSettingsList from '../components/NestedChannelSettingsList';
import ControllableStates from '../components/ChannelSelectDropdown';
import Header from '../components/Header';
import ProTip from '../components/ProTip';
import DedicatedChannelSettingsRadioButtons from '../components/DedicatedChannelSettingsRadioButtons';

import TwemojiText from '../../../utils/twemojiUtil/TwemojiText';
import { useUser } from '../../contexts/User/UserContext';
import { Channel } from '../../contexts/User/Channels/ChannelContext';

const Settings: React.FC = () => {

  const { user, isUserLoaded } = useUser();
  const [channelSelectValue, setChannelSelectValue] = React.useState<Channel>({
    channelName: '로드 중...',
    channelType: "PRIVATE",
    channelId: -1,
    categoryName: "일반",
  });

  React.useEffect(() => {
    if (isUserLoaded && channelSelectValue.channelId == -1) {
      setChannelSelectValue({
        channelName: user.channelName,
        channelId: user.channelId,
        channelType: user.channelType,
        categoryName: "",
      });
    }
    if (channelSelectValue.channelId == -1) return;
  }, [channelSelectValue, isUserLoaded]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title={isUserLoaded ? user.guildName + " > " + channelSelectValue.channelName + " 설정" : "채널 설정"} />
        <ControllableStates
          value={channelSelectValue}
          setValue={setChannelSelectValue}
        />
        <br />
        <Typography variant="h4" gutterBottom component="div">
          일반
          <Divider />
          <NestedChannelSettingsList channelSelectValue={channelSelectValue} channelId={channelSelectValue.channelId} />
        </Typography>
        <br />
        <Typography variant="h4" gutterBottom component="div">
          <TwemojiText>전용 채널</TwemojiText>
          <Divider />
          <DedicatedChannelSettingsRadioButtons channelSelectValue={channelSelectValue} channelId={channelSelectValue.channelId} />
        </Typography>
        <ProTip />
      </Box>
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} />
    </Container>
  );
}

export default Settings;
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import NestedChannelSettingsList from './components/NestedChannelSettingsList';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { SnackbarProvider } from 'notistack'

import ControllableStates from './components/ControllableStates';

import Header from './components/Header';
import ProTip from './components/ProTip';
import Molu from './components/Molu';
import fetchUserInfoApi from '../api/fetchUserInfoApi';

import { Channel } from '../api/fetchChannelListApi';
import TwemojiText from '../../utils/twemojiUtil/TwemojiText';
import DedicatedChannelSettingsRadioButtons from './components/DedicatedChannelSettingsRadioButtons';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToUserPersonalPage = (): void => {
    navigate('/user/personal' + location.search);
  }

  const { data: user, loading, error } = fetchUserInfoApi();
  const [channelSelectValue, setChannelSelectValue] = React.useState<Channel>({
    channelName: '로드 중...',
    channelType: "PRIVATE",
    channelId: -1,
    categoryName: "일반",
  });

  // if (channelSelectValue == null)
  //   setChannelSelectValue({ "firstLetter": "0-9", "channelName": "", "channelId": -2 });

  React.useEffect(() => {

    // console.log(`value has changed to: ${channelSelectValue}`);
    // 채널 바꾸면 실행되는곳
    if (!loading && channelSelectValue.channelId == -1) {
      setChannelSelectValue(
        {
          channelName: user.channelName,
          channelId: user.channelId,
          channelType: user.channelType,
          categoryName: "",
        });
    }
    if (channelSelectValue.channelId == -1) return;
    // alert(`value has changed to: ${channelSelectValue.channelId}`);

  }, [channelSelectValue, loading]);

  if (error) return <div>Error occurred!
    <br />
    {error.message}
  </div>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="서버 설정" userAvatarUrl={user.userAvatarUrl} />
        <ControllableStates
          value={channelSelectValue}
          setValue={setChannelSelectValue}
        /><br />
        3상태 버튼은 아직 제작 중이라 가운데 기본값이 작동하지 않아요..!
        <br />
        <Typography variant="h4" gutterBottom component="div">
          <TwemojiText>{channelSelectValue.channelName ? channelSelectValue.channelName : `채널별`} 설정</TwemojiText>
          <Divider />
          <NestedChannelSettingsList channelSelectValue={channelSelectValue} channelId={channelSelectValue.channelId} />
        </Typography>
        <br />
        <br />
        <Typography variant="h4" gutterBottom component="div">
          <TwemojiText>전용 채널 설정</TwemojiText>
          <Divider />
          <DedicatedChannelSettingsRadioButtons channelSelectValue={channelSelectValue} channelId={channelSelectValue.channelId} />
        </Typography>
        {/* <NestedGuildSettingsList channelSelectValue={channelSelectValue} channelId={channelSelectValue.channelId} /> */}
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
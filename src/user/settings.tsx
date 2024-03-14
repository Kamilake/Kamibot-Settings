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

import Header from './Header';
import ProTip from './ProTip';
import Molu from './Molu';
import fetchInfoApi from '../api/fetchInfoApi';
import myDrawer from './drawer';

interface ChannelSelectValue {
  firstLetter: string;
  channelName: string;
  channelId: number;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gohome = (): void => {
    navigate('/user/home' + location.search);
  }

  const { data, loading, error } = fetchInfoApi();
  const [channelSelectValue, setChannelSelectValue] = React.useState<ChannelSelectValue>({ "firstLetter": "0-9", "channelName": "채널을 골라주세요!", "channelId": -1 });

  if (channelSelectValue == null)
    setChannelSelectValue({ "firstLetter": "0-9", "channelName": "", "channelId": -2 });

  React.useEffect(() => {

    // console.log(`value has changed to: ${channelSelectValue}`);
    // 채널 바꾸면 실행되는곳
    if (!loading && channelSelectValue.channelId == -1) {
      setChannelSelectValue({ "firstLetter": "0-9", "channelName": data.channelName, "channelId": data.channelId });
    }
    if (channelSelectValue.channelId == -1) return;
    // alert(`value has changed to: ${channelSelectValue.channelId}`);

  }, [channelSelectValue, loading]);

  if (error) return <div>Error occurred!
    <br />
    {error.message}
  </div>;

  const myDrawer2 = myDrawer();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="서버 설정" userAvatarUrl={data.userAvatarUrl} />
        <ControllableStates
          value={channelSelectValue}
          setValue={setChannelSelectValue}
        /><br />
        <Typography variant="h4" gutterBottom component="div">
          {channelSelectValue.channelName ? channelSelectValue.channelName : `채널별`} 설정
        </Typography>
        <Divider />
        <NestedChannelSettingsList channelSelectValue={channelSelectValue} channelId={channelSelectValue.channelId} />
        <br />
        <Typography variant="h4" gutterBottom component="div">
          {loading ? `서버` : data.guildName} 전체 설정
        </Typography>
        <Divider />
        {/* <NestedGuildSettingsList channelSelectValue={channelSelectValue} channelId={channelSelectValue.channelId} /> */}
        <br />

        {/* <TextField id="outlined-basic" label="JSON" variant="outlined" value={loading ? 'Loading...' : JSON.stringify(data)} multiline rows={4} fullWidth /> */}
        {/* <br></br> */}
        {/* <br />
        안녕하세요 {data.userEffectiveName}님!<br />
        <img src={data.userAvatarUrl} width="100px" /><br />
        현재 채널 이름: {data.channelName}<br />
        현재 채널 ID: {data.channelId}<br />
        현재 채널 타입: {data.channelType}<br />
        현재 유저 이름: {data.userName}<br />
        현재 길드 ID: {data.guildId}<br />
        현재 길드 이름: {data.guildName}<br />

        {`채널 고른거: ${channelSelectValue.channelName} `}
        <br></br>{` 채널 ID: ${channelSelectValue.channelId} `} */}

        {/* <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> */}
        <Button variant="contained" color="primary" onClick={gohome}> 홈으로 이동 </Button>
        <Button >테스트</Button>

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
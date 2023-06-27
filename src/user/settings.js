import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import ControllableStates from './components/ControllableStates';

import Header from './Header';
import ProTip from './ProTip';
import Molu from './Molu';
import useFetch from '../useFetch';
import myDrawer from './drawer';
export default function settings() {
  const navigate = useNavigate();
  const location = useLocation();

  function gohome() {
    navigate('/user/home' + location.search);
  }

  var { data, loading, error } = useFetch('https://kamibot.kami.live/api/info');
  // useFetch를 채널변경 전용과 정보 받아오기 전용 함수로 쪼개야함, 로딩 도중 기본값 출력 문제 때문에


  // if (loading) return <div>Laaaaaaaaaaaaaaaaaaaaaoading...</div>;
  // if (loading) return <div>Loading...</div>;
  // const [channelSelectValue, setChannelSelectValue] = React.useState('채널을 선택하세요...');
  const [channelSelectValue, setChannelSelectValue] = React.useState({ "firstLetter": "0-9", "name": "채널을 골라주세요!", "id": -1 });


  React.useEffect(() => {
    // console.log(`value has changed to: ${channelSelectValue}`);
    // 채널 바꾸면 실행되는곳
    if (!loading && channelSelectValue.id == -1) {
      setChannelSelectValue({ "firstLetter": "0-9", "name": data.channelName, "id": data.channelId });
    }
    if (channelSelectValue.id == -1) return;
    // alert(`value has changed to: ${channelSelectValue.id}`);
  }, [channelSelectValue, loading]); // value를 의존성 배열에 추가







  if (error) return <div>Error occurred!
    <br />
    {error.message}
  </div>;
  var myDrawer2 = myDrawer();
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="설정" />
        <Typography variant="h4" gutterBottom component="div">
          채널별 설정
        </Typography>
        <Divider /> <br />
        <ControllableStates
          value={channelSelectValue}
          setValue={setChannelSelectValue}
        />
        <br />
        {` 고른거: ${channelSelectValue.name} `}
        <br></br>{` 채널 ID: ${channelSelectValue.id} `}
        <br></br>{` 아 그리고 저건 그냥 영화제목이에요 `}
        <Typography variant="h4" gutterBottom component="div">
          {loading ? `서버 전역` : data.guildName} 설정
        </Typography>
        <Divider /> <br />

        <TextField id="outlined-basic" label="JSON" variant="outlined" value={loading ? 'Loading...' : JSON.stringify(data)} multiline rows={4} fullWidth />
        <br></br>
        <br />
        안녕하세요 {data.userEffectiveName}님!<br />
        <img src={data.userAvatarUrl} width="100px" /><br />
        현재 채널 이름: {data.channelName}<br />
        현재 채널 ID: {data.channelId}<br />
        현재 채널 타입: {data.channelType}<br />
        현재 유저 이름: {data.userName}<br />
        현재 길드 ID: {data.guildId}<br />
        현재 길드 이름: {data.guildName}<br />


        {/* <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> */}
        <Button variant="contained" color="primary" onClick={gohome}> 홈으로 이동 </Button>
        {/* <Button variant="contained" color='primary' onClick={myDrawer.toggleDrawer('right', true)}></Button> */}
        <Button >테스트</Button>


        {/*  */}
        <ProTip />
        <Molu />
      </Box>
    </Container >
  );
}
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import BadgeAvatars from './components/BadgeAvatars';

import fetchInfoApi from '../api/fetchInfoApi';


import ProTip from './ProTip';
import axios from "axios";
import Molu from './Molu';
import Header from './Header';
export default function home() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [data, setData] = useState(null);
  function gohome() {
    navigate('/user/settings' + location.search);
  }

  var { data, loading, error } = fetchInfoApi();
  var userName = data?.user?.username;
  var avatar = data?.user?.avatar;

  // data 콘솔에 출력
  console.log("data: ", data);

  // 만약 데이터가 {}이면 로그인 페이지로 리디렉션 (kami.com/login)
  // if (JSON.stringify(data) === JSON.stringify({})) {
  //   window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1019061779357245521&permissions=295064431696&scope=bot%20applications.commands";
  // }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="개인 설정" userAvatarUrl={data.userAvatarUrl} />
        <div className="home">

          <BadgeAvatars userName={data?.userEffectiveName + "님, 안녕하세요!"} avatarUrl={data.userAvatarUrl} />
          <br />
          {data?.guildId == 0 ? null : <>
            {data.userEffectiveName}님은 지금 {data.guildName} 서버의 {data.channelName} 채널에 있어요!
          </>} <br></br>
          <Button variant="contained" color="primary" onClick={gohome}> 채널 설정으로 이동 </Button>
          {/*  */}
        </div>
        {/* For variant="text", adjust the height via font-size */}
        <br />
        <Box>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" /> <br />
          홈은 여전히 공사중이에요! 아직 여기에는 아무 것도 없어요. <br />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={60} height={60} animation="wave" /> <br />
          <Skeleton variant="rounded" height={40} animation="wave" /> <br />
          <Skeleton variant="rounded" height={70} animation="wave" /> <br />
          <Skeleton variant="rounded" height={60} animation="wave" /> <br />
        </Box>
        <ProTip />
        <Molu />
      </Box>
    </Container>
  );
}
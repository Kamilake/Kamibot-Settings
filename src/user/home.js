import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
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

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="홈" />
        <div className="home" style={{ whiteSpace: 'pre-wrap', WordBreak: 'break-word' }}>

          <BadgeAvatars userName={data?.userEffectiveName + "님, 안녕하세요!"} avatarUrl={data.userAvatarUrl} />
          <br />
          {data?.guildId == 0 ? null : <>
            {data.userEffectiveName}님은 지금 {data.guildName} 서버의 {data.channelName} 채널에 있어요!
          </>}
          <Button variant="contained" color="primary" onClick={gohome}> 설정으로 이동 </Button>
          {/*  */}
        </div>
        <ProTip />
        <Molu />
      </Box>
    </Container>
  );
}
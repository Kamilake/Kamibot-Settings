import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import BadgeAvatars from './components/BadgeAvatars';

import useFetch from '../useFetch';

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

  var { data, loading, error } = useFetch('https://kamibot.kami.live/api/info');
  var userName = data?.user?.username;
  var avatar = data?.user?.avatar;
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="홈" />
        <div className="home">
          <BadgeAvatars userName={data.userEffectiveName+","} avatarUrl={data.userAvatarUrl}/>
          <br />
          <Button variant="contained" color="primary" onClick={gohome}> 설정으로 이동 </Button>
          {/*  */}
        </div>
        <ProTip />
        <Molu />
      </Box>
    </Container>
  );
}
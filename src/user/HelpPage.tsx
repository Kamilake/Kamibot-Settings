import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import axios from "axios";
import Molu from './components/Molu';
import Header from './components/Header';
import TwemojiText from '../../utils/twemojiUtil/TwemojiText';

const Help: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function gohome() {
    navigate('/user/settings' + location.search);
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="도움말" userAvatarUrl={""} />
        <div className="home">
          <Typography variant="h4" gutterBottom component="div">
            도움말
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            <TwemojiText>
              앗, 죄송해요ㅠㅠ 도움말 작성이 늦어지고 있어요😭<br />대신 /help 명령을 통해 카미봇의 도움말을 확인할 수 있어요!
            </TwemojiText>
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button disabled>
              <ListItemText primary="일반" />
            </ListItem>
            <Divider />
            <ListItem button disabled>
              <ListItemText primary="프로필" />
            </ListItem>
            <Divider />
            <ListItem button disabled>
              <ListItemText primary="알림" />
            </ListItem>
          </List>
          {/* <Button variant="contained" color="primary" onClick={gohome}>서버 설정으로 돌아가기</Button> */}
          <br />
          <br />
        </div>
        <Molu />
      </Box>
    </Container>
  );
}

export default Help;
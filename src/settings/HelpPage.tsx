import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Molu from './components/Molu';
import Header from './components/Header';
import TwemojiText from '../../utils/twemojiUtil/TwemojiText';
import L from './components/L';

const Help: React.FC = () => {

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="도움말" />
        <div className="home">
          <Typography variant="h4" gutterBottom component="div">
            카미봇 도움말
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            <TwemojiText>
              앗, 죄송해요😅<br />
              홈 페이지와 도움말 작성이 늦어지고 있어요😭<br />
              대신 /help 명령을 통해 카미봇의 도움말을 확인할 수 있어요!
              <br />
              <br />
              <L to="https://help.kamibot.app/">작성중이지만.. 조금 더 내용이 많은 도움말 사이트로 이동하기</L>
            </TwemojiText>
          </Typography>
          <br />
          <br />
        </div>
        <Molu />
      </Box>
    </Container>
  );
}

export default Help;
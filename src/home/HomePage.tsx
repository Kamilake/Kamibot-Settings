import { Button } from '@mui/material';
import * as React from 'react';
import L from '../user/components/L';

const HomePage: React.FC = () => {
  return (
    <>
      홈페이지 만들어야해!!!!
      ㅓ저아직 홈페이ㅣ지르루 못마느드럿서요ㅠㅠㅜ 여기로와주세요!!! <br />

      <Button variant="contained" color="primary" onClick={
        () => {
          location.href = 'https://help.kamibot.app/';
        }} >
        카미봇 설명이나 도움말 있는데로 가는 버튼!!
      </Button>
      또는..
      <L to={`/user/guild${window.location.search}`}>서버 설정으로 가는 버튼</L>
    </>
  );
};

export default HomePage;

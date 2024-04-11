import * as React from 'react';
import { useState, useEffect, ReactElement } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LightBulbIcon from '@mui/icons-material/LightbulbOutlined';

const ProTip: React.FC = () => {
  const tips: ReactElement[] = [
    <>이 설정 창의 UI는 <Link href="https://mui.com/getting-started/templates/">MUI</Link>로 만들어졌어요!</>,
    <>AI 카미봇에게 "내일 10시 유닉스 타임스탬프 만들어줘" 라고 해 보세요.</>,
    <>AI 툴킷은 그림뿐만 아니라 동영상과 파일도 다룰 수 있어요.</>,
    <>이 설정 창의 UI는 <Link href="https://github.com/Kamilake/Kamibot-Settings">오픈소스로 공개</Link>되어 있어요!</>,
    <>카미봇의 모든 기능은 무료이며, 모든 비용은 카미가 내고 있어요.</>,
    <>여러분은 자신의 TTS 보이스를 변경할 수 있어요. <Link href={`/user/personal${window.location.search}`}>여기에서요!</Link></>,
    <>어떤 보너스 팁을 추가해볼까요?</>,
    <>어떤 보너스 팁을 추가해볼까요?</>,
    // 추가 팁들...
  ];

  const [tip, setTip] = useState<ReactElement | null>(null);

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
      <LightBulbIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
      보너스 팁: {tip}
    </Typography>
  );
}

export default ProTip;
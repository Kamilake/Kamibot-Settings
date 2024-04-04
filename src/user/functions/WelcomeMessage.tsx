import React, { useState } from "react";
import { Smartphone, WavingHand } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const FunctionBody: React.FC = () => {
  const [isFunctionEnabled, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isFunctionEnabled);
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={isFunctionEnabled} disabled={false} onChange={handleToggle} />}
        label="활성화"
      />
      <p>{isFunctionEnabled ? '기능이 켜졌습니다' : '기능이 꺼졌습니다'}</p>
    </>
  );
};

const functionInfo: FunctionInterface = {
  icon: <WavingHand />,
  title: 'AI 환영 메세지',
  description: '새 멤버가 들어오면 AI 카미봇이 환영 메세지 보내기',
  url: 'welcome_message',
  data: <FunctionBody />
};

export default functionInfo;
import React, { useState } from "react";
import { Smartphone, VoiceChat } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const FunctionBody: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={isChecked} disabled={false} onChange={handleToggle} />}
        label="서비스 활성화"
      />
      <p>{isChecked ? '스위치 켜졌당' : '스위치가 꺼졌당'}</p>
    </>
  );
};

const functionInfo: FunctionInterface = {
  icon: <VoiceChat />,
  title: '가변 음성 채널',
  description: '필요할 때마다 음성 채널을 동적으로 만들고, 아무도 없으면 제거하기',
  url: 'func_example',
  data: <FunctionBody />
};

export default functionInfo;
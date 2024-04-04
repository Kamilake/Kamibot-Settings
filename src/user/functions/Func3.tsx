import React, { useState } from "react";
import { Smartphone } from '@mui/icons-material';
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
  icon: <Smartphone />,
  title: '기능',
  description: '기능 설명',
  url: 'func_example',
  data: <FunctionBody />
};

export default functionInfo;
import React from "react";
import { Downloading as DownloadingIcon } from '@mui/icons-material';
import { FunctionInfo } from "../components/GuildSettingsGrid";

const functionInfo: FunctionInfo = {
  icon: <DownloadingIcon />,
  title: '기능 1',
  description: '이것은 기능 1의 설명의 예시입니다.',
  url: 'func_1',
  data: <> 바보 </>
};

export default functionInfo;
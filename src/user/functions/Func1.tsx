import React from "react";
import { Downloading as DownloadingIcon } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";

const body =
  <>
    기능 1 본문
  </>

const functionInfo: FunctionInterface = {
  icon: <DownloadingIcon />,
  title: '기능 1',
  description: '기능 1 설명',
  url: 'func_1',
  data: body
};

export default functionInfo;
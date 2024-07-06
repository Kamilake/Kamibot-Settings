import React from "react";
import { PhotoFilter, Smartphone } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";

const body =
  <>
    (아직 만들고 있어요..!)
  </>

const functionInfo: FunctionInterface = {
  icon: <PhotoFilter />,
  title: 'AI 툴킷',
  description: 'AI 그림, 동영상, 음성, 파일 변환 서비스',
  url: 'func_2',
  data: body
};

export default functionInfo;
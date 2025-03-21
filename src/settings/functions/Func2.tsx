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
  description: 'AI 그림 그리기, 사진·그림으로 그림 그리기, 동영상·음성·파일 변환 서비스',
  url: 'func_2',
  data: body,
  disabled: true
};

export default functionInfo;
import React from "react";
import { Downloading as DownloadingIcon, RecordVoiceOver } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";

const body =
  <>
    기능 1 본문
  </>

const functionInfo: FunctionInterface = {
  icon: <RecordVoiceOver />,
  title: '텍스트 음성 변환 (TTS)',
  description: '채널의 메세지를 음성 채널에서 소리내어 읽어주기',
  url: 'func_1',
  data: body
};

export default functionInfo;
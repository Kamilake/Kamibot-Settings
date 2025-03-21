import React from "react";
import { MarkChatRead } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";

const body =
  <>
    (아직 만들고 있어요..!)
  </>

const functionInfo: FunctionInterface = {
  icon: <MarkChatRead />,
  title: 'AI 채팅',
  description: 'AI 카미봇에게 무엇이든 물어보세요. 통계, 그림 그리기, 저녁 메뉴 고르기',
  url: 'ai_chat',
  data: body,
  disabled: true
};

export default functionInfo;
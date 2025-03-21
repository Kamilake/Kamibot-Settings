import React from "react";
import { NotificationsActive, PhotoFilter, Smartphone } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";

const body =
  <>
    (아직 만들고 있어요..!)
  </>

const functionInfo: FunctionInterface = {
  icon: <NotificationsActive />,
  title: '키워드알림',
  description: '서버에서 나를 부르거나 원하는 키워드가 보이면 카미봇이 알려주기',
  url: 'keyword-notify',
  data: body,
  disabled: true
};

export default functionInfo;
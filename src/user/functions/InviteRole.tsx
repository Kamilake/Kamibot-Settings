import React from "react";
import { NotificationsActive, PersonAdd, PhotoFilter, Smartphone } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";

const body =
  <>
    (아직 만들고 있어요..!)
  </>

const functionInfo: FunctionInterface = {
  icon: <PersonAdd />,
  title: '초대링크 기반 역할 부여',
  description: '특정 초대링크로 서버에 들어오면 특정 역할 자동 부여하기',
  url: 'intive-role',
  data: body,
  disabled: true
};
 
export default functionInfo;
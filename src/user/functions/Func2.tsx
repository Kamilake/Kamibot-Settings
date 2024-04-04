import React from "react";
import { Smartphone } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";

const body =
  <>
    기능 2 본문
  </>

const functionInfo: FunctionInterface = {
  icon: <Smartphone />,
  title: '기능 2',
  description: '기능 2 설명',
  url: 'func_2',
  data: body
};

export default functionInfo;
import React from "react";
import { ViewInAr } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";
import { Link } from "@mui/material";

const body =
  <>
    자세한 사용 방법은 <Link href="https://help.kamibot.app/minecraft/">도움말 사이트</Link>를 참고해주세요<br />
    <br />
    사용 가능 버전: <br />
    Forge 1.20.x, 1.21.x <Link href="https://github.com/Kamilake/Kamibot-Remote-Forge/releases/">다운로드</Link><br />
    Spigot/Paper 1.20.x, 1.21.x <Link href="https://github.com/Kamilake/Kamibot-Remote-Paper/releases/">다운로드</Link><br />
    Fabric 1.20.x, 1.21.x <Link href="https://github.com/Kamilake/Kamibot-Remote-Paper/releases/">다운로드</Link><br />
    Vanilla Java 1.20.x, 1.21.x (BungeeCord 사용)<br />
    Vanilla Bedrock 1.20.x, 1.21.x (GeyserMC 사용)<br />
    <video src="/public/m.webm" style={{ maxWidth: '100%', height: 'auto' }} autoPlay controls />
  </>

const functionInfo: FunctionInterface = {
  icon: <ViewInAr />,
  title: 'Minecraft 연동',
  description: '양방향 채팅, 서버 명령어 전송, 마크에서 AI채팅 사용',
  url: 'minecraft-remote',
  data: body
};

export default functionInfo;
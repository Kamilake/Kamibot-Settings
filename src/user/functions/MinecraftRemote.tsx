import React from "react";
import { PhotoFilter, Smartphone, ViewInAr } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";
import { Link } from "@mui/material";

const body =
  <>
    아, 이거 다 만들었는데 아직 웹 UI에는 구현을 안했어요. 마크 명령어쪽은 완성되어 있으니까 사용해보고 싶은 분은 kamilake에게 DM 주세요!<br />
    사용 가능 버전: <br />
    Forge 1.20.x, 1.21.x <Link href="https://github.com/Kamilake/Kamibot-Remote-Forge">다운로드</Link><br />
    Spigot/Paper 1.20.x, 1.12.x <Link href="https://github.com/Kamilake/Kamibot-Remote-Paper/releases">다운로드</Link><br />
    Fabric 1.20.x, 1.21.x<br />
    Vanilla Java 1.20.x, 1.21.x (BungeeCord 사용)<br />
    Vanilla Bedrock 1.20.x, 1.21.x (GeyserMC 사용)<br />
    <video src="/public/m.webm" style={{ maxWidth: '100%', height: 'auto' }} autoPlay controls />
  </>

const functionInfo: FunctionInterface = {
  icon: <ViewInAr />,
  title: 'Minecraft 연동',
  description: '양방향 채팅, 서버 명령어 전송, 서버 상태 확인 같은 기능들이 있어요!',
  url: 'minecraft-remote',
  data: body
};

export default functionInfo;
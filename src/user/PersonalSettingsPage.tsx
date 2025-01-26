import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// ThemeProvider 
import { createTheme } from '@mui/material/styles';

import fetchActorListApi from '../api/fetchActorListApi';

import { SnackbarProvider } from 'notistack'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import InfoIcon from '@mui/icons-material/Info';

import BadgeAvatars from './components/BadgeAvatars';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VoiceActorComboBox from './components/VoiceActorComboBox';

import fetchUserInfoApi from '../api/fetchUserInfoApi';

import Molu from './components/Molu';
import Header from './components/Header';

import { Actor } from '../api/fetchActorListApi';
import { User } from '../api/fetchUserInfoApi';
import DropdownLabel from './components/DropdownLabel';
import { SelectChangeEvent } from '@mui/material';
import setGuildFuncApi from '../api/setGuildFuncApi';
import TextboxLabel from './components/TextboxLabel';
import setUserFuncApi from '../api/setUserFuncApi';
import TwemojiText from '../../utils/twemojiUtil/TwemojiText';
function findActorById(id: string, actorData: Actor[]): Actor | undefined {
  return actorData.find(actor => actor.id === id);
}



const PersonalSettings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: actorData, loading: actorLoading, error: actorError } = fetchActorListApi();

  let actors: Actor[] = actorData;
  let user: User = fetchUserInfoApi().data;
  let { data: userData, loading: userLoading, error: userError } = fetchUserInfoApi();

  // 만약 데이터가 {}이면 로그인 페이지로 리디렉션
  if (JSON.stringify(userData) === JSON.stringify({})) {
    window.location.href = "https://discord.com/application-directory/1019061779357245521";
  }

  const [emoteUpscale, setEmoteUpscale] = React.useState('default'); // 알림
  const [shortName, setShortName] = React.useState(""); // 짧은 이름

  // handleEmoteUpscaleChange
  const handleEmoteUpscaleChange = (event: SelectChangeEvent<any>) => {
    setEmoteUpscale(event.target.value as string);
  };
  let [voiceActorValue, setVoiceActorValue] = React.useState(
    {
      displayName: "로드 중...",
      id: "notset",
      gender: "f",
      language: "ko-KR",
      categoryName: "",
      disabled: true,
    });

  React.useEffect(() => {
    if (!userLoading && !actorLoading && userData && actorData) {
      setVoiceActorValue(findActorById(userData.ttsActor == "notset" ? "kyuri" : userData.ttsActor, actorData) || voiceActorValue);
      setShortName(userData.ttsFriendlyName);
    }
  }, [userLoading, actorLoading]);

  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '& label': {
              fontSize: 22,
            },
          },
          input: {
            fontSize: 22,
          },
          listbox: {
            fontSize: 22,
          },
        },
      },
    },
  });

  // let memberName = data?.userEffectiveName ? `${data.userEffectiveName}님` : "여러분";

  let userName = userData.userEffectiveName;
  let ttsFriendlyName = userData.ttsFriendlyName;
  let userLevel = userData.userLevel;
  let avatar = userData.userAvatarUrl;
  let channelName = userData.channelName;
  let channelId = userData.channelId;
  let guildName = userData.guildName;
  let guildId = userData.guildId;


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        <Header title="개인 설정" userAvatarUrl={avatar} />
        <div className="personal">
          <BadgeAvatars userName={userName + "님, 안녕하세요!"} avatarUrl={avatar} />
          <br />
          {userName} (도전과제 레벨 {userLevel})<br />
          {guildId == 0 ? null : <>
            {guildName + ' => ' + channelName}
            <br />
          </>}
          홈은 여전히 공사중이어서 아직 여기에 이것 저것 채우는 중이에요.<br />
        </div>
        {/* For variant="text", adjust the height via font-size */}
        <DropdownLabel
          label="이모지 업스케일링"
          value={emoteUpscale}
          onChange={handleEmoteUpscaleChange}
          items={[
            { value: 'default', text: '서버 기본값 (권장)' },
            { value: 'never', text: '절대로 사용하지 않기', disabled: true },
            { value: 'force', text: '무조건 사용하기', disabled: true },
          ]}
        />
        <TextboxLabel
          label="짧은 닉네임"
          // value={"기본값 텍스트"}
          value={shortName}
          onChange={handleShortNameChange}
          placeholder="카미"
          help={<>TTS 또는 AI 카미봇이 읽어줄 짧은 한글 사용자명을 설정해보세요.<br /><br />
            원래 닉네임인 'Kamilake' 대신 '카미'처럼 사람들이 주로 부르는 이름을 소리나는 대로 설정하면 돼요.<br /><br />
          </>}
        />
        <Box>
          <Typography variant="h5" gutterBottom component="div">
            TTS 보이스 설정
          </Typography>
          <Divider />
          <br />
          <VoiceActorComboBox
            value={voiceActorValue}
            setValue={setVoiceActorValue}
          />
          <br />
          {/*  style={{ fontFamily: 'Noto Color Emoji' }} */}
          <Typography
            style={{ fontFamily: 'Noto Color Emoji' }}
            variant="body1"
            gutterBottom
            component="div"
            sx={{ fontSize: '1rem' }}
          >
            선택한 보이스: {voiceActorValue ? voiceActorValue.displayName : "없음"}
          </Typography>
          <br />
          <Divider />
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="여러분의 원래 목소리는 유리였어요." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="국가가 일치하지 않으면 목소리가 어색할 수 있어요." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="비활성화된 목소리는 서비스 준비 중이지만, 꼭 써보고 싶다면 따로 연락해주세요!" />
            </ListItem>
          </List>

          <br />
          <Link href="https://www.ncloud.com/product/aiService/clovaVoice" target="_blank" rel="noopener noreferrer">
            <Button variant="contained" color="secondary" endIcon={<OpenInNewIcon />}>
              (외부 사이트) 보이스 샘플 듣기
            </Button>
          </Link>
          <br />

          <br />
          {/* <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" /> <br /> */}

          {/* <Button variant="contained" color="primary" onClick={gohome}> 채널 설정으로 이동 </Button> */}
          <br />
          <br />
          <br />
          <br />
        </Box>
        <br />
        <Molu />
      </Box>
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} />
    </Container>
  );
}

export default PersonalSettings;
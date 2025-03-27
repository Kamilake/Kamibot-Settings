import * as React from 'react';

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { SelectChangeEvent } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Icons
import InfoIcon from '@mui/icons-material/Info';

// Notifications
import { SnackbarProvider } from 'notistack';

// Custom Components
import BadgeAvatars from './components/BadgeAvatars';
import VoiceActorComboBox from './components/VoiceActorComboBox';
import Header from './components/Header';
import DropdownLabel from './components/DropdownLabel';
import TextboxLabel from './components/TextboxLabel';
import TwemojiText from '../../utils/twemojiUtil/TwemojiText';

// API Services
import setGuildFuncApi from '../api/setGuildFuncApi';
import setUserFuncApi from '../api/setUserFuncApi';

// Context
import { useUser } from '../contexts/User/UserContext';
import { useActor } from '../contexts/User/Actors/ActorContext';
import { Actor } from '../contexts/User/Actors/FetchActors';
import { useHeader } from '../contexts/HeaderContext';

function findActorById(id: string, actorData: Actor[]): Actor | undefined {
  return actorData.find(actor => actor.id === id);
}

const PersonalSettings: React.FC = () => {
  const { actorList, isActorLoaded } = useActor();
  const { user, isUserLoaded } = useUser();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle('개인 설정');
    return () => setTitle('카미봇');
  }, [setTitle]);


  // 로그인 체크
  if (JSON.stringify(user) === JSON.stringify({})) {
    window.location.href = "https://discord.com/application-directory/1019061779357245521";
  }

  const [emoteUpscale, setEmoteUpscale] = React.useState('default');
  const [shortName, setShortName] = React.useState("");
  const [voiceActorValue, setVoiceActorValue] = React.useState({
    displayName: "로드 중...",
    id: "notset",
    gender: "f",
    language: "ko-KR",
    categoryName: "",
    disabled: true,
    hidden: false,
  });

  // 이모지 업스케일 변경 핸들러
  const handleEmoteUpscaleChange = (event: SelectChangeEvent<any>) => {
    const emoteUpscaleValue: string = event.target.value as string;
    setGuildFuncApi(
      'emote_upscale',
      { 'personal_override': emoteUpscaleValue },
      () => {
        setEmoteUpscale(emoteUpscaleValue);
      },
    );
  };

  // 짧은 이름 변경 핸들러
  const handleShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shortNameValue: string = event.target.value;
    setUserFuncApi('short_name', shortNameValue, '보이스 설정을 변경했어요!');
  }

  React.useEffect(() => {
    if (isUserLoaded && isActorLoaded && user) {
      setVoiceActorValue(findActorById(user.ttsActor == "notset" ? "kyuri" : user.ttsActor, actorList) || voiceActorValue);
      setShortName(user.ttsFriendlyName);
    }
  }, [isUserLoaded, isActorLoaded]);

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

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 0 }}>
        <Header />
        <div className="personal">
          <BadgeAvatars userName={user.userEffectiveName + "님, 안녕하세요!"} avatarUrl={user.userAvatarUrl} />
          <br />
          <br />
          {user.guildId == 0 ? null : (
            <>
              <TwemojiText>
                {user.guildName + ' => ' + user.channelName}
              </TwemojiText>
              <br />
            </>
          )}
          <TwemojiText>
            이 개인 설정 페이지에서 여러 가지 설정을 바꿔보세요!😆
          </TwemojiText>
          <br />
        </div>

        <DropdownLabel
          label="이모지 업스케일링"
          value={emoteUpscale}
          onChange={handleEmoteUpscaleChange}
          items={[
            { value: 'default', text: '서버 기본값 (권장)' },
            { value: 'never', text: '절대로 사용하지 않기', disabled: false },
            { value: 'force', text: '무조건 사용하기', disabled: false },
          ]}
        />

        <TextboxLabel
          label="짧은 닉네임"
          value={shortName}
          onChange={handleShortNameChange}
          placeholder="카미"
          help={<>
            TTS 또는 AI 카미봇이 읽어줄 짧은 한글 사용자명을 설정해보세요.<br /><br />
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
          <Typography
            marginTop={2}
            style={{ fontFamily: 'Noto Color Emoji' }}
            variant="body1"
            gutterBottom
            component="div"
            sx={{ fontSize: '1rem' }}
          >
            선택한 보이스: {voiceActorValue ? voiceActorValue.displayName.split("|")[0] : "없음"}
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
              <ListItemText primary={<TwemojiText>'베타' 표시가 있는 보이스는 실험적이라 언제든지 바뀔 수 있어요😅 (많은 피드백 부탁드려요!)</TwemojiText>} />
            </ListItem>
          </List>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Box>
        <br />
      </Box>
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
    </Container>
  );
}

export default PersonalSettings;
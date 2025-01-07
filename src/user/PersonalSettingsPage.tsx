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
        <br />
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
          <br />
          <br />
          {/* <Typography variant="h5" gutterBottom component="div">
            보이스 선택 옵션이 변경되었어요
          </Typography> */}
          <Divider />
          {/* <Typography variant="body1" gutterBottom component="div">
            카미봇은 {memberName}의 채팅을 읽어주는 서비스를 제공하면서 다양한 제 3자 음성 합성 서비스를 활용하고 있어요. 이런 서비스들은 각각 다른 비용을 가지고 있고, 그 중 일부는 글자당 요금이 상당히 높아요. 최근 카미봇 사용자가 많이 늘어나면서 이런 서비스 비용이 점점 부담이 되기 시작했어요. (설날에는 2만원이 넘어갔어요!)<br />
            <br />
            그래서 저희는 어려운 결정을 내렸어요. <b>글자당 요금이 높은 음성 합성 서비스는 일시적으로 비활성화하기로 했어요.</b> 이로 인해 사용 가능한 보이스의 수가 줄어들었지만, 이는 카미봇 서비스를 계속해서 제공하기 위한 필요한 조치였어요.<br />
            <br />
            현재는 비용 효율적인 음성 합성 서비스만 선택할 수 있도록 설정되어 있어요. 이는 {memberName}에게 여전히 다양한 보이스를 무료로 제공하면서도 서비스 비용을 관리할 수 있게 해줘요.<br />
            <br />
            하지만 걱정하지 마세요. 카미봇은 여전히 다양한 고품질의 음성 옵션을 제공하고 있으며, {memberName}의 채팅을 생생한 음성으로 전환할 수 있는 다양한 선택지를 갖추고 있답니다 :D<br />
            <br />
            그리고 좋은 소식이 있어요! 보이스를 유지하기 위해 저희는 카미봇에 여러 가지 도전 과제를 추가할 예정이에요. <b>멤버십을 가진 사용자나 도전 과제를 달성한 사용자는 추가적인 보이스 모델을 사용할 수 있게 될 거예요.</b> 이렇게 하면 {memberName}이 카미봇을 더욱 즐겁게 사용하면서 다양한 숨겨진 기능들을 경험할 수 있죠. 이 기능에 대한 자세한 내용은 곧 공개될 예정이니, 기대해주세요!<br />
            <br />
            더 궁금하신 점이 있으시다면 @kamilake에게 말해주세요. {memberName}의 의견은 서비스를 개선하고, 더 다양한 보이스를 제공하는 데 큰 도움이 될 거예요.<br />
            <br />
            감사합니다!
          </Typography> */}
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
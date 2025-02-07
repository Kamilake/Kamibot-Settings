// NestedList.js
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import SendIcon from '@mui/icons-material/Send';
import Twitter from '@mui/icons-material/Twitter';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import CampaignIcon from '@mui/icons-material/Campaign';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import ChatIcon from '@mui/icons-material/Chat';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import GTranslateIcon from '@mui/icons-material/GTranslate';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';

import { enqueueSnackbar } from 'notistack'

import fetchChannelInfoApi from '../../api/fetchChannelInfoApi';
import setChannelFuncApi from '../../api/setChannelFuncApi';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';


interface ListItem {
  help?: string;
  id: string;
  text: string;
  icon: JSX.Element;
  shortName: string;
  category?: string;
  disabled?: boolean;
}
const listItemData = [
  { id: "emote_upscale", text: "이모지 업스케일링", icon: <AddReactionIcon />, shortName: '이모지 업스케일링', help: <>활성화하면 이모지를 크게 표시해요. 단순히 늘려서 보여주거나 봇이 다시 보내주는 것이 아니라 AI를 통해 정확히 스티커 크기만한 이모지를 제작해서 채널에 자연스럽게 스티커처럼 녹아 들어가듯 보여줄 수 있어요.<br></br><br></br>비활성화하면 이 채널에서 이모지 업스케일링이 작동하지 않아요.</> },
  // { id: "hello_world", text: "Sent mail", icon: <SendIcon />, shortName: 'Sent mail', disabled: true },
  { id: "twitter_embed", text: "트위터 링크에 미리보기 임베드 표시", icon: <Twitter />, shortName: '트위터 임베드', help: "트위터 링크를 누르지 않아도 동영상을 재생하거나 사진을 고화질로 보거나 민감한 게시물의 미리보기를 확인하세요! 이렇게 하면 트위터 유저와 트위터를 사용하지 않는 유저 모두 훨씬 편하게 포스트를 읽을 수 있어요.", disabled: false },
  { id: "vchannel", text: "가변 음성채널 트리거 채널", icon: <RecordVoiceOverIcon />, shortName: '가변 음성채널', help: "\"음성채널 만들기\" 같이 알기 쉬운 이름으로 채널을 만들어두고 이 옵션을 켜 보세요. 그러면 그 채널을 눌렀을 때 나만의 음성 채널을 만들어 줄 수 있어요!", disabled: false },
  { id: "auto_tts", text: "대화하면 TTS 켜지는 채널", icon: <VoiceChatIcon />, shortName: 'TTS', category: 'tts', disabled: false },
  { id: "tts_join_notify", text: "음성 채널 입장/퇴장 알려주기", icon: <CampaignIcon />, shortName: '입퇴장 알림', category: 'tts', help: <>화면을 보고 있지 않아도 누가 들어오고 나간 지 알 수 있도록 할 수 있어요. 누군가 들어오면 카미봇이 "Kami님 입장" 처럼 알려줄 거예요.<br></br><Link href={`/user/guild/tts${window.location.search}`}>음성 알림</Link>에서 자세히 설정하거나 모든 채널에서 비활성화할 수 있어요.</> },
  { id: "ai_toolkit", text: "AI Toolkit (인공지능 그림, 도구 모음)", icon: <PhotoFilterIcon />, shortName: 'AI 툴킷' },
  { id: "emote_upload", text: "커스텀 이모지 업로드 전용 채널", icon: <AddReactionIcon />, shortName: '이모지 업로드', help: <>"이모지 추가하기" 같은 이름으로 채널을 만들어 두고 이 옵션을 켜 보세요. 그렇게 하면 이 채널에 사진과 이름을 입력하는 것만으로도 이모지를 업로드할 수 있어요. 매우 길이가 긴 GIF 또는 고해상도 이모지도 처리할 수 있고 '이모지 업스케일링'과 함께 사용하면 Discord 용량 제한보다 더 큰 이모지도 표현할 수 있어요!<img src="/public/custom_emoji_help.png" alt="Discord 서버에서 이모지 등록하는 모습" style={{ maxWidth: '100%', height: 'auto' }} /></> },
  // { id: "wave", text: "안녕하세요!", icon: <WavingHandIcon />, shortName: '안녕하세요', disabled: true, help: "이 기능은 서버 설정으로 이동했어요" },
  { id: "changelog", text: "카미봇의 멋진 업데이트 소식 받아보기!", icon: <TipsAndUpdatesIcon />, shortName: '업데이트 소식', help: "지금은 카미봇의 지원 서버에서만 업데이트를 발행하고 있어요", disabled: true },
  { id: "llm", text: "카미봇 AI채팅 채널", icon: <MarkChatReadIcon />, shortName: 'AI채팅', category: 'llm', help: "AI채팅 채널로 설정한 채널에선 카미봇이 여러분의 질문에 답하거나 원하는 동작을 수행할 수 있어요. 예를 들어 멤버 채팅 통계를 만들거나 그림을 그리거나 서버를 관리할 수 있어요." },
  { id: "gpt4", text: "AI채팅 Pro (GPT4)", icon: <ReviewsIcon />, shortName: '카미봇 Pro', category: 'llm', disabled: true },
  { id: "translate", text: "다국어 실시간 번역 채널", icon: <GTranslateIcon />, shortName: '번역', disabled: true },
  // 다른 아이템들...
] as ListItem[];
// listItemData에서 id를 키로 사용하여 해당 아이템의 shortName을 가져옵니다.
function getShortNameById(id: string): string {
  const listItem = listItemData.find(item => item.id === id);
  if (!listItem) {
    return '[알 수 없음]';
  }

  return listItem.shortName;
}

export default function NestedChannelSettingsListOld({ channelSelectValue, channelId }) {
  const [opens, setOpens] = React.useState({});
  let { data, loading, error } = fetchChannelInfoApi({ channelId });


  // 카테고리 리스트
  let categoryList = [
    { id: "tts", text: "음성으로 읽어주기 (TTS)", icon: <VoiceChatIcon /> },
    { id: "llm", text: "AI 채팅 (인공지능 챗봇)", icon: <ChatIcon /> },
  ];
  // 카테고리
  const categories = [...new Set(listItemData.map(item => item.category).filter(Boolean))];

  const handleClick = (id) => {
    setOpens((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };


  const [helpOpen, setHelpOpen] = React.useState({});

  const handleHelpOpen = (id) => {
    setHelpOpen(prevState => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleHelpClose = (id) => {
    setHelpOpen(prevState => ({
      ...prevState,
      [id]: false,
    }));
  };
  const [switchStates, setSwitchStates] = React.useState({});
  // setChannelFuncApi('llm', true);
  const handleSwitchToggle = (id, state) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    console.log(id + " : " + !state);


    setChannelFuncApi(id, channelId, !state, getShortNameById(id) + " 설정을 " + (state ? "비" : "") + "활성화했어요.", setSwitchStates);
    // enqueueSnackbar(listItemData.find(item => item.id === id).shortName + " 설정을 " + (state ? "비" : "") + "활성화했어요.", { variant: 'success' });
  };

  React.useEffect(() => {
    if (!loading && data.name !== undefined) {
      setSwitchStates((prevState) => ({
        ...prevState,
        ['llm']: data.llm,
        ['ai_toolkit']: data.ai_toolkit,
        ['twitter_embed']: data.twitter_embed,
        ['emote_upscale']: data.emote_upscale,
        ['vchannel']: data.vchannel,
        ['emote_upload']: data.emote_upload,
        ['tts_join_notify']: data.tts_join_notify,
        ['auto_tts']: data.auto_tts,
      }));
      enqueueSnackbar(data.name + " 채널을 로드했어요.");
    }
  }, [data]); // 사용자가 채널을 선택할 때마다 실행

  interface ItemWithHelpModalProps {
    item: ListItem;
    handleSwitchToggle: (id: string, state: boolean) => void;
    switchStates: { [key: string]: boolean };
    loading: boolean;
    handleHelpOpen: (id: string) => void;
    handleHelpClose: (id: string) => void;
    helpOpen: { [key: string]: boolean };
  }

  const ItemWithHelpModal = (props: ItemWithHelpModalProps) => {
    const { item, handleSwitchToggle, switchStates, loading, handleHelpOpen, handleHelpClose, helpOpen } = props;
    return (
      <>
        <ListItemButton key={item.id} onClick={() => handleSwitchToggle(item.id, switchStates[item.id])} disabled={loading || item.disabled}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
          <IconButton onClick={(event) => {
            event.stopPropagation();
            handleHelpOpen(item.id);
          }}
            disabled={(!item.disabled && !item.help)}
          >
            <HelpOutline />
          </IconButton>
          <Switch checked={!!switchStates[item.id]} onClick={() => { }} disabled={loading} />
        </ListItemButton>
        <Dialog open={helpOpen[item.id] || false} onClose={() => handleHelpClose(item.id)}>
          <DialogTitle>{"도움말"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {item.help}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleHelpClose(item.id)} autoFocus>
              {"닫기"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          채널 ID: {channelSelectValue.channelId} ({channelSelectValue.channelName})
        </ListSubheader>
      }
    >
      {listItemData.map((item) => (
        item.category == null &&
        <ItemWithHelpModal
          item={item}
          handleSwitchToggle={handleSwitchToggle}
          switchStates={switchStates}
          loading={loading}
          handleHelpOpen={handleHelpOpen}
          handleHelpClose={handleHelpClose}
          helpOpen={helpOpen}
        />
      ))}
      {
        categories.map(category => (
          category !== undefined &&
          <>
            <ListItemButton onClick={() => handleClick(category)}>
              <ListItemIcon>
                {listItemData.find(item => item.category === category)?.icon}
              </ListItemIcon>
              <ListItemText primary={categoryList.find(item => item.id === category)?.text} />
              {!opens[category] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={!opens[category]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ paddingLeft: 2 }}>
                {
                  listItemData.map(item => (
                    item.category === category &&
                    <ItemWithHelpModal
                      item={item}
                      handleSwitchToggle={handleSwitchToggle}
                      switchStates={switchStates}
                      loading={loading}
                      handleHelpOpen={handleHelpOpen}
                      handleHelpClose={handleHelpClose}
                      helpOpen={helpOpen}
                    />
                  ))
                }
              </List>
            </Collapse>
          </>
        ))
      }
    </List>
  );
}
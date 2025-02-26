// NestedList.js
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import Twitter from '@mui/icons-material/Twitter';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import CampaignIcon from '@mui/icons-material/Campaign';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ChatIcon from '@mui/icons-material/Chat';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import GTranslateIcon from '@mui/icons-material/GTranslate';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { enqueueSnackbar } from 'notistack'

import fetchChannelInfoApi from '../../api/fetchChannelInfoApi';
import setChannelFuncApi from '../../api/setChannelFuncApi';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, ListItem } from '@mui/material';
import { Check, DocumentScanner, DoNotDisturb, HelpOutline, HorizontalRule } from '@mui/icons-material';
import TriSwitch from './TriSwitch';
import L from './L';


interface ListItem {
  help?: string;
  id: string;
  text: string;
  icon: JSX.Element;
  name: string;
  category?: string;
  disabled: boolean;
}

const listItemData = [
  { id: "emote_upscale", name: '이모지 업스케일링', text: "서버 커스텀 이모지를 고화질로 확대", icon: <AddReactionIcon />, help: <>활성화하면 이모지를 크게 표시해요. 단순히 늘려서 보여주거나 봇이 다시 보내주는 것이 아니라 AI를 통해 정확히 스티커 크기만한 이모지를 제작해서 채널에 자연스럽게 스티커처럼 녹아 들어가듯 보여줄 수 있어요.<br></br><br></br>비활성화하면 이 채널에서 이모지 업스케일링이 작동하지 않아요.</>, disabled: false },
  // { id: "hello_world", name: 'Sent mail', text: "Sent mail", icon: <SendIcon />, disabled: true },
  { id: "twitter_embed", name: '트위터 링크 미리보기', text: "트위터 링크에 미리보기 임베드 표시", icon: <Twitter />, help: "트위터 링크를 누르지 않아도 동영상을 재생하거나 사진을 고화질로 보거나 제한된 게시물의 미리보기를 확인하세요! 이렇게 하면 트위터 유저와 트위터를 사용하지 않는 유저 모두 훨씬 편하게 포스트를 읽을 수 있어요.", disabled: false },
  { id: "hwp_convert", name: 'HWP 미리보기', text: "한컴오피스 한글 문서를 PDF, Word로 변환", icon: <DocumentScanner />, help: "HWP 문서를 첨부파일로 올리면 한컴오피스 한글이 설치되어 있지 않은 멤버들도 파일을 볼 수 있게  PDF, Word와 같은 여러 형식으로 다운로드할 수 있는 작은 버튼을 만들어 주는 기능이에요.", disabled: false },
  // { id: "vchannel", name: '가변 음성채널', text: "\"🔊음성채널 생성하기\" 채널로 임시 음성채널 만들기", icon: <RecordVoiceOverIcon />, help: "\"음성채널 만들기\" 같이 알기 쉬운 이름으로 채널을 만들어두고 이 옵션을 켜 보세요. 그러면 그 채널을 눌렀을 때 나만의 음성 채널을 만들어 줄 수 있어요!", disabled: false },
  { id: "auto_tts", name: 'TTS 자동 시작', text: "명령을 입력하지 않아도 TTS 자동으로 켜기", icon: <VoiceChatIcon />, category: 'tts', disabled: false },
  { id: "tts_join_notify", name: '입퇴장 알림', text: "멤버 음성 채널 입장퇴장 알려주기", icon: <CampaignIcon />, help: <>화면을 보고 있지 않아도 누가 들어오고 나간 지 알 수 있도록 할 수 있어요. 누군가 들어오면 카미봇이 "Kami님 입장" 처럼 알려줄 거예요.<br></br><L to={`/user/guild/tts${window.location.search}`}>음성 알림</L>에서 자세히 설정하거나 모든 채널에서 비활성화할 수 있어요.</>, category: 'tts', disabled: false },
  // { id: "ai_toolkit", name: 'AI 툴킷', text: "AI Toolkit, AI그림과 도구 모음", icon: <PhotoFilterIcon />, disabled: false },
  // { id: "emote_upload", name: '이모지 업로드', text: "커스텀 이모지 업로드 전용 채널", icon: <AddReactionIcon />, help: <>"이모지 추가하기" 같은 이름으로 채널을 만들어 두고 이 옵션을 켜 보세요. 그렇게 하면 이 채널에 사진과 이름을 입력하는 것만으로도 이모지를 업로드할 수 있어요. 매우 길이가 긴 GIF 또는 고해상도 이모지도 처리할 수 있고 '이모지 업스케일링'과 함께 사용하면 Discord 용량 제한보다 더 큰 이모지도 표현할 수 있어요!<img src="/public/custom_emoji_help.png" alt="Discord 서버에서 이모지 등록하는 모습" style={{ maxWidth: '100%', height: 'auto' }} /></>, disabled: false },
  // { id: "wave", name: '안녕하세요', text: "안녕하세요!", icon: <WavingHandIcon />, help: "이 기능은 서버 설정으로 이동했어요", disabled: true },
  { id: "changelog", name: '업데이트 소식', text: "카미봇의 멋진 업데이트 소식 받아보기!", icon: <TipsAndUpdatesIcon />, help: "지금은 카미봇의 지원 서버에서만 업데이트를 발행하고 있어요", disabled: true },
  { id: "llm", name: '멘션으로 카미봇 호출', text: "@카미봇 멘션을 사용해 어디서나 카미봇의 AI채팅을 사용하기", icon: <MarkChatReadIcon />, category: 'llm', disabled: false },
  // { id: "gpt4", name: '카미봇 Pro', text: "AI채팅 Pro (GPT4)", icon: <ReviewsIcon />, category: 'llm', disabled: true },
  // { id: "translate", name: '번역', text: "일본어/영어/한국어 실시간 번역", icon: <GTranslateIcon />, disabled: true },
  // 다른 아이템들...
] as ListItem[];
// listItemData에서 id를 키로 사용하여 해당 아이템의 name을 가져옵니다.
function getnameById(id: string): string {
  const listItem = listItemData.find(item => item.id === id);
  if (!listItem) {
    return '[알 수 없음]';
  }

  return listItem.name;
}

export default function NestedChannelSettingsList({ channelSelectValue, channelId }) {
  const [opens, setOpens] = React.useState({});
  let { data, loading, error } = fetchChannelInfoApi({ channelId });


  // 카테고리 리스트
  let categoryList = [
    { id: "tts", text: "TTS", icon: <VoiceChatIcon /> },
    { id: "llm", text: "AI 채팅", icon: <ChatIcon /> },
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
  const handleSwitchToggle = (id: string, state: ('on' | 'off' | 'unset')) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      // [id]: !prevState[id],
      [id]: state,
    }));
    console.log(id + " : " + state);

    let hintString = getnameById(id) + " 설정을 ";
    if (state === 'on') {
      hintString += "활성화했어요.";
    } else if (state === 'off') {
      hintString += "비활성화했어요.";
    } else {
      hintString += "기본값으로 설정했어요.";
    }
    setChannelFuncApi(id, channelId, state, hintString, setSwitchStates);
    // enqueueSnackbar(listItemData.find(item => item.id === id).name + " 설정을 " + (state ? "비" : "") + "활성화했어요.", { variant: 'success' });
  };

  React.useEffect(() => {
    if (!loading && data.name !== undefined) {
      console.log("data 도착!");
      console.log(data);
      setSwitchStates((prevState) => ({
        ...prevState,
        ['emote_upscale']: data.use_emote_upscaler,
        ['llm']: data.use_llm,
        ['auto_tts']: data.use_auto_tts,
        ['hwp_convert']: data.use_docs_converter,
        ['tts_join_notify']: data.use_tts_join_notify,
        ['dedicated_channel']: data.dedicated_channel,
        ['twitter_embed']: data.use_twitter_embed,
      }));
      enqueueSnackbar(data.name + " 채널을 불러왔어요");

    }
  }, [data]); // 사용자가 채널을 선택할 때마다 실행

  interface ItemWithHelpModalProps {
    item: ListItem;
    handleSwitchToggle: (id: string, state: ('on' | 'off' | 'unset')) => void;
    switchStates: { [key: string]: ('on' | 'off' | 'unset') };
    loading: boolean;
    handleHelpOpen: (id: string) => void;
    handleHelpClose: (id: string) => void;
    helpOpen: { [key: string]: boolean };
  }

  const ItemWithHelpModal = (props: ItemWithHelpModalProps) => {
    const { item, handleSwitchToggle, switchStates, loading, handleHelpOpen, handleHelpClose, helpOpen } = props;
    return (
      <>
        <ListItem key={item.id}>
          <ListItemIcon
            sx={{ minWidth: '40px' }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.name} secondary={item.text} />
          {item.help &&
            <IconButton onClick={() => {
              handleHelpOpen(item.id);
            }}
            >
              <HelpOutline />
            </IconButton>}
          <TriSwitch status={switchStates[item.id]} onClick={(alignment) => handleSwitchToggle(item.id, alignment)} disabled={loading || item.disabled} />
        </ListItem>
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
        <>
          <ListSubheader component="div" id="nested-list-subheader">
            채널 ID: {channelSelectValue.channelId} ({channelSelectValue.channelName})
          </ListSubheader>
          <List dense sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '4px' }}>
            <ListItem>
              <ListItemIcon>
                <Check color='success' />
              </ListItemIcon>
              <ListItemText primary="이 채널에서 기능 항상 사용하기" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HorizontalRule />
              </ListItemIcon>
              <ListItemText primary="서버 기본값 채널 설정에 따르기"
                secondary={<>전체 설정을 바꾸시려면 <L to={`/user/guild/general${window.location.search}`}>채널 기본값 설정</L>을 사용하세요</>} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DoNotDisturb color='error' />
              </ListItemIcon>
              <ListItemText primary="이 채널에서 기능 사용 금지" />
            </ListItem>
          </List>
        </>
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
            <ListItemButton
              onClick={() => handleClick(category)}
              sx={{
                backgroundColor: '#DDDDDD',
                '&:hover': {
                  backgroundColor: '#BBBBBB',
                }
              }}
            >
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
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


interface ListItem {
  id: string;
  text: string;
  icon: JSX.Element;
  shortName: string;
  category?: string;
  disabled?: boolean;
}
const listItemData = [
  { id: "emote_upscale", text: "이모지 업스케일링", icon: <AddReactionIcon />, shortName: '이모지 업스케일링' },
  { id: "hello_world", text: "Sent mail", icon: <SendIcon />, shortName: 'Sent mail', disabled: true },
  { id: "twitter_embed", text: "트위터 링크에 미리보기 임베드 표시", icon: <Twitter />, shortName: '트위터 임베드', disabled: false },
  { id: "vchannel", text: "가변 음성채널 트리거 채널", icon: <RecordVoiceOverIcon />, shortName: '가변 음성채널', disabled: false },
  { id: "auto_tts", text: "대화하면 TTS 켜지는 채널", icon: <VoiceChatIcon />, shortName: 'TTS', category: 'tts', disabled: false },
  { id: "tts_join_notify", text: "음성 채널 입장/퇴장 알려주기", icon: <CampaignIcon />, shortName: '입퇴장 알림', category: 'tts' },
  { id: "ai_toolkit", text: "AI Toolkit (인공지능 그림, 도구 모음)", icon: <PhotoFilterIcon />, shortName: 'AI 툴킷' },
  { id: "emote_upload", text: "커스텀 이모지 업로드 전용 채널", icon: <AddReactionIcon />, shortName: '이모지 업로드' },
  { id: "wave", text: "안녕하세요!", icon: <WavingHandIcon />, shortName: '안녕하세요', disabled: true },
  { id: "changelog", text: "카미봇의 멋진 업데이트 소식 받아보기!", icon: <TipsAndUpdatesIcon />, shortName: '업데이트 소식', disabled: true },
  { id: "llm", text: "카미봇이 대답하기", icon: <MarkChatReadIcon />, shortName: '대화하기', category: 'llm' },
  { id: "gpt4", text: "카미봇 Pro (GPT4)", icon: <ReviewsIcon />, shortName: '카미봇 Pro', category: 'llm', disabled: true },
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

export default function NestedChannelSettingsList({ channelSelectValue, channelId }) {
  const [opens, setOpens] = React.useState({});
  let { data, loading, error } = fetchChannelInfoApi({ channelId });


  // 카테고리 리스트
  let categoryList = [
    { id: "tts", text: "음성으로 읽어주기(TTS)", icon: <VoiceChatIcon /> },
    { id: "llm", text: "인공지능 메세지 답장", icon: <ChatIcon /> },
  ];
  // 카테고리
  const categories = [...new Set(listItemData.map(item => item.category).filter(Boolean))];

  const handleClick = (id) => {
    setOpens((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
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
        ['emote_upscale']: data.minicuda,
        ['vchannel']: data.vchannel,
        ['emote_upload']: data.emote_upload,
        ['tts_join_notify']: data.tts_join_notify,
        ['auto_tts']: data.auto_tts,
      }));
      enqueueSnackbar(data.name + " 채널을 로드했어요.");
    }
  }, [data]); // 사용자가 채널을 선택할 때마다 실행

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          일반 설정 (채널: {channelSelectValue.channelId})
        </ListSubheader>
      }
    >
      {listItemData.map((item) => (
        item.category == null ?
          <ListItemButton key={item.id} onClick={() => handleSwitchToggle(item.id, switchStates[item.id])} disabled={loading || item.disabled}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            <Switch checked={!!switchStates[item.id]} onClick={() => { }} disabled={loading} />
          </ListItemButton> : null
      ))}
      {
        categories.map(category => (
          category === undefined ? null :
          <>
            <ListItemButton onClick={() => handleClick(category)}>
              <ListItemIcon>
                {listItemData.find(item => item.category === category).icon}
              </ListItemIcon>
              <ListItemText primary={categoryList.find(item => item.id === category).text} />
              {opens[category] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={opens[category]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  // 해당 category의 항목만 순회합니다.
                  listItemData.map(item => (
                    item.category === category ?
                      <ListItemButton sx={{ pl: 4 }} key={item.id} onClick={() => handleSwitchToggle(item.id, switchStates[item.id])} disabled={loading || item.disabled}>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        <Switch checked={!!switchStates[item.id]} onClick={() => { }} disabled={loading} />
                      </ListItemButton> : null
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
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
import PublicOffIcon from '@mui/icons-material/PublicOff';
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
import setGuildFuncApi from '../../api/setGuildFuncApi';

export default function NestedGuildSettingsList({ channelSelectValue, channelId }) {
    const [opens, setOpens] = React.useState({});
    let { data, loading, error } = fetchChannelInfoApi({ channelId });
    var listItemData = [
      { id: "deactivate", text: "카미봇 비활성화", icon: <PublicOffIcon />, shortName: 'deactivate', disabled: true },
      { id: "hello_world", text: "Sent mail", icon: <SendIcon />, shortName: 'Sent mail', disabled: true },
      { id: "auto_tts", text: "전체 설정 기능은 여전히 개발 중이에요", icon: <VoiceChatIcon />, shortName: 'TTS', category: 'tts', disabled: true },
      { id: "wave", text: "전체 설정 기능은 여전히 개발 중이에요", icon: <WavingHandIcon />, shortName: '안녕하세요', disabled: true },
      { id: "changelog", text: "1", icon: <TipsAndUpdatesIcon />, shortName: '업데이트 소식', disabled: true },
      { id: "gpt4", text: "카미봇 Pro (GPT4)", icon: <ReviewsIcon />, shortName: '카미봇 Pro', category: 'llm', disabled: true },
      // 다른 아이템들...
    ];

  // 카테고리 리스트
  var categoryList = [
    { id: "tts", text: "샘플 카테고리 1", icon: <VoiceChatIcon /> },
    { id: "llm", text: "샘플 카테고리 2", icon: <ChatIcon /> },
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
  // setGuildFuncApi('llm', true);
  const handleSwitchToggle = (id, state) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    console.log(id + " : " + !state);


    setGuildFuncApi(id, channelId, !state, (listItemData.find(item => item.id === id).shortName + " 설정을 " + (state ? "비" : "") + "활성화했어요."), setSwitchStates);
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
            <ListItemText primary={item.text} disabled={false} />
            <Switch checked={!!switchStates[item.id]} onClick={() => { }} disabled={loading} />
          </ListItemButton> : null
      ))}
      {
        categories.map(category => (
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
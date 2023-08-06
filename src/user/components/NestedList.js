// NestedList.js
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import SendIcon from '@mui/icons-material/Send';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import ChatIcon from '@mui/icons-material/Chat';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';

import { enqueueSnackbar } from 'notistack'

import fetchChannelInfoApi from '../../api/fetchChannelInfoApi';
import setChannelFuncApi from '../../api/setChannelFuncApi';

export default function NestedList({ channelSelectValue, channelId }) {
  const [open, setOpen] = React.useState(true);
  let { data, loading, error } = fetchChannelInfoApi({ channelId });
  var listItemData = [
    { id: "emote_upscale", text: "이모지 업스케일링", icon: <AddReactionIcon />, shortName: '이모지 업스케일링' },
    { id: "hello_world", text: "Sent mail", icon: <SendIcon />, shortName: 'Sent mail', disabled: true },
    { id: "vchannel", text: "가변 음성채널 트리거 채널", icon: <RecordVoiceOverIcon />, shortName: '가변 음성채널', disabled: false },
    { id: "tts", text: "음성으로 읽어주기(TTS)", icon: <RecordVoiceOverIcon />, shortName: 'TTS', disabled: true },
    { id: "stable_diffusion", text: "AI 그림 그리기", icon: <PhotoFilterIcon />, shortName: 'AI그림' },
    { id: "wave", text: "안녕하세요!", icon: <WavingHandIcon />, shortName: '안녕하세요', disabled: true },
    { id: "changelog", text: "카미봇의 멋진 업데이트 소식 받아보기!", icon: <TipsAndUpdatesIcon />, shortName: '업데이트 소식', disabled: true },
    { id: "llm", text: "카미봇이 대답하기", icon: <MarkChatReadIcon />, shortName: '대화하기', category: 'llm' },
    { id: "gpt4", text: "카미봇 Pro (GPT4)", icon: <ReviewsIcon />, shortName: '카미봇 Pro', category: 'llm', disabled: true },
    // 다른 아이템들...
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  const [switchStates, setSwitchStates] = React.useState({});
  // setChannelFuncApi('llm', true);
  const handleSwitchToggle = (id, state) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    console.log(id + " : " + !state);


    setChannelFuncApi(id, channelId, !state, (listItemData.find(item => item.id === id).shortName + " 설정을 " + (state ? "비" : "") + "활성화했어요."), setSwitchStates);
    // enqueueSnackbar(listItemData.find(item => item.id === id).shortName + " 설정을 " + (state ? "비" : "") + "활성화했어요.", { variant: 'success' });
  };

  React.useEffect(() => {
    if (!loading && data.name !== undefined) {
      setSwitchStates((prevState) => ({
        ...prevState,
        ['llm']: data.llm,
        ['emote_upscale']: data.minicuda,
        ['vchannel']: data.vchannel,
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
    > {/* handleSwitchToggle(item_id, state) */}
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
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        {/*  { id: "llm", text: "인공지능 메세지 답장", icon: <ChatIcon />, shortName: '대화하기', hidden: true }, */}
        {/* id가 llm인 요소 가져오기 */}
        <ListItemText primary={"인공지능 메세지 답장"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {listItemData.map((item) => (
            item.category == 'llm' ?
              <ListItemButton sx={{ pl: 4 }} key={item.id} onClick={() => handleSwitchToggle(item.id, switchStates[item.id])} disabled={loading || item.disabled}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                <Switch checked={!!switchStates[item.id]} onClick={() => { }} disabled={loading} />
              </ListItemButton> : null
          ))}
        </List>
      </Collapse>
    </List>
  );
}
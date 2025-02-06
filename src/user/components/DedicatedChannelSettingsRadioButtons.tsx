import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ReviewsIcon from '@mui/icons-material/Reviews';

import { enqueueSnackbar } from 'notistack'

import fetchChannelInfoApi from '../../api/fetchChannelInfoApi';
import setChannelFuncApi from '../../api/setChannelFuncApi';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, ListItem, ToggleButton, ToggleButtonGroup, ToggleButtonTypeMap } from '@mui/material';
import { HelpOutline, } from '@mui/icons-material';
import ChannelIcon from './ChannelIcon';


interface ListItem {
  help?: string;
  color?: ToggleButtonTypeMap['props']['color'];
  id: string;
  text?: string;
  icon: JSX.Element;
  name: string;
  category?: string;
  disabled: boolean;
}

const listItemData = [
  { id: "unset", color: 'standard', name: '일반 채널 (기본값)', icon: <ChannelIcon />, disabled: false },
  { id: "llm", name: 'AI채팅 채널', text: "카미봇 AI채팅 채널", icon: <ReviewsIcon />, help: "AI채팅 채널로 설정한 채널에선 카미봇이 여러분의 질문에 답하거나 원하는 동작을 수행할 수 있어요. 예를 들어 멤버 채팅 통계를 만들거나 그림을 그리거나 서버를 관리할 수 있어요.", category: 'llm', disabled: false },
  { id: "vchannel", name: '가변 음성채널', text: "\"🔊음성채널 생성하기\" 채널로 임시 음성채널 만들기", icon: <RecordVoiceOverIcon />, help: "\"음성채널 만들기\" 같이 알기 쉬운 이름으로 채널을 만들어두고 이 옵션을 켜 보세요. 그러면 그 채널을 눌렀을 때 나만의 음성 채널을 만들어 줄 수 있어요!", disabled: false },
  { id: "ai_toolkit", name: 'AI 툴킷 채널', text: "AI Toolkit, AI그림과 도구 모음", icon: <PhotoFilterIcon />, disabled: false },
  { id: "emote_upload", name: '이모지 업로드 채널', text: "커스텀 이모지 업로드 전용 채널", icon: <AddReactionIcon />, help: <>"이모지 추가하기" 같은 이름으로 채널을 만들어 두고 이 옵션을 켜 보세요. 그렇게 하면 이 채널에 사진과 이름을 입력하는 것만으로도 이모지를 업로드할 수 있어요. 매우 길이가 긴 GIF 또는 고해상도 이모지도 처리할 수 있고 '이모지 업스케일링'과 함께 사용하면 Discord 용량 제한보다 더 큰 이모지도 표현할 수 있어요!<img src="/public/custom_emoji_help.png" alt="Discord 서버에서 이모지 등록하는 모습" style={{ maxWidth: '100%', height: 'auto' }} /></>, disabled: false },
  { id: "translate", name: '자동 번역 채널', text: "여러 나라의 언어를 번역하는 채널", icon: <VoiceChatIcon />, help: "트위터 링크를 누르지 않아도 동영상을 재생하거나 사진을 고화질로 보거나 민감한 게시물의 미리보기를 확인하세요! 이렇게 하면 트위터 유저와 트위터를 사용하지 않는 유저 모두 훨씬 편하게 포스트를 읽을 수 있어요.", disabled: false },
] as ListItem[];


// listItemData에서 id를 키로 사용하여 해당 아이템의 shortName을 가져옵니다.
function getNameById(id: string): string {
  const listItem = listItemData.find(item => item.id === id);
  if (!listItem) {
    return '[알 수 없음]';
  }

  return listItem.name;
}

export default function DedicatedChannelSettingsRadioButtons({ channelSelectValue, channelId, disabled = false }) {
  let { data, loading, error } = fetchChannelInfoApi({ channelId });
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
  // const [switchStates, setSwitchStates] = React.useState({});
  const [ToggleButtonState, setToggleButtonState] = React.useState('unset');

  const handleToggleButton = (event, newState) => {
    if (newState !== null) {
      const oldState = ToggleButtonState;
      setToggleButtonState(newState);
      setChannelFuncApi(
        'dedicated_channel',
        channelId,
        newState,
        '이 채널을 ' + getNameById(newState) + '로 변경했어요.',
        setToggleButtonState,
        ToggleButtonState
      );
    }
  };

  React.useEffect(() => {
    if (!loading && data.name !== undefined) {
      setToggleButtonState((prevState) => (
        //   {
        //   ...prevState,
        //   ['llm']: data.llm,
        //   ['ai_toolkit']: data.ai_toolkit,
        //   ['twitter_embed']: data.twitter_embed,
        //   ['emote_upscale']: data.emote_upscale,
        //   ['vchannel']: data.vchannel,
        //   ['emote_upload']: data.emote_upload,
        //   ['tts_join_notify']: data.tts_join_notify,
        //   ['auto_tts']: data.auto_tts,
        // }
        data.dedicated_channel
      ));
      // enqueueSnackbar(data.name + " 전용 채널을 불러왔어요");
    }
  }, [data]); // 사용자가 채널을 선택할 때마다 실행

  return (
    <>
      <ListSubheader component="div" id="nested-list-subheader">
        이 채널을 전용 채널로 설정하면 설정한 기능만을 수행하게 돼요.
      </ListSubheader>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={disabled ? 'default' : ToggleButtonState}
          orientation='vertical'
          exclusive
          onChange={handleToggleButton}
          aria-label="text alignment"
          disabled={disabled}
        >
          {listItemData.map((item) => (
            <ToggleButton
              value={item.id}
              disabled={item.disabled}
              color={item.color ? item.color : 'success'}
            >
              <ListItemIcon sx={{ marginRight: '-20px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemIcon>
                {item.help &&
                  <IconButton onClick={(event) => {
                    // 상위 동작 취소
                    event.preventDefault();
                    event.stopPropagation();
                    handleHelpOpen(item.id);
                  }}
                  >
                    <HelpOutline />
                  </IconButton>}
                <Dialog open={helpOpen[item.id] || false} onClose={() => handleHelpClose(item.id)}>
                  <DialogTitle>{"도움말"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {item.help}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleHelpClose(item.id)
                    }} autoFocus>
                      {"닫기"}
                    </Button>
                  </DialogActions>
                </Dialog>
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                secondary={item.text} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </>
  );
}
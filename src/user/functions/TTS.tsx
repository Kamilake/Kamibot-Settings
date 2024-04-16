import React, { useState } from "react";
import { Cast, Downloading as DownloadingIcon, HelpOutline, NoPhotography, PersonAdd, PersonRemove, PhotoCamera, PublicOff, RecordVoiceOver, Reviews, ScreenShare, Send, StopScreenShare, TipsAndUpdates, VideogameAsset, VideogameAssetOff, VoiceChat, WavingHand } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent, Switch, Tooltip, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import setGuildFuncApi from "../../api/setGuildFuncApi";
import { json } from "stream/consumers";
import fetchGuildFuncApi from "../../api/fetchGuildFuncApi";
import Dropdown from "../components/Dropdown";
// TTS 관련 설정

// 음성 채널 상호작용 읽어주기
// - 멤버 입장
// - 멤버 퇴장
// - 멤버 화면 공유 시작
// - 멤버 화면 공유 중단
// - 멤버 카메라 켜짐
// - 멤버 카메라 꺼짐
// - 멤버 활동 시작
// - 멤버 활동 종료

// 미사용 자동 꺼짐 시간
// - 48시간(기본)
interface ListItemData {
  id: string;
  text: string;
  icon: JSX.Element;
  category?: string;
  disabled: boolean;
}

const listItemData: ListItemData[] = [
  { id: "notify_member_join", text: "멤버 입장 알림", icon: <PersonAdd />, disabled: false },
  { id: "notify_member_leave", text: "멤버 퇴장 알림", icon: <PersonRemove />, disabled: false },
  { id: "notify_bot_join", text: "봇 입장 알림", icon: <PersonAdd />, disabled: false },
  { id: "notify_bot_leave", text: "봇 퇴장 알림", icon: <PersonRemove />, disabled: false },
  { id: "notify_screen_share_start", text: "멤버 화면 공유 시작 알림", icon: <ScreenShare />, disabled: true },
  { id: "notify_screen_share_end", text: "멤버 화면 공유 중단 알림", icon: <StopScreenShare />, disabled: true },
  { id: "notify_camera_on", text: "멤버 카메라 켜짐 알림", icon: <PhotoCamera />, disabled: true },
  { id: "notify_camera_off", text: "멤버 카메라 꺼짐 알림", icon: <NoPhotography />, disabled: true },
  { id: "notify_activity_start", text: "멤버 활동 시작 알림", icon: <VideogameAsset />, disabled: true },
  { id: "notify_activity_end", text: "멤버 활동 종료 알림", icon: <VideogameAssetOff />, disabled: true },
];


const FunctionBody: React.FC = () => {
  const [isFunctionEnabled, setIsFunctionEnabled] = useState(false);
  const [switchStates, setSwitchStates] = React.useState<Record<string, boolean>>({});
  const { data, loading, error } = fetchGuildFuncApi('tts');
  const [notificationStyle, setNotificationStyle] = React.useState(''); // 알림
  const [timeout, setTimeout] = React.useState(0); // 미사용 자동 꺼짐 시간
  const handleNotificationStyleChange = (event: SelectChangeEvent<string>) => {
    setGuildFuncApi(
      'tts',
      { 'notification_style': event.target.value as string },
      (data) => {
        console.log(data);
        setNotificationStyle(event.target.value as string);
        // onSuccess 람다 식
      },);
  };
  const handleTimeoutChange = (event: SelectChangeEvent<number>) => {
    setTimeout(event.target.value as number);
  };

  const [accessibilityOpen, setAccessibilityOpen] = React.useState(false);

  const handleClickAccessibilityOpen = () => {
    setAccessibilityOpen(true);
  };

  const handleAccessibilityClose = () => {
    setAccessibilityOpen(false);
  };

  React.useEffect(() => {
    if (!loading) {
      setSwitchStates((prevState) => {

        return Object.entries(data).reduce((acc, [key, value]) => {
          if (typeof value === 'boolean') {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, boolean>);
      });
      setNotificationStyle(data.notification_style);
      setTimeout(data.timeout);
      console.log(data);
    }
  }, [data, loading]);

  const handleSwitchToggle = (id: string, state: boolean) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setGuildFuncApi(
      'tts',
      {
        [id]: !switchStates[id]
      }
      ,
      (data) => {
        console.log(data);
        // onSuccess 람다 식
      },
      (error) => {
        // onFailure 람다 식
        // Revert the switch state
        setSwitchStates((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
      });
  };
  return (
    <>
      <Typography variant="h5">
        일반
      </Typography>
      <Divider></Divider>
      <Dropdown
        label="/tts 명령 답장"
        value={notificationStyle || 'global'}
        onChange={handleNotificationStyleChange}
        items={[
          { value: 'global', text: '모두에게 표시' },
          { value: 'local', text: '나에게만 표시', disabled: false },
          { value: 'autohide_10s', text: '10초 후 자동 숨김', disabled: false },
          { value: 'autohide_1m', text: '1분 후 자동 숨김', disabled: false },
          { value: 'autohide_1h', text: '1시간 후 자동 숨김', disabled: false },
        ]}
      />
      <Dropdown
        label="미사용 자동 꺼짐 시간"
        value={timeout || 0}
        onChange={handleTimeoutChange}
        items={[
          { value: 10, text: '10초', disabled: true },
          { value: 60, text: '1분', disabled: true },
          { value: 0, text: '사용 안함' },
        ]}
      />
      <br />
      <Box display="flex" alignItems="center" flexDirection="row">
        <Typography variant="h5" component="span">
          접근성
        </Typography>
        <Tooltip title="접근성에 대해 알아보기">
          <IconButton onClick={handleClickAccessibilityOpen}>
            <HelpOutline />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog open={accessibilityOpen} onClose={handleAccessibilityClose}>
        <DialogTitle>음성 채널 상호작용 읽어주기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 옵션들을 활성화하면 음성 채널에서 일어나는 일을 카미봇이 읽어줄 수 있어요. 그렇게 하면 화면을 보지 않고도 대충 침대에 누워서 누가 들어왔는지, 누가 나갔는지, 또는 여러가지 상호작용을 쉽게 알 수 있어요! 이 기능을 사용하려면 카미봇이 음성 채널에 접속해 있어야 해요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccessibilityClose}>닫기</Button>
        </DialogActions>
      </Dialog>
      <Divider></Divider>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: 1, borderColor: 'divider', borderRadius: 4, paddingBottom: 1.1 }}> */}
      {/* <Typography variant="h6">
          음성 채널 상호작용 읽어주기
        </Typography> */}
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            음성 채널 상호작용 읽어주기
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
      </List>
      <Divider></Divider>
      {/* </Box> */}
      <br />


    </>
  );
}

const functionInfo: FunctionInterface = {
  icon: <RecordVoiceOver />,
  title: 'TTS',
  description: '채널의 메세지를 음성 채널에서 소리내어 읽어주기',
  url: 'tts',
  data: <FunctionBody />
};

export default functionInfo;
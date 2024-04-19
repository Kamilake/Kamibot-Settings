import React from "react";
import { HelpOutline, NoPhotography, PersonAdd, PersonRemove, PhotoCamera, RecordVoiceOver, ScreenShare, StopScreenShare, VideogameAsset, VideogameAssetOff } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, SelectChangeEvent, Switch, Tooltip, Typography } from "@mui/material";
import setGuildFuncApi from "../../api/setGuildFuncApi";
import fetchGuildFuncApi from "../../api/fetchGuildFuncApi";
import DropdownLabel from "../components/DropdownLabel";
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
  const [switchStates, setSwitchStates] = React.useState<Record<string, boolean>>({});
  const { data, loading, error } = fetchGuildFuncApi('tts');
  const [notificationStyle, setNotificationStyle] = React.useState(''); // 알림
  const [idleTimeout, setIdleTimeout] = React.useState(-1); // 미사용 자동 꺼짐 시간
  const [messageAutoDeleteTime, setMessageAutoDeleteTime] = React.useState(-1); // 메세지 자동삭제 시간
  const handleNotificationStyleChange = (event: SelectChangeEvent<string>) => {
    setGuildFuncApi(
      'tts',
      { 'notification_style': event.target.value as string },
      (data) => {
        setNotificationStyle(event.target.value as string);
      },);
  };
  const handleIdleTimeoutChange = (event: SelectChangeEvent<number>) => {
    // setIdleTimeout(event.target.value as number);
    setGuildFuncApi(
      'tts',
      { 'idle_timeout': event.target.value as number },
      (data) => {
        setIdleTimeout(event.target.value as number);
      },);
  };

  const handleMessageAutoDeleteTimeChange = (event: SelectChangeEvent<number>) => {
    // setMessageAutoDeleteTime(event.target.value as number);
    setGuildFuncApi(
      'tts',
      { 'message_auto_delete_time': event.target.value as number },
      (data) => {
        setMessageAutoDeleteTime(event.target.value as number);
      },);
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
      setIdleTimeout(data.idle_timeout);
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
      <DropdownLabel
        label="/tts 명령 답장"
        help={<>/tts 명령은 카미봇의 TTS 서비스를 시작하거나 종료하는데 사용해요.<br /><br />
          이 메세지가 대화 기록에 남는 것이 지저분해 보인다면 여기서 설정할 수 있어요.<br /><br />
          하지만 다른 사람들이 어느 채널에서 TTS가 작동 중인지 확인할 수 있도록 모두에게 표시하게 설정하는 것을 권장해요.</>}
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
      <DropdownLabel
        label="미사용 자동 꺼짐 시간"
        value={idleTimeout || 0}
        onChange={handleIdleTimeoutChange}
        items={[
          { value: 0, text: '즉시', disabled: true },
          { value: 10, text: '10초', disabled: true },
          { value: 60, text: '1분', disabled: true },
          { value: -1, text: '사용 안함' },
        ]}
      />
      <DropdownLabel
        label="메세지 청소 시간"
        help={<>TTS가 메세지를 읽어주면, 여러 사람들이 대화한 메세지가 기록에 남게 돼요.<br /><br />
          그 메세지를 자동으로 카미봇이 청소해줄 시간을 정할 수 있어요. 깔끔한 채널을 만들어봐요!</>}
        value={messageAutoDeleteTime || 0}
        onChange={handleMessageAutoDeleteTimeChange}
        items={[
          { value: 0, text: '즉시', disabled: true },
          { value: 10, text: '10초', disabled: true },
          { value: 60, text: '1분', disabled: true },
          { value: -1, text: '사용 안함' },
        ]}
      />
      <br />
      <Box display="flex" alignItems="center" flexDirection="row">
        <Typography variant="h5" component="span">
          음성 알림
        </Typography>
        <Tooltip title="음성 알림에 대해 알아보기">
          <IconButton onClick={handleClickAccessibilityOpen}>
            <HelpOutline />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog open={accessibilityOpen} onClose={handleAccessibilityClose}>
        <DialogTitle>음성 채널 상호작용 읽어주기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 옵션들을 활성화하면 음성 채널에서 일어나는 일을 카미봇이 읽어줄 수 있어요. 그렇게 하면 화면을 보지 않고도 대충 침대에 누워서 누가 들어왔는지, 누가 나갔는지, 또는 여러가지 상호작용을 쉽게 알 수 있어요!<br /><br />이 기능을 사용하려면 카미봇이 음성 채널에 접속해 있어야 해요. 또한 채널 설정에서 특정 채널의 입장/퇴장 알림만 비활성화할 수도 있어요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccessibilityClose}>닫기</Button>
        </DialogActions>
      </Dialog>
      <Divider></Divider>
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
import React, { useState } from "react";
import { HelpOutline, Info, VoiceChat } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import setGuildFuncApi from "../../api/setGuildFuncApi";
import fetchGuildFuncApi from "../../api/fetchGuildFuncApi";
import DropdownLabel from "../components/DropdownLabel";

const FunctionBody: React.FC = () => {
  const { data, loading, error } = fetchGuildFuncApi('vvc');
  const [notificationStyle, setNotificationStyle] = React.useState(''); // 알림
  const [timeout, setTimeout] = React.useState(-1); // 미사용 자동 꺼짐 시간
  const [isSaved, setIsSaved] = useState(true);
  const [mode, setMode] = useState('auto');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const handleNotificationStyleChange = (event: SelectChangeEvent<string>) => {
    setNotificationStyle(event.target.value as string);
    // setGuildFuncApi(
    //   'vvc',
    //   { 'notification_style': event.target.value as string },
    //   (data) => {
    //     console.log(data);
    //     setNotificationStyle(event.target.value as string);
    //     // onSuccess 람다 식
    //   },);
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

  const insertVariable = (variable: string) => {
    setIsSaved(false);
    setTitleError(false);
    setTitle(prevMessage => prevMessage ? prevMessage + variable : variable);
  };


  const handleModeChange = (event: SelectChangeEvent<string>) => {
    setMode(event.target.value);
    setIsSaved(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsSaved(false);
    if (event.target.value.trim() === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
      // 기존의 상태 업데이트 로직
    }

  };

  const handleSave = () => {
    // Save the welcome message here

    if ((title == null || title.trim() === '') && mode === 'manual') {
      setTitleError(true);
      return;
    }

    setIsSaved(true);
    setGuildFuncApi(
      'vvc',
      {
        mode: mode,
        title: title,
      },
      (data) => {
        // onSuccess 람다 식-
        setIsSaved(true);
      },
      (error) => {
        // onFailure 람다 식
        setIsSaved(false);
      });
  };


  React.useEffect(() => {
    if (!loading) {
      // setNotificationStyle(data.notification_style);
      // setTimeout(data.timeout);
      setMode(data.mode);
      setTitle(data.title);
      console.log(data);
    }
  }, [data, loading]);

  return (
    <>
      <List>
        <ListItem>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="가변 채널을 사용하려면 서버 또는 카테고리의 관리 권한이 필요해요." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="채널 설정에서 하나 이상의 트리거 채널을 활성화하세요." />
        </ListItem>
      </List>
      <br />
      <Typography variant="h5">
        음성 채널 이름
      </Typography>
      <Divider />
      <br />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Select
          value={mode}
          onChange={handleModeChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}

        >
          <MenuItem value="manual">사용자 지정</MenuItem>
          <MenuItem value="auto">자동</MenuItem>
        </Select>
        {mode === 'manual' ? (
          <Typography variant="subtitle1" color="textSecondary">
            원한다면 여러 채널 이름을 사용할 수도 있어요!<br />
            각 채널 이름은 새 채널이 생성될 때마다 무작위로 선택돼요.
          </Typography>
        ) : (
          <Typography variant="caption" color="textSecondary">자동이 제일 빨라요.</Typography>
        )}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip label="방장 별명" onClick={() => insertVariable('{{방장_별명}}')} disabled={mode !== 'manual'} />
          <Chip label="방장 사용자명" onClick={() => insertVariable('{{방장_사용자명}}')} disabled={mode !== 'manual'} />
          <Chip label="방장 사용자 ID" onClick={() => insertVariable('{{방장_사용자_ID}}')} disabled={mode !== 'manual'} />
          <Chip label="서버 멤버 수" onClick={() => insertVariable('{{서버_멤버_수}}')} disabled={mode !== 'manual'} />
          <Chip label="서버 이름" onClick={() => insertVariable('{{서버_이름}}')} disabled={mode !== 'manual'} />
          <Chip label="서버 주인" onClick={() => insertVariable('{{서버_주인}}')} disabled={mode !== 'manual'} />
          <Chip label="년" onClick={() => insertVariable('{{현재_날짜_년}}')} disabled={mode !== 'manual'} />
          <Chip label="월" onClick={() => insertVariable('{{현재_날짜_월}}')} disabled={mode !== 'manual'} />
          <Chip label="일" onClick={() => insertVariable('{{현재_날짜_일}}')} disabled={mode !== 'manual'} />
          <Chip label="시" onClick={() => insertVariable('{{현재_날짜_시}}')} disabled={mode !== 'manual'} />
          <Chip label="분" onClick={() => insertVariable('{{현재_날짜_분}}')} disabled={mode !== 'manual'} />
          <Chip label="초" onClick={() => insertVariable('{{현재_날짜_초}}')} disabled={mode !== 'manual'} />
          <Chip label="동물식 이름" onClick={() => insertVariable('{{무작위_동물식_이름}}의 채널')} disabled={mode !== 'manual'} />
          <Chip label="인디언식 이름" onClick={() => insertVariable('{{무작위_인디언식_이름}}')} disabled={mode !== 'manual'} />
          <Chip label="생일식 이름" onClick={() => insertVariable('{{무작위_생일식_이름}}의 채널')} disabled={mode !== 'manual'} />
          <Chip label="오타쿠식 이름" onClick={() => insertVariable('{{무작위_오타쿠식_이름}}의 채널')} disabled={mode !== 'manual'} />
          <Chip label="나라 이름" onClick={() => insertVariable('{{무작위_국가_이름}}')} disabled={mode !== 'manual'} />
          <Chip label="별자리 이름" onClick={() => insertVariable('{{무작위_별자리_이름}}')} disabled={mode !== 'manual'} />
        </Box>
        {mode === 'manual' ? (
          <TextField
            label="음성 채널 이름"
            multiline
            rows={4}
            value={title || ''}
            onChange={handleTitleChange}
            error={titleError}
            required
            helperText={titleError ? "적어도 한 줄은 필요해요! 비활성화하려면 자동 모드로 설정하세요." : "한 줄에 하나씩, 엔터로 구분된 이름을 입력하세요."}
          />
        ) : (
          <TextField
            label="음성 채널 이름"
            multiline
            rows={2}
            value={"{{방장_별명}}님의 채널"}
            disabled={true}
          />
        )}
        <Button
          variant="contained"
          disabled={isSaved}
          onClick={handleSave}
        >저장</Button>
      </Box>
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
      <br />
      <br />
      {/* <Typography variant="h5">
        쓰레기
      </Typography>
      <Divider />
      <DropdownLabel
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
      <DropdownLabel
        label="미사용 자동 꺼짐 시간"
        value={timeout || 0}
        onChange={handleTimeoutChange}
        items={[
          { value: 0, text: '즉시', disabled: true },
          { value: 10, text: '10초', disabled: true },
          { value: 60, text: '1분', disabled: true },
          { value: -1, text: '사용 안함' },
        ]}
      /> */}
    </>
  );
}


const functionInfo: FunctionInterface = {
  icon: <VoiceChat />,
  title: '가변 음성 채널',
  description: '필요할 때마다 음성 채널을 동적으로 만들고, 아무도 없으면 제거하기',
  url: 'vvc',
  data: <FunctionBody />
};

export default functionInfo;
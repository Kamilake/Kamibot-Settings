import React, { JSX } from "react";
import { DisplaySettings, HelpOutline, RecordVoiceOver, } from '@mui/icons-material';
import { FunctionInterface } from "../components/GuildSettingsGrid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Switch, Tooltip, Typography } from "@mui/material";
import setGuildFuncApi from "../../api/setGuildFuncApi";
import fetchGuildFuncApi from "../../api/fetchGuildFuncApi";
import Twitter from '@mui/icons-material/Twitter';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import L from "../components/L";
import { useUser } from "../../contexts/User/UserContext";
interface ListItemData {
  id: string;
  text: string;
  icon: JSX.Element;
  category?: string;
  disabled: boolean;
  confirmEnable?: boolean;
  confirmDisable?: boolean;
  confirmText?: string;
}

const listItemData: ListItemData[] = [
  { id: "use_emote_upscaler", text: "이모지 업스케일링", icon: <AddReactionIcon />, disabled: false },
  { id: "use_twitter_embed", text: "트위터 링크 미리보기", icon: <Twitter />, disabled: false },
  { id: "use_docs_converter", text: "미디어 변환", icon: <TipsAndUpdatesIcon />, disabled: false },
  { id: "use_update", text: "업데이트 소식", icon: <TipsAndUpdatesIcon />, disabled: true },
  { id: "use_auto_tts", text: "TTS 자동 시작", icon: < VoiceChatIcon />, disabled: false, confirmEnable: true, confirmText: "이 기능을 활성화하면 모든 채널에서 대화를 할 때마다 전부 카미봇이 TTS로 대화를 읽어줘요. 채널 설정이 아니라 정말 이 기능을 찾는 게 맞나요?" },
  { id: "use_tts_join_notify", text: "입퇴장 알림", icon: <CampaignIcon />, disabled: false },
  { id: "use_llm", text: "멘션으로 AI 어시스턴트 호출", icon: < MarkChatReadIcon />, disabled: false },
];


const FunctionBody: React.FC = () => {
  const [switchStates, setSwitchStates] = React.useState<Record<string, boolean>>({});
  const { user } = useUser();
  const { data, loading, error } = fetchGuildFuncApi(user.guildId, 'general');

  const [state, setState] = React.useState({
    use_emote_upscaler: false,
    use_auto_tts: false,
    use_tts_join_notify: false,
    use_llm: false,
    use_docs_converter: false,
    use_twitter_embed: false,
  });

  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [pendingSwitchId, setPendingSwitchId] = React.useState<string | null>(null);

  const handleChange = (key: string, value: any) => {
    setGuildFuncApi(
      user.guildId,
      'general',
      { [key]: value },
      () => {
        setState((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      }
    );
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
      setState((prevState) => ({
        ...prevState, // 나중에 제거해야함
        ...data
      }));
      console.log(data);
    }
  }, [data, loading]);

  const handleSwitchToggle = (id: string, state: boolean) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setGuildFuncApi(
      user.guildId,
      'general',
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

  const handleConfirmDialogOpen = (id: string) => {
    setPendingSwitchId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setPendingSwitchId(null);
  };

  const handleConfirmDialogConfirm = () => {
    if (pendingSwitchId) {
      handleSwitchToggle(pendingSwitchId, switchStates[pendingSwitchId]);
    }
    setConfirmDialogOpen(false);
    setPendingSwitchId(null);
  };

  return (
    <>
      <Box display="flex" alignItems="center" flexDirection="row">
        <Typography variant="h5" component="span">
          채널 기본값 설정
        </Typography>
        <Tooltip title="채널 기본값 설정에 대해 알아보기">
          <IconButton onClick={handleClickAccessibilityOpen}>
            <HelpOutline />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog open={accessibilityOpen} onClose={handleAccessibilityClose}>
        <DialogTitle>채널 기본값 설정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 옵션들을 활성화하면 음성 채널에서 일어나는 일을 카미봇이 읽어줄 수 있어요. 그렇게 하면 화면을 보지 않고도 대충 침대에 누워서 누가 들어왔는지, 누가 나갔는지, 또는 여러가지 상호작용을 쉽게 알 수 있어요!<br /><br />이 기능을 사용하려면 카미봇이 음성 채널에 접속해 있어야 해요. 또한 채널 설정에서 특정 채널의 입장/퇴장 알림만 비활성화할 수도 있어요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccessibilityClose}>닫기</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>TTS 자동으로 시작</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 기능을 활성화하면 서버에 있는 <b>모든 채널</b>에서 대화를 할 때마다 전부 카미봇이 TTS로 대화를 읽어줘요.<br></br>TTS 전용 채널을 설정하려면 <L to={`/settings/channel${window.location.search}`}>채널 설정</L>으로 가 보세요.<br></br>채널 설정이 아니라 정말 이 기능을 찾는 게 맞나요?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose}>취소</Button>
          <Button onClick={handleConfirmDialogConfirm} color="primary">확인</Button>
        </DialogActions>
      </Dialog>
      <Divider></Divider>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            모든 채널의 기본값 설정. 기능별 설명은 <L to={`/settings/channel${window.location.search}`}>채널 설정</L>에서 확인하세요.
          </ListSubheader>
        }
      >
        {listItemData.map((item, index) => {
          if (item.category == null) {
            const isLastItem = index === listItemData.length - 1;
            return (
              <React.Fragment key={item.id}>
                <ListItemButton
                  onClick={() => {
                    if ((item.confirmEnable && !switchStates[item.id]) ||
                      (item.confirmDisable && switchStates[item.id])) {
                      handleConfirmDialogOpen(item.id);
                    } else {
                      handleSwitchToggle(item.id, switchStates[item.id]);
                    }
                  }}
                  disabled={loading || item.disabled}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  <Switch checked={!!switchStates[item.id]} onClick={() => { }} disabled={loading} />
                </ListItemButton>
                {!isLastItem && <Divider />}
              </React.Fragment>
            );
          }
          return null;
        })}
      </List>
      <br />
      <br />
    </>
  );
}

const functionInfo: FunctionInterface = {
  icon: <DisplaySettings />,
  title: '채널 기본값 설정',
  description: '채널 기본값 설정\n',
  url: 'general',
  data: <FunctionBody />,
  disabled: false
};

export default functionInfo;
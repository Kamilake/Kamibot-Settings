import React, { useEffect, useState } from "react";
import { WavingHand } from "@mui/icons-material";
import { FunctionInterface } from "../components/GuildSettingsGrid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, Button, TextField, Select, MenuItem, SelectChangeEvent, Typography, Chip } from "@mui/material";
import setGuildFuncApi from "../../api/setGuildFuncApi";
import ControllableStates from "../components/ControllableStates";
import { Channel } from "../../api/fetchChannelListApi";
import fetchGuildFuncApi from "../../api/fetchGuildFuncApi";
import DropdownLabel from "../components/DropdownLabel";

const FunctionBody: React.FC = () => {
  const [isFunctionEnabled, setIsFunctionEnabled] = useState(false);
  const [welcomePrompt, setWelcomeMessage] = useState("");
  const [mode, setMode] = useState("ai");
  const [isSaved, setIsSaved] = useState(true);
  const [sendMemberCard, setSendMemberCard] = useState(true);
  const [onMemberLeft, setOnMemberLeft] = useState("strikeout");
  const [channelSelectValue, setChannelSelectValue] = useState<Channel>({
    channelName: "채널을 선택하세요...",
    channelType: "PRIVATE",
    channelId: -1,
    categoryName: "일반",
  });

  useEffect(() => {
    setIsSaved(false);
  }, [channelSelectValue]);

  const { data, loading, error } = fetchGuildFuncApi("welcome_message");

  useEffect(() => {
    // data.channelId 출력
    console.log(`data.channelId: ${data.channelId}`);

    if (!loading) {
      setChannelSelectValue({
        channelName: data.channelName,
        channelId: data.channelId,
        channelType: data.channelType,
        categoryName: "",
      });
      setIsFunctionEnabled(data.enabled);
      setMode(data.mode || "ai");
      setWelcomeMessage(data.prompt);
      setSendMemberCard(data.send_member_card);
      setOnMemberLeft(data.on_member_left || "strikeout");

      console.log(`value has changed to: ${JSON.stringify(data)}`);
    }
    if (channelSelectValue.channelId === -1) return;
    // alert(`value has changed to: ${channelSelectValue.channelId}`);
  }, [data, loading]);

  const handleSendMemberCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendMemberCard(event.target.checked);
    setIsSaved(false);
  };

  const handleModeChange = (event: SelectChangeEvent<string>) => {
    setMode(event.target.value);
    setIsSaved(false);
  };

  const handleWelcomeMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWelcomeMessage(event.target.value);
    setIsSaved(false);
  };

  const handleOnMemberLeftChange = (event: SelectChangeEvent<string>) => {
    setOnMemberLeft(event.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setGuildFuncApi(
      "welcome_message",
      {
        enabled: isFunctionEnabled,
        channelId: channelSelectValue.channelId,
        mode: mode,
        prompt: welcomePrompt,
        send_member_card: sendMemberCard,
        on_member_left: onMemberLeft,
      },
      (data) => {
        // onSuccess 람다 식
        setIsSaved(true);
      },
      (error) => {
        // onFailure 람다 식
        setIsSaved(false);
      }
    );
  };

  const sendTestMessage = () => {
    setGuildFuncApi("welcome_message/test", {});
  };

  const enableFunction = () => {
    setIsFunctionEnabled(!isFunctionEnabled);
    setGuildFuncApi(
      "welcome_message",
      { enabled: !isFunctionEnabled },
      (data) => {
        console.log(data);
        // onSuccess 람다 식
      },
      (error) => {
        // onFailure 람다 식
        setIsFunctionEnabled(isFunctionEnabled); // Revert the switch state
      }
    );
  };

  const insertVariable = (variable: string) => {
    setIsSaved(false);
    setWelcomeMessage((prevMessage) => prevMessage + variable);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControlLabel
        control={<Switch checked={isFunctionEnabled} onChange={enableFunction} />}
        label={isFunctionEnabled ? "환영 메세지 활성화됨" : "환영 메세지를 활성화하려면 스위치를 켜세요"}
      />
      <p>
        이 기능을 사용하면 새 멤버가 들어올 때마다 카미봇이 환영 메세지를 보내드려요! <br />
        아래 옵션을 사용해 환영 메세지를 설정할 수 있어요.
      </p>
      <ControllableStates
        value={channelSelectValue}
        setValue={setChannelSelectValue}
        disabled={!isFunctionEnabled}
      />
      <Select
        value={mode}
        onChange={handleModeChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        disabled={!isFunctionEnabled}
      >
        <MenuItem value="manual">메세지 직접 입력</MenuItem>
        <MenuItem value="ai">AI 자동 생성</MenuItem>
      </Select>
      {mode === "manual" ? (
        <>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            <Chip label="새 멤버 별명" onClick={() => insertVariable("{{새_멤버_별명}}")} disabled={!isFunctionEnabled} />
            <Chip label="새 멤버 사용자명" onClick={() => insertVariable("{{새_멤버_사용자명}}")} disabled={!isFunctionEnabled} />
            <Chip label="새 멤버 사용자 ID" onClick={() => insertVariable("{{새_멤버_사용자_ID}}")} disabled={!isFunctionEnabled} />
            <Chip label="새 멤버 멘션" onClick={() => insertVariable("{{새_멤버_멘션}}")} disabled={!isFunctionEnabled} />
            <Chip label="기존 멤버 수" onClick={() => insertVariable("{{기존_멤버_수}}")} disabled={!isFunctionEnabled} />
            <Chip label="전체 멤버 수" onClick={() => insertVariable("{{전체_멤버_수}}")} disabled={!isFunctionEnabled} />
            <Chip label="서버 이름" onClick={() => insertVariable("{{서버_이름}}")} disabled={!isFunctionEnabled} />
            <Chip label="서버 주인" onClick={() => insertVariable("{{서버_주인}}")} disabled={!isFunctionEnabled} />
            <Chip label="오늘 들어온 멤버 수" onClick={() => insertVariable("{{오늘_들어온_멤버_수}}")} disabled={!isFunctionEnabled} />
            <Chip label="년" onClick={() => insertVariable("{{들어온_날짜_년}}")} disabled={!isFunctionEnabled} />
            <Chip label="월" onClick={() => insertVariable("{{들어온_날짜_월}}")} disabled={!isFunctionEnabled} />
            <Chip label="일" onClick={() => insertVariable("{{들어온_날짜_일}}")} disabled={!isFunctionEnabled} />
            <Chip label="시" onClick={() => insertVariable("{{들어온_날짜_시}}")} disabled={!isFunctionEnabled} />
            <Chip label="분" onClick={() => insertVariable("{{들어온_날짜_분}}")} disabled={!isFunctionEnabled} />
            <Chip label="초" onClick={() => insertVariable("{{들어온_날짜_초}}")} disabled={!isFunctionEnabled} />

            <Chip label="초대링크" onClick={() => insertVariable("{{초대링크}}")} disabled={!isFunctionEnabled} />
            <Chip label="초대링크 만든 멤버" onClick={() => insertVariable("{{초대링크_만든_멤버}}")} disabled={!isFunctionEnabled} />
            <Chip
              label="초대링크 만든 멤버의 초대횟수"
              onClick={() => insertVariable("{{초대링크_만든_멤버의_초대횟수}}")}
              disabled={!isFunctionEnabled}
            />

            <Chip
              label="샘플 1"
              onClick={() =>
                setWelcomeMessage("{{전체_멤버_수}}번째로 {{서버_이름}}에 오셨어요! {{새_멤버_멘션}}")
              }
              disabled={!isFunctionEnabled}
            />
            <Chip
              label="샘플 2"
              onClick={() =>
                setWelcomeMessage("{{초대링크_만든_멤버}}님이 {{초대링크_만든_멤버의_초대횟수}}번째로 초대하신 {{새_멤버_이름}}님이 오셨어요! {{새_멤버_멘션}}")
              }
              disabled={!isFunctionEnabled}
            />
            <Chip
              label="샘플 3"
              onClick={() =>
                setWelcomeMessage("{{들어온_날짜_월}}월 {{들어온_날짜_일}}일에 {{오늘_들어온_멤버_수}}번째로 들어오셨어요. {{새_멤버_멘션}}")
              }
              disabled={!isFunctionEnabled}
            />
            <Chip
              label="샘플 4"
              onClick={() => setWelcomeMessage("최고의 Discord 서버 - {{들어온_날짜_년}} {{서버_이름}}")}
              disabled={!isFunctionEnabled}
            />
            <Chip
              label="샘플 5"
              onClick={() => setWelcomeMessage("공지 채널에서 규칙을 읽어주세요. {{새_멤버_멘션}}")}
              disabled={!isFunctionEnabled}
            />
          </Box>
          <TextField
            label="환영 메세지"
            multiline
            rows={4}
            value={welcomePrompt || ""}
            onChange={handleWelcomeMessageChange}
            disabled={!isFunctionEnabled}
          />
        </>
      ) : (
        <>
          <Typography variant="caption" color="textSecondary">
            지금은 사용자 지정 프롬프트를 수정할 수 없어요. 하지만 걱정 마세요! 이미 가장 완벽한 프롬프트가 적용되어 있어요.
          </Typography>
          <TextField
            label="환영 메세지 생성 프롬프트"
            multiline
            rows={4}
            value={
              "{{새_멤버_별명}}님이 {{서버_이름}} 서버에 새로 들어왔어요. 카미봇이 한두 줄 정도 축하 메세지를 작성해주세요!"
            }
            onChange={handleWelcomeMessageChange}
            disabled
          />
        </>
      )}
      <FormControlLabel
        control={<Switch checked={sendMemberCard} onChange={handleSendMemberCardChange} />}
        label="메세지에 멤버 환영 카드 첨부하기"
      />
      <DropdownLabel
        label="멤버가 서버를 나가면"
        value={onMemberLeft}
        onChange={handleOnMemberLeftChange}
        disabled={!sendMemberCard}
        items={[
          { value: "strikeout", text: "환영 카드에 취소선 표시", disabled: false },
          { value: "delete", text: "환영 메세지 회수", disabled: false },
          { value: "none", text: "아무 것도 안 함", disabled: false },
        ]}
      />
      <Button variant="contained" disabled={!isFunctionEnabled || isSaved} onClick={handleSave}>
        저장
      </Button>
      <Button variant="contained" color="secondary" disabled={!isFunctionEnabled || !isSaved} onClick={sendTestMessage}>
        테스트 메세지 보내기
      </Button>
    </Box>
  );
};

const functionInfo: FunctionInterface = {
  icon: <WavingHand />,
  title: "환영 메세지",
  description: "새 멤버가 들어오면 카미봇이 환영 메세지 보내기",
  url: "welcome_message",
  data: <FunctionBody />,
};

export default functionInfo;
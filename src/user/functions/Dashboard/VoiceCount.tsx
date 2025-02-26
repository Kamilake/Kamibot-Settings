import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataPoint } from "./DataPoint";

interface VoiceCountProps {
  data?: DataPoint;
}

const VoiceCount: React.FC<VoiceCountProps> = ({ data }) => {
  if (!data) return <Typography>Loading...</Typography>;

  const totalVoiceChannels = data.audioSendHandlers;
  const eventsPerSecond = data.eventsPerSecond;

  return (
    <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography variant="caption" display="block">
            통화중인 음성 채널
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {totalVoiceChannels.toLocaleString()}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "normal", ml: 0.5 }}
            >
              채널
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ width: "1px", height: "60px", borderLeft: "1px solid #ccc" }} />

        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography variant="caption" display="block">
            초당 TTS 연산
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {eventsPerSecond.toLocaleString()}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "normal", ml: 0.5 }}
            >
              /s
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default VoiceCount;
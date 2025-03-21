import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataPoint } from "./DataPoint";

interface VoiceCountProps {
  data?: DataPoint;
}

const VoiceCount: React.FC<VoiceCountProps> = ({ data }) => {
  const [perMinute, setPerMinute] = useState(true);

  if (!data) return <Typography>Loading...</Typography>;

  const totalVoiceChannels = data.audioSendHandlers;
  const eventsPerSecond = data.eventsPerSecond;
  const displayValue = perMinute ? eventsPerSecond * 60 : eventsPerSecond;
  const label = perMinute ? "1분당 카미봇 사용" : "1초당 카미봇 사용";
  const unit = perMinute ? "rpm" : "rps";

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

        <Box
          sx={{ flex: 1, textAlign: "center", cursor: "pointer" }}
          onClick={() => setPerMinute(!perMinute)}
        >
          <Typography variant="caption" display="block">
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {displayValue.toLocaleString()}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "normal", ml: 0.5 }}
            >
              {unit}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default VoiceCount;
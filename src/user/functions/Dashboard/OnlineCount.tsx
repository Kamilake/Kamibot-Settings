import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataPoint } from "./DataPoint";

interface KamibotCountProps {
  data?: DataPoint;
}

const KamibotCount: React.FC<KamibotCountProps> = ({ data }) => {
  if (!data) return <Typography>Loading...</Typography>;

  const totalGuilds = data.guilds;
  const onlineMembers = data.onlineUsers;

  return (
    <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography variant="caption" display="block">
            총 서버 수
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {totalGuilds.toLocaleString()}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "normal", ml: 0.5 }}
            >
              서버
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ width: "1px", height: "60px", borderLeft: "1px solid #ccc" }} />

        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography variant="caption" display="block">
            온라인 사용자 수
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {onlineMembers.toLocaleString()}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "normal", ml: 0.5 }}
            >
              명
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default KamibotCount;
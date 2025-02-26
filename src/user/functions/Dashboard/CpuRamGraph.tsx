import React from "react";
import { Box, Typography, LinearProgress, Paper } from "@mui/material";
import { DataPoint } from "./DataPoint";

interface CpuGraphProps {
  data?: DataPoint;
}

const CpuGraph: React.FC<CpuGraphProps> = ({ data }) => {
  if (!data) return <Typography>Loading...</Typography>;

  const ramPercentage = (data.usedMemory / data.totalMemory) * 100;
  const cpuPercentage = data.cpuUsage;
  return (
    <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6">CPU & RAM 사용량</Typography>
      <Box sx={{ marginY: 1 }}>
        <Typography variant="body2">물리적 CPU: {cpuPercentage.toFixed(1)}%</Typography>
        <LinearProgress variant="determinate" value={cpuPercentage} />
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Typography variant="body2">
          JVM 메모리: {ramPercentage.toFixed(1)}%
        </Typography>
        <LinearProgress variant="determinate" value={ramPercentage} />
      </Box>
    </Paper>
  );
};

export default CpuGraph;
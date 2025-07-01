import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import { DataPoint } from "./DataPoint";

interface CpuGraphChartProps {
  data: DataPoint[];
  totalMemory: number;
}

const dataWindowSize = 60;

const CpuGraphChart: React.FC<CpuGraphChartProps> = ({ data, totalMemory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [chartWidth, setChartWidth] = useState<number>(600);

  useEffect(() => {
    const adjustWidth = () => {
      if (isMobile) {
        setChartWidth(window.innerWidth - 18);
      } else {
        if (window.innerWidth > 600) {
          const computedWidth = window.innerWidth - 112;
          setChartWidth(computedWidth > 788 ? 788 : computedWidth);
        } else {
          setChartWidth(600);
        }
      }
    };

    adjustWidth(); // 초기 width 설정
    window.addEventListener("resize", adjustWidth);
    return () => window.removeEventListener("resize", adjustWidth);
  }, [isMobile]);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 0,
        marginLeft: isMobile ? -2 : 2,
        marginRight: isMobile ? -2 : 2,
      }}
    >
      <Typography variant="h6" sx={{ marginLeft: 0, paddingLeft: 2, paddingTop: 2 }}>
        스레드 & 메모리 시간별 사용량
      </Typography>
      <Box sx={{ marginY: 1, width: "100%", overflowX: "auto", display: "flex", justifyContent: "center" }}>
        {data.length === 0 ? (
          <Typography>Loading...</Typography>
        ) : (
          <LineChart
            xAxis={[
              {
                dataKey: "time",
                data: data.map((point) => new Date(point.currentTime).getTime()),
                label: "시간",
                valueFormatter: (currentTime: string) =>
                  new Date(currentTime).toLocaleTimeString(),
                min:
                  data.length < dataWindowSize
                    ? new Date(data[0].currentTime)
                    : new Date(data[data.length - dataWindowSize].currentTime),
                max: new Date(data[data.length - 1].currentTime),
              },
            ]}
            series={[
              {
                label: "메모리 사용량",
                data: data.map((point) => point.usedMemory),
                showMark: false,
                valueFormatter: (value: number | null) =>
                  value === null ? "N/A" : `${value} MB`,
                yAxisId: "memory",
              },
              {
                label: "가용 스레드",
                data: data.map((point) => point.totalThreads * 10),
                showMark: false,
                valueFormatter: (value: number | null) =>
                  value === null ? "N/A" : `${value / 10} 스레드`,
                yAxisId: "audio",
              },
              {
                label: "활성 스레드",
                data: data.map((point) => point.activeThreads * 10),
                showMark: false,
                valueFormatter: (value: number | null) =>
                  value === null ? "N/A" : `${value / 10} 스레드`,
                yAxisId: "audio",
              },
              {
                label: "1분당 카미봇 사용량",
                data: data.map((point) => point.eventsPerSecond * 60),
                showMark: false,
                valueFormatter: (value: number | null) =>
                  value === null ? "N/A" : `${value} rpm`,
                yAxisId: "memory",
              },
            ]}
            yAxis={[
              {
                id: "memory",
                label: "메모리 (MB)",
                min: 0,
                max: totalMemory,
                position: "left",
              },
              {
                id: "audio",
                label: "스레드 / 커넥션 수",
                min: 0,
                max: 1500,
                position: "right",
              },
            ]}
            rightAxis="audio"
            width={chartWidth}
            height={300}
          />
        )}
      </Box>
    </Paper>
  );
};

export default CpuGraphChart;
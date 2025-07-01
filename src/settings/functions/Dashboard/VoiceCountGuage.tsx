import React, { useContext } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataPoint } from "./DataPoint";
import {
  Gauge,
  gaugeClasses,
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  // GaugeValueText, --> 사용하지 않으므로 제거
  useGaugeState,
} from "@mui/x-charts";
import { GaugeContext } from "@mui/x-charts/Gauge/GaugeProvider";

interface VoiceCountProps {
  data?: DataPoint;
}

interface GaugePointerProps {
  text?: ({ value, valueMax }: { value: number | null; valueMax: number }) => string;
}

function GaugePointer({ text }: GaugePointerProps) {
  // useGaugeState 대신 GaugeContext를 사용하여 value, valueMax 등도 가져옵니다.
  const { valueAngle, outerRadius, cx, cy, value, valueMax } = useContext(GaugeContext);

  if (valueAngle === null) {
    // 값이 없으면 아무것도 출력하지 않음
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
      {text && value !== undefined && valueMax !== undefined && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan x={cx} dy="30px" dominantBaseline="central">
            {text({ value, valueMax })}
          </tspan>
        </text>
      )}
    </g>
  );
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
            1분당 카미봇 사용
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {(eventsPerSecond * 60).toLocaleString()}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "normal", ml: 0.5 }}
            >
              rpm
            </Typography>
          </Typography>
          <GaugeContainer
            height={100}
            value={(eventsPerSecond * 60)}
            valueMax={5000}
            startAngle={-110}
            endAngle={110}
          >
            <GaugeReferenceArc />
            <GaugeValueArc />
            <GaugePointer
              text={({ value, valueMax }) => `${value}/${valueMax}rpm`}
            />
          </GaugeContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default VoiceCount;
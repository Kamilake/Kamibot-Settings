import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  Speed,
  Warning,
  CheckCircle,
  Block,
  DataUsage,
} from "@mui/icons-material";

interface RateLimiterStatus {
  queueSize: number;
  availableTokens: number;
  maxTokens: number;
  maxRPS: number;
  requestsInWindow: number;
  requestsLastSecond: number;
  cloudflareBlocked: boolean;
  consecutiveGlobalRateLimits: number;
  topRoutes: string;
  top429Routes: string;
  debugMode: boolean;
  verboseLogging: boolean;
}

const RateLimiterMonitor: React.FC = () => {
  const [status, setStatus] = useState<RateLimiterStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/rate-limiter/status");
      const result = await response.json();
      if (result.success && result.data) {
        setStatus(result.data);
        setError(null);
      } else {
        setError("데이터를 불러올 수 없습니다");
      }
    } catch (err) {
      setError("API 호출 중 오류가 발생했습니다");
      console.error("RateLimiterMonitor fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Speed sx={{ mr: 1 }} />
          <Typography variant="h6">Rate Limiter 모니터</Typography>
        </Box>
        <LinearProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Speed sx={{ mr: 1 }} />
          <Typography variant="h6">Rate Limiter 모니터</Typography>
        </Box>
        <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      </Paper>
    );
  }

  if (!status) return null;

  const tokenPercentage = (status.availableTokens / status.maxTokens) * 100;
  const rpsPercentage = (status.requestsLastSecond / status.maxRPS) * 100;

  return (
    <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Speed sx={{ mr: 1 }} />
        <Typography variant="h6">Rate Limiter 모니터</Typography>
        {status.cloudflareBlocked ? (
          <Chip
            icon={<Block />}
            label="Cloudflare 차단됨"
            size="small"
            color="error"
            sx={{ ml: 1 }}
          />
        ) : (
          <Chip
            icon={<CheckCircle />}
            label="정상"
            size="small"
            color="success"
            sx={{ ml: 1 }}
          />
        )}
      </Box>

      {/* 토큰 버킷 */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DataUsage sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">사용 가능 토큰</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {status.availableTokens.toFixed(1)} / {status.maxTokens}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(tokenPercentage, 100)}
          sx={{ height: 8, borderRadius: 4 }}
          color={
            tokenPercentage < 20
              ? "error"
              : tokenPercentage < 50
              ? "warning"
              : "success"
          }
        />
      </Box>

      {/* RPS */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Speed sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">현재 RPS</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {status.requestsLastSecond} / {status.maxRPS} req/s
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(rpsPercentage, 100)}
          sx={{ height: 8, borderRadius: 4 }}
          color={
            rpsPercentage > 90
              ? "error"
              : rpsPercentage > 70
              ? "warning"
              : "primary"
          }
        />
      </Box>

      {/* 상태 칩 */}
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Chip
          label={`큐: ${status.queueSize}`}
          size="small"
          color={status.queueSize > 50 ? "warning" : "default"}
        />
        <Chip
          label={`10초 윈도우: ${status.requestsInWindow}`}
          size="small"
          color={status.requestsInWindow > 300 ? "warning" : "default"}
        />
        {status.consecutiveGlobalRateLimits > 0 && (
          <Chip
            icon={<Warning />}
            label={`Global 429: ${status.consecutiveGlobalRateLimits}`}
            size="small"
            color="error"
          />
        )}
        {status.debugMode && (
          <Chip label="Debug" size="small" color="info" />
        )}
        {status.verboseLogging && (
          <Chip label="Verbose" size="small" color="info" />
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Route 정보 */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
        Top Routes
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontFamily: "monospace", fontSize: "0.75rem", mb: 1, wordBreak: "break-all" }}
      >
        {status.topRoutes}
      </Typography>

      {status.top429Routes !== "none" && (
        <>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, fontWeight: "bold", color: "error.main" }}
          >
            429 Routes
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "monospace", fontSize: "0.75rem", wordBreak: "break-all" }}
          >
            {status.top429Routes}
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default RateLimiterMonitor;

import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Chip,
  Divider,
  LinearProgress
} from "@mui/material";
import { Assignment, PlayArrow, Queue, Memory, CheckCircle } from "@mui/icons-material";

interface RunningTask {
  threadId: string;
  name: string;
  startTime: string; // epoch millis as string
}

interface SnapshotData {
  activeVirtualThreads: number;
  completedTaskCount: number;
  totalTaskCount: number;
  carrierThreadsTotal: number;
  carrierThreadsActive: number;
  carrierThreadsIdle: number;
  runningTasks: RunningTask[];
}

/** 같은 이름의 작업을 묶어서 카운트 */
interface GroupedTask {
  name: string;
  count: number;
}

const AsyncTaskMonitor: React.FC = () => {
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskData = async () => {
    try {
      const response = await fetch('/api/kamibot/snapshot/json');
      const result = await response.json();
      
      if (result.success && result.data) {
        const d = result.data;
        setSnapshot({
          activeVirtualThreads: Number(d.activeVirtualThreads),
          completedTaskCount: Number(d.completedTaskCount),
          totalTaskCount: Number(d.totalTaskCount),
          carrierThreadsTotal: Number(d.carrierThreadsTotal),
          carrierThreadsActive: Number(d.carrierThreadsActive),
          carrierThreadsIdle: Number(d.carrierThreadsIdle),
          runningTasks: d.runningTasks || [],
        });
        setError(null);
      } else {
        setError('데이터를 불러올 수 없습니다');
      }
    } catch (err) {
      setError('API 호출 중 오류가 발생했습니다');
      console.error('AsyncTaskMonitor fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskData();
    const interval = setInterval(fetchTaskData, 500);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Assignment sx={{ mr: 1 }} />
          <Typography variant="h6">비동기 작업 모니터</Typography>
        </Box>
        <LinearProgress />
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
          데이터를 불러오는 중...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Assignment sx={{ mr: 1 }} />
          <Typography variant="h6">비동기 작업 모니터</Typography>
        </Box>
        <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      </Paper>
    );
  }

  if (!snapshot) return null;

  const {
    activeVirtualThreads,
    completedTaskCount,
    totalTaskCount,
    carrierThreadsTotal,
    carrierThreadsActive,
    runningTasks,
  } = snapshot;

  const carrierUtilization = carrierThreadsTotal > 0
    ? (carrierThreadsActive / carrierThreadsTotal) * 100
    : 0;

  const pendingTasks = totalTaskCount - completedTaskCount;

  // 실행 중인 작업을 이름별로 그룹핑
  const grouped: GroupedTask[] = [];
  const countMap = new Map<string, number>();
  for (const t of runningTasks) {
    countMap.set(t.name, (countMap.get(t.name) || 0) + 1);
  }
  for (const [name, count] of countMap) {
    grouped.push({ name, count });
  }
  grouped.sort((a, b) => b.count - a.count);

  return (
    <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Assignment sx={{ mr: 1 }} />
        <Typography variant="h6">비동기 작업 모니터</Typography>
      </Box>

      {/* 캐리어 스레드 사용률 */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Memory sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">캐리어 스레드 사용률</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {carrierThreadsActive}/{carrierThreadsTotal} ({carrierUtilization.toFixed(1)}%)
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={carrierUtilization} 
          sx={{ height: 8, borderRadius: 4 }}
          color={carrierUtilization > 80 ? 'error' : carrierUtilization > 50 ? 'warning' : 'primary'}
        />
      </Box>

      {/* 통계 칩들 */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip 
          icon={<PlayArrow />} 
          label={`가상 스레드: ${activeVirtualThreads}`}
          size="small"
          color={activeVirtualThreads > 0 ? 'success' : 'default'}
        />
        <Chip 
          icon={<Memory />} 
          label={`캐리어: ${carrierThreadsTotal}`}
          size="small"
          color="primary"
        />
        <Chip 
          icon={<Queue />} 
          label={`대기: ${pendingTasks}`}
          size="small"
          color={pendingTasks > 10 ? 'warning' : 'default'}
        />
        <Chip 
          icon={<CheckCircle />} 
          label={`완료: ${completedTaskCount.toLocaleString()}`}
          size="small"
          color="default"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 실행중인 작업 목록 */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
        실행중인 작업 ({runningTasks.length})
      </Typography>
      
      {grouped.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          현재 실행중인 작업이 없습니다
        </Typography>
      ) : (
        <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
          {grouped.map((task, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText 
                primary={task.name}
                secondary={`${task.count}개 작업`}
                primaryTypographyProps={{ 
                  variant: 'body2',
                  sx: { fontFamily: 'monospace' }
                }}
                secondaryTypographyProps={{ 
                  variant: 'caption',
                  color: 'text.secondary'
                }}
              />
              <Chip 
                label={task.count} 
                size="small" 
                color={task.count > 5 ? 'warning' : 'default'}
                sx={{ minWidth: 45 }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default AsyncTaskMonitor;

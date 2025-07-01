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
import { Assignment, PlayArrow, Queue, Memory } from "@mui/icons-material";

interface TaskInfo {
  label: string;
  count: number;
}

interface AsyncTaskData {
  activeThreads: number;
  poolSize: number;
  queueSize: number;
  tasks: TaskInfo[];
}

const AsyncTaskMonitor: React.FC = () => {
  const [taskData, setTaskData] = useState<AsyncTaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseTaskData = (statusText: string): AsyncTaskData => {
    const lines = statusText.split('\n');
    
    let activeThreads = 0;
    let poolSize = 0;
    let queueSize = 0;
    const tasks: TaskInfo[] = [];

    let inTasksSection = false;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('Active threads:')) {
        activeThreads = parseInt(trimmedLine.split(':')[1].trim()) || 0;
      } else if (trimmedLine.startsWith('Pool size:')) {
        poolSize = parseInt(trimmedLine.split(':')[1].trim()) || 0;
      } else if (trimmedLine.startsWith('Queue size:')) {
        queueSize = parseInt(trimmedLine.split(':')[1].trim()) || 0;
      } else if (trimmedLine === 'Tasks by label:') {
        inTasksSection = true;
      } else if (inTasksSection && trimmedLine.includes(':')) {
        const taskMatch = trimmedLine.match(/^\s*(.+):\s*(\d+)$/);
        if (taskMatch) {
          tasks.push({
            label: taskMatch[1].trim(),
            count: parseInt(taskMatch[2]) || 0
          });
        }
      }
    }

    return { activeThreads, poolSize, queueSize, tasks };
  };

  const fetchTaskData = async () => {
    try {
      const response = await fetch('/api/kamibot/snapshot');
      const result = await response.json();
      
      if (result.success && result.data?.status) {
        const parsedData = parseTaskData(result.data.status);
        setTaskData(parsedData);
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

  if (!taskData) return null;

  const { activeThreads, poolSize, queueSize, tasks } = taskData;
  const threadUtilization = poolSize > 0 ? (activeThreads / poolSize) * 100 : 0;

  return (
    <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Assignment sx={{ mr: 1 }} />
        <Typography variant="h6">비동기 작업 모니터</Typography>
      </Box>

      {/* 스레드 풀 상태 */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Memory sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">스레드 풀 사용률</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {activeThreads}/{poolSize} ({threadUtilization.toFixed(1)}%)
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={threadUtilization} 
          sx={{ height: 8, borderRadius: 4 }}
          color={threadUtilization > 80 ? 'error' : threadUtilization > 50 ? 'warning' : 'primary'}
        />
      </Box>

      {/* 통계 칩들 */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip 
          icon={<PlayArrow />} 
          label={`활성 스레드: ${activeThreads}`}
          size="small"
          color={activeThreads > 0 ? 'success' : 'default'}
        />
        <Chip 
          icon={<Memory />} 
          label={`풀 크기: ${poolSize}`}
          size="small"
          color="primary"
        />
        <Chip 
          icon={<Queue />} 
          label={`대기열: ${queueSize}`}
          size="small"
          color={queueSize > 0 ? 'warning' : 'default'}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 작업 목록 */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
        실행중인 작업 ({tasks.length})
      </Typography>
      
      {tasks.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          현재 실행중인 작업이 없습니다
        </Typography>
      ) : (
        <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
          {tasks.map((task, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText 
                primary={task.label}
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

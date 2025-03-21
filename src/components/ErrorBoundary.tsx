import React, { Component, ErrorInfo, ReactNode } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Tooltip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  snackbarOpen: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    snackbarOpen: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null, snackbarOpen: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  // 오류 상태를 리셋하는 메서드 추가
  public resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      snackbarOpen: false
    });
  };

  // 오류 정보를 클립보드에 복사하는 메서드
  public copyErrorToClipboard = () => {
    const errorText = `
오류: ${this.state.error?.toString() || '알 수 없는 오류'}
컴포넌트 스택: ${this.state.errorInfo?.componentStack || '스택 정보 없음'}
시간: ${new Date().toLocaleString()}
    `;
    
    navigator.clipboard.writeText(errorText)
      .then(() => {
        this.setState({ snackbarOpen: true });
      })
      .catch(err => {
        console.error('클립보드에 복사하지 못했습니다:', err);
      });
  };

  // 스낵바 닫기 핸들러
  public handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          p={3}
          bgcolor="#f5f5f5"
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 600,
              width: '100%',
              borderRadius: 2,
              animation: 'fadeIn 0.5s ease-in-out'
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <WarningAmberIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" component="h2" color="primary.main" gutterBottom>
                앗! 문제가 발생했어요
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" paragraph>
                카미봇에 오류가 발생한 것 같아요. 페이지를 새로고침해 보시거나, 
                문제가 계속되면 관리자에게 연락해주세요.
              </Typography>
            </Box>
            
            <Accordion sx={{ mb: 3 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="error-content"
                id="error-header"
              >
                <Typography fontWeight="medium">오류 상세 정보</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ position: 'relative' }}>
                  <Box 
                    component="pre" 
                    sx={{ 
                      p: 2, 
                      borderRadius: 1, 
                      bgcolor: 'background.default',
                      overflow: 'auto',
                      fontSize: '0.875rem'
                    }}
                  >
                    {this.state.error && this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </Box>
                  <Tooltip title="오류 정보 복사하기">
                    <IconButton
                      onClick={this.copyErrorToClipboard}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        }
                      }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </AccordionDetails>
            </Accordion>
            
            <Box display="flex" justifyContent="center" gap={2}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<RefreshIcon />}
                onClick={() => window.location.reload()}
              >
                페이지 새로고침
              </Button>
              
              <Tooltip title="이 기능은 오류를 실제로 해결하지 않으며, 같은 문제가 다시 발생할 수 있습니다">
                <Button 
                  variant="outlined" 
                  color="error" 
                  startIcon={<ErrorOutlineIcon />}
                  onClick={this.resetErrorBoundary}
                  sx={{ ml: 2 }}
                >
                  오류 무시하고 계속하기
                </Button>
              </Tooltip>
            </Box>

            {/* 복사 성공 알림 */}
            <Snackbar
              open={this.state.snackbarOpen}
              autoHideDuration={3000}
              onClose={this.handleSnackbarClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert onClose={this.handleSnackbarClose} severity="success" variant="filled">
                오류 정보가 클립보드에 복사되었습니다
              </Alert>
            </Snackbar>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
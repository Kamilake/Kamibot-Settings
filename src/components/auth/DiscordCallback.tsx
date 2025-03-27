import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useUser } from '../../contexts/User/UserContext';
import axios from 'axios';
import { getRedirectUri } from '../../settings/components/Header';

const DiscordCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setIsUserLoaded } = useUser();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      // URL에서 파라미터를 가져옵니다
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const redirectUri = getRedirectUri();

      // 사용자가 인증을 취소한 경우 (access_denied)
      if (error === 'access_denied') {
        // 오류 메시지 없이 메인 페이지로 리디렉션
        navigate('/settings/personal');
        return;
      }

      if (!code) {
        setError('인증 코드가 없습니다');
        return;
      }

      try {
        // 백엔드 API에 인증 코드를 전송하여 사용자 정보를 가져옵니다
        const response = await axios.post('/api/auth/discord', { code, redirectUri });

        // 받은 사용자 정보를 저장합니다
        setUser(response.data);
        setIsUserLoaded(true);

        // 홈 페이지나 이전 페이지로 리디렉션합니다
        navigate('/settings/personal');
      } catch (err) {
        console.error('Discord 로그인 처리 중 오류 발생:', err);
        setError('로그인 처리 중 오류가 발생했습니다');
      }
    };

    handleCallback();
  }, [location.search, navigate, setUser, setIsUserLoaded]);

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
        <Typography variant="body1">
          <a href="/" style={{ textDecoration: 'underline' }}>홈으로 돌아가기</a>
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>Discord 로그인 처리 중...</Typography>
    </Box>
  );
};

export default DiscordCallback;
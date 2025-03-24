import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { callAutologinApi } from '../api/authService';

// URL 파라미터 확인 및 autologin API 호출 컴포넌트
const AuthCheck: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [processedData, setProcessedData] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    // URLSearchParams를 사용하여 'data' 파라미터 확인
    const searchParams = new URLSearchParams(location.search);
    const dataParam = searchParams.get('data');
    
    // data 파라미터가 있고 아직 처리되지 않은 경우에만 처리
    if (dataParam && processedData !== dataParam) {
      // 현재 데이터 값 저장하여 중복 처리 방지
      setProcessedData(dataParam);
      
      // 자동 로그인 함수 정의
      const performAutoLogin = async () => {
        try {
          await callAutologinApi(dataParam);
          console.log('Auto login successful, removing data parameter');
          
          // data 파라미터 제거 후 URL 업데이트
          searchParams.delete('data');
          const newSearch = searchParams.toString();
          const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
          
          // React Router의 navigate 사용하여 URL 업데이트 (replace: true로 히스토리 대체)
          navigate(newUrl, { replace: true, state: { preventReload: true } });
        } catch (error) {
          console.error('Failed to auto login:', error);
        }
      };
      
      // requestIdleCallback을 사용하여 브라우저가 한가할 때 API 호출
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          performAutoLogin();
        });
      } else {
        // requestIdleCallback을 지원하지 않는 브라우저를 위한 폴백
        setTimeout(() => {
          performAutoLogin();
        }, 0);
      }
    }
  }, [location.search, location.pathname, navigate, processedData]);
  
  return null; // UI를 렌더링하지 않음
};

export default AuthCheck;
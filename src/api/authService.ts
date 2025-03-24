import axios from 'axios';

// 인증 API 호출 함수
export const callAutologinApi = async (jwt: string) => {
  try {
    const response = await axios.get('/api/autologin', {
      params: {
        data: jwt
      }
    });
    console.log('Auto login successful');
    return response.data;
  } catch (error) {
    console.error('Auto login failed:', error);
    throw error;
  }
};
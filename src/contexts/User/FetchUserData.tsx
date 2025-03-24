import React, { useEffect } from 'react';
import { useUser } from './UserContext';
import { User } from '../../api/fetchUserInfoApi';

const FetchUserData = () => {
  const { setUser } = useUser();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/info', {
          credentials: 'include',
        });
        if (!response.ok) {
          // 요청 실패 처리
          console.error('Failed to fetch user data');
          return;
        }
        const data: User = await response.json();
        if (!data || (data as any).success === "false") {
          // 데이터가 없을 때 처리
          console.error("No user data found. data: ", data);
          return;
        }
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUser();
  }, [setUser]);

  return null; // 필요시 로딩 스피너 등 추가 가능
};

export default FetchUserData;
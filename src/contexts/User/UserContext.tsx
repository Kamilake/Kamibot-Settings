import React, { createContext, useContext, useState, ReactNode } from 'react';
export interface User {
  userEffectiveName: string;
  userLevel: number;
  userAvatarUrl: string;
  channelName: string;
  channelId: number;
  channelType: string;
  userName: string;
  guildId: number;
  guildName: string;
  ttsActor: string;
  ttsFriendlyName: string;
}
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  isUserLoaded: boolean;  // 새로운 상태 추가
  setIsUserLoaded: (loaded: boolean) => void;  // 새로운 설정 함수
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    "userEffectiveName": "카미봇 사용자",
    "userLevel": 0,
    "userAvatarUrl": "https://cdn.discordapp.com/avatars/450998273722023947/eb67550ccabcf010657e916e0c093372.png",
    "channelName": "새 채널",
    "channelType": "PRIVATE",
    "userName": "kamikami",
    "channelId": 1077136010883907696,
    "guildId": 1234567890,
    "guildName": "내 서버",
    "ttsActor": "kyuri",
    "ttsFriendlyName": "...",
  });
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoaded, setIsUserLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
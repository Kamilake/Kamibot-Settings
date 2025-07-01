import React, { createContext, useContext, useState, ReactNode } from 'react';
export interface OAuth2UserInfo {
  id: string; // Discord 사용자 ID (문자열)
  userName: string; // 사용자명
  avatar: string; // 아바타 이미지 ID
  discriminator: string; // 태그 번호 (Discord의 #0000 부분)
  public_flags: number; // 공개 플래그
  flags: number; // 플래그
  banner: string; // 배너 이미지 ID
  accent_color: string; // 강조 색상
  global_name: string; // 보여지는 닉네임
  avatar_decoration_data: string; // 아바타 장식 데이터
  collectibles: string; // 수집품
  banner_color: string; // 배너 색상
  clan: string; // 클랜
  primary_guild: string; // 주 서버
  mfa_enabled: boolean; // 2단계 인증 여부
  locale: string; // 지역
  premium_type: number; // Nitro 구독 여부 (0: 없음, 1: 클래식, 2: 노멀)
  email: string; // 이메일 (scope에 email이 포함된 경우)
  verified: boolean; // 이메일 인증 여부
}
export interface User {
  userEffectiveName: string;
  userLevel: number;
  userAvatarUrl: string;
  channelName: string;
  channelId: string;
  channelType: string;
  userName: string;
  guildId: string;
  guildName: string;
  ttsActor: string;
  ttsFriendlyName: string;
  userInfo: undefined | OAuth2UserInfo;
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
    "channelId": "1234567890",
    "guildId": "1234567890",
    "guildName": "내 서버",
    "ttsActor": "kyuri",
    "ttsFriendlyName": "...",
    "userInfo": undefined
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
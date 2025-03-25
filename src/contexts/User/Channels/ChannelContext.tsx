import React, { createContext, useContext, useState, ReactNode } from 'react';
interface ChannelContextType {
  channelList: Channel[];
  setChannel: (channel: Channel[]) => void;
  isChannelLoaded: boolean;  // 새로운 상태 추가
  setIsChannelLoaded: (loaded: boolean) => void;  // 새로운 설정 함수
}
export interface Channel {
  channelName: string;
  channelType: string;
  channelId: number;
  categoryName: string;
}

const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider = ({ children }: { children: ReactNode }) => {
  const [channelList, setChannel] = useState<Channel[]>([
    {
      channelName: '로드 중...',
      channelType: "PRIVATE",
      channelId: -1,
      categoryName: "일반",
    }
  ]);
  const [isChannelLoaded, setIsChannelLoaded] = useState(false);

  return (
    <ChannelContext.Provider value={{ channelList, setChannel, isChannelLoaded, setIsChannelLoaded }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannels = (): ChannelContextType => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error('useChannels must be used within a ChannelProvider');
  }
  return context;
};